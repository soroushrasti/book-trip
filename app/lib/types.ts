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
  address: {
    street: string;
    houseNumber: string;
    postCode: string;
    city: string;
    country: string;
  };
  isWaitingList: boolean;
  createdAt: string;
};

export type SessionInfo = {
  id: SessionId;
  date: string;
  book: string;
  group: string;
  image: string;
  maxCapacity: number;
};

export type SessionData = {
  [key in SessionId]: {
    registrations: Registration[];
    waitingList: Registration[];
  };
};

export const MAX_CAPACITY = 15;

export const SESSIONS: SessionInfo[] = [
  {
    id: "2026-04-25",
    date: "2026-04-25",
    book: "De mooiste vis van de zee",
    group: "Peuters (2.5 - 3 jaar)",
    image: "/sessions/rainbow-fish.jpg",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-05-23",
    date: "2026-05-23",
    book: "Draw me a star",
    group: "Groep 1-2",
    image: "/sessions/draw-star.jpg",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-08-22",
    date: "2026-08-22",
    book: "The tiny seed",
    group: "Groep 3-4",
    image: "/sessions/tiny-seed.jpg",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-09-19",
    date: "2026-09-19",
    book: "Flotsam",
    group: "Groep 5-6",
    image: "/sessions/flotsam.jpg",
    maxCapacity: MAX_CAPACITY,
  },
  {
    id: "2026-10-17",
    date: "2026-10-17",
    book: "The little prince",
    group: "Groep 7-8",
    image: "/sessions/little-prince.jpg",
    maxCapacity: MAX_CAPACITY,
  },
];

