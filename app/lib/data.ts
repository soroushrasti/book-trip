import { pool, initializeDatabase } from "./db";
import { SessionId, Registration, MAX_CAPACITY } from "./types";

// Ensure database is initialized
let dbInitialized = false;
async function ensureDbInitialized() {
  if (!dbInitialized && process.env.DATABASE_URL) {
    await initializeDatabase();
    dbInitialized = true;
  }
}

// Check if we're using database or file system
function useDatabase(): boolean {
  return !!process.env.DATABASE_URL;
}

// ============ FILE-BASED STORAGE (fallback for local dev) ============
import fs from "fs/promises";
import path from "path";
import { SessionData } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "registrations.json");

async function getRegistrationDataFromFile(): Promise<SessionData> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {
      "2026-04-25": { registrations: [], waitingList: [] },
      "2026-05-23": { registrations: [], waitingList: [] },
      "2026-08-22": { registrations: [], waitingList: [] },
      "2026-09-19": { registrations: [], waitingList: [] },
      "2026-10-17": { registrations: [], waitingList: [] },
    };
  }
}

async function saveRegistrationDataToFile(data: SessionData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ============ DATABASE STORAGE ============
async function getRegistrationCountFromDb(sessionId: SessionId, isWaitingList: boolean): Promise<number> {
  const result = await pool.query(
    "SELECT COUNT(*) FROM registrations WHERE session_id = $1 AND is_waiting_list = $2",
    [sessionId, isWaitingList]
  );
  return parseInt(result.rows[0].count, 10);
}

async function addRegistrationToDb(
  sessionId: SessionId,
  registration: Omit<Registration, "id" | "createdAt" | "isWaitingList">,
  isWaitingList: boolean
): Promise<Registration> {
  const result = await pool.query(
    `INSERT INTO registrations (
      session_id, first_name, last_name, phone_number, email,
      street, house_number, post_code, city, country, is_waiting_list
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id, created_at`,
    [
      sessionId,
      registration.firstName,
      registration.lastName,
      registration.phoneNumber,
      registration.email,
      registration.address.street,
      registration.address.houseNumber,
      registration.address.postCode,
      registration.address.city,
      registration.address.country,
      isWaitingList,
    ]
  );

  return {
    ...registration,
    id: result.rows[0].id,
    sessionId,
    isWaitingList,
    createdAt: result.rows[0].created_at.toISOString(),
  };
}

// ============ PUBLIC API ============
export async function getSessionStats(sessionId: SessionId): Promise<{
  registeredCount: number;
  waitingListCount: number;
  spotsAvailable: number;
  isFull: boolean;
}> {
  if (useDatabase()) {
    await ensureDbInitialized();
    const registeredCount = await getRegistrationCountFromDb(sessionId, false);
    const waitingListCount = await getRegistrationCountFromDb(sessionId, true);
    const spotsAvailable = Math.max(0, MAX_CAPACITY - registeredCount);
    return {
      registeredCount,
      waitingListCount,
      spotsAvailable,
      isFull: registeredCount >= MAX_CAPACITY,
    };
  }

  // File-based fallback
  const data = await getRegistrationDataFromFile();
  const session = data[sessionId];
  const registeredCount = session?.registrations?.length ?? 0;
  const waitingListCount = session?.waitingList?.length ?? 0;
  const spotsAvailable = Math.max(0, MAX_CAPACITY - registeredCount);
  
  return {
    registeredCount,
    waitingListCount,
    spotsAvailable,
    isFull: registeredCount >= MAX_CAPACITY,
  };
}

export async function getAllSessionStats(): Promise<
  Record<SessionId, { registeredCount: number; waitingListCount: number; spotsAvailable: number; isFull: boolean }>
> {
  const sessionIds: SessionId[] = [
    "2026-04-25",
    "2026-05-23",
    "2026-08-22",
    "2026-09-19",
    "2026-10-17",
  ];

  const stats: Record<SessionId, { registeredCount: number; waitingListCount: number; spotsAvailable: number; isFull: boolean }> = {} as Record<SessionId, { registeredCount: number; waitingListCount: number; spotsAvailable: number; isFull: boolean }>;

  for (const sessionId of sessionIds) {
    stats[sessionId] = await getSessionStats(sessionId);
  }

  return stats;
}

export async function addRegistration(
  sessionId: SessionId,
  registration: Omit<Registration, "id" | "createdAt" | "isWaitingList">
): Promise<{ success: boolean; isWaitingList: boolean; message: string }> {
  if (useDatabase()) {
    await ensureDbInitialized();
    
    const registeredCount = await getRegistrationCountFromDb(sessionId, false);
    const isWaitingList = registeredCount >= MAX_CAPACITY;
    
    await addRegistrationToDb(sessionId, registration, isWaitingList);
    
    if (isWaitingList) {
      return {
        success: true,
        isWaitingList: true,
        message: "Added to waiting list",
      };
    }
    
    return {
      success: true,
      isWaitingList: false,
      message: "Registration successful",
    };
  }

  // File-based fallback
  const data = await getRegistrationDataFromFile();
  const session = data[sessionId];
  
  if (!session) {
    return { success: false, isWaitingList: false, message: "Session not found" };
  }

  const newRegistration: Registration = {
    ...registration,
    id: crypto.randomUUID(),
    sessionId,
    createdAt: new Date().toISOString(),
    isWaitingList: session.registrations.length >= MAX_CAPACITY,
  };

  if (session.registrations.length >= MAX_CAPACITY) {
    session.waitingList.push(newRegistration);
    await saveRegistrationDataToFile(data);
    return {
      success: true,
      isWaitingList: true,
      message: "Added to waiting list",
    };
  }

  session.registrations.push(newRegistration);
  await saveRegistrationDataToFile(data);
  return {
    success: true,
    isWaitingList: false,
    message: "Registration successful",
  };
}
