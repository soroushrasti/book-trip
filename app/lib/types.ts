export type Language = "nl" | "en" | "fa";

export type SessionId = 
  | "2026-04-25"
  | "2026-05-23"
  | "2026-08-22"
  | "2026-09-19"
  | "2026-10-17";

export type Registration = {
  id: string;
  sessionId: SessionId;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  photoConsent: boolean;
  isWaitingList: boolean;
  createdAt: string;
};

export type SessionInfo = {
  id: SessionId;
  date: string;
  book: string;
  group: string;
  image: string;
  time: string;
  maxCapacity: number;
  isExhibition?: boolean;
};

export type SessionData = {
  [key in SessionId]: {
    registrations: Registration[];
    waitingList: Registration[];
  };
};

export const MAX_CAPACITY = 15;

// Cache buster version - increment to force image refresh
const IMG_VERSION = "v2";

export const SESSIONS: SessionInfo[] = [
  {
    id: "2026-04-25",
    date: "2026-04-25",
    book: "De mooiste vis van de zee",
    group: "Groep 1-2",
    image: `/group_1_2_april.jpeg?${IMG_VERSION}`,
    time: "11:45 - 14:15",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-05-23",
    date: "2026-05-23",
    book: "Billy the Bat's Big Adventure",
    group: "Groep 1-2",
    image: `/group_1_2may.jpeg?${IMG_VERSION}`,
    time: "11:45 - 14:15",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-08-22",
    date: "2026-08-22",
    book: "Draw me a star",
    group: "Groep 3-4",
    image: `/grouo_3_4_agust.jpeg?${IMG_VERSION}`,
    time: "11:45 - 14:15",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-09-19",
    date: "2026-09-19",
    book: "The tiny seed",
    group: "Groep 5-6",
    image: `/group_5_6_septamber.jpeg?${IMG_VERSION}`,
    time: "11:45 - 14:15",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-10-17",
    date: "2026-10-17",
    book: "Flotsam",
    group: "Groep 7-8",
    image: `/group_7_8_oct.jpeg?${IMG_VERSION}`,
    time: "11:45 - 14:15",
    maxCapacity: MAX_CAPACITY,
    isExhibition: true,
  },
];

