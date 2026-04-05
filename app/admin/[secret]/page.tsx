import { notFound } from "next/navigation";
import { getAllRegistrations } from "../../lib/data";
import { SESSIONS } from "../../lib/types";
import AdminClient from "./admin-client";

type Props = {
  params: Promise<{ secret: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { secret } = await params;

  const adminSecret = process.env.ADMIN_SECRET ?? "admin2026";
  if (secret !== adminSecret) {
    notFound();
  }

  const data = await getAllRegistrations();

  // Build a flat enriched list with session label
  const sessionLabels: Record<string, string> = {
    "2026-04-25": "25 Apr 2026 — The Rainbow Fish (Gr 1-2)",
    "2026-05-23": "23 May 2026 — Billy the Bat (Gr 1-2)",
    "2026-08-22": "22 Aug 2026 — Draw Me a Star (Gr 3-4)",
    "2026-09-19": "19 Sep 2026 — The Tiny Seed (Gr 5-6)",
    "2026-10-17": "17 Oct 2026 — Flotsam (Gr 7-8) 🎨",
  };

  const sessions = SESSIONS.map((s) => ({
    id: s.id,
    label: sessionLabels[s.id] ?? s.id,
    registrations: data[s.id]?.registrations ?? [],
    waitingList: data[s.id]?.waitingList ?? [],
  }));

  return <AdminClient sessions={sessions} />;
}

