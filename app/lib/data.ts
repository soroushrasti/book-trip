import fs from "fs/promises";
import path from "path";
import { SessionData, SessionId, Registration, MAX_CAPACITY } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "registrations.json");

export async function getRegistrationData(): Promise<SessionData> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // Return empty data structure if file doesn't exist
    return {
      "2026-04-25": { registrations: [], waitingList: [] },
      "2026-05-23": { registrations: [], waitingList: [] },
      "2026-08-22": { registrations: [], waitingList: [] },
      "2026-09-19": { registrations: [], waitingList: [] },
      "2026-10-17": { registrations: [], waitingList: [] },
    };
  }
}

export async function saveRegistrationData(data: SessionData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function getSessionStats(sessionId: SessionId): Promise<{
  registeredCount: number;
  waitingListCount: number;
  spotsAvailable: number;
  isFull: boolean;
}> {
  const data = await getRegistrationData();
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
  const data = await getRegistrationData();
  const sessionIds: SessionId[] = [
    "2026-04-25",
    "2026-05-23",
    "2026-08-22",
    "2026-09-19",
    "2026-10-17",
  ];

  const stats = {} as Record<SessionId, { registeredCount: number; waitingListCount: number; spotsAvailable: number; isFull: boolean }>;

  for (const sessionId of sessionIds) {
    const session = data[sessionId];
    const registeredCount = session?.registrations?.length ?? 0;
    const waitingListCount = session?.waitingList?.length ?? 0;
    const spotsAvailable = Math.max(0, MAX_CAPACITY - registeredCount);
    
    stats[sessionId] = {
      registeredCount,
      waitingListCount,
      spotsAvailable,
      isFull: registeredCount >= MAX_CAPACITY,
    };
  }

  return stats;
}

export async function addRegistration(
  sessionId: SessionId,
  registration: Omit<Registration, "id" | "createdAt" | "isWaitingList">
): Promise<{ success: boolean; isWaitingList: boolean; message: string }> {
  const data = await getRegistrationData();
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
    await saveRegistrationData(data);
    return {
      success: true,
      isWaitingList: true,
      message: "Added to waiting list",
    };
  }

  session.registrations.push(newRegistration);
  await saveRegistrationData(data);
  return {
    success: true,
    isWaitingList: false,
    message: "Registration successful",
  };
}

