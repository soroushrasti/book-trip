"use client";

import { useState } from "react";
import { Registration } from "../../lib/types";

type SessionData = {
  id: string;
  label: string;
  registrations: Registration[];
  waitingList: Registration[];
};

type Props = {
  sessions: SessionData[];
};

export default function AdminClient({ sessions }: Props) {
  const [view, setView] = useState<"ui" | "json">("ui");
  const [activeSession, setActiveSession] = useState<string>("all");

  const totalRegistered = sessions.reduce((s, x) => s + x.registrations.length, 0);
  const totalWaiting = sessions.reduce((s, x) => s + x.waitingList.length, 0);


  const jsonExport = Object.fromEntries(
    sessions.map((s) => [
      s.id,
      { session: s.label, registrations: s.registrations, waitingList: s.waitingList },
    ])
  );

  function downloadJson() {
    const blob = new Blob([JSON.stringify(jsonExport, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const displayedSessions =
    activeSession === "all" ? sessions : sessions.filter((s) => s.id === activeSession);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              🛠️ Admin — Registrations
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Book Trip Workshop · {new Date().toLocaleDateString("en-GB", { dateStyle: "long" })}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* View toggle */}
            <div className="flex rounded-lg border border-gray-200 dark:border-zinc-700 overflow-hidden text-sm font-medium">
              <button
                onClick={() => setView("ui")}
                className={`px-4 py-2 transition-colors ${
                  view === "ui"
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
              >
                🧾 Table view
              </button>
              <button
                onClick={() => setView("json")}
                className={`px-4 py-2 transition-colors ${
                  view === "json"
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                }`}
              >
                {"{ }"} JSON view
              </button>
            </div>
            <button
              onClick={downloadJson}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
            >
              ⬇️ Download JSON
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <StatCard label="Total Registered" value={totalRegistered} color="indigo" />
          <StatCard label="Waiting List" value={totalWaiting} color="amber" />
          <StatCard label="Sessions" value={sessions.length} color="cyan" />
          <StatCard
            label="Total Entries"
            value={totalRegistered + totalWaiting}
            color="purple"
          />
        </div>

        {/* Session filter tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <TabButton
            label={`All (${totalRegistered + totalWaiting})`}
            active={activeSession === "all"}
            onClick={() => setActiveSession("all")}
          />
          {sessions.map((s) => (
            <TabButton
              key={s.id}
              label={`${s.id} (${s.registrations.length + s.waitingList.length})`}
              active={activeSession === s.id}
              onClick={() => setActiveSession(s.id)}
            />
          ))}
        </div>

        {/* JSON view */}
        {view === "json" && (
          <div className="rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-900 text-green-400 p-4 overflow-auto max-h-[70vh] text-xs font-mono">
            <pre>{JSON.stringify(activeSession === "all" ? jsonExport : { [activeSession]: jsonExport[activeSession] }, null, 2)}</pre>
          </div>
        )}

        {/* Table view */}
        {view === "ui" && (
          <div className="space-y-8">
            {displayedSessions.map((session) => (
              <SessionTable key={session.id} session={session} />
            ))}
            {displayedSessions.every(
              (s) => s.registrations.length === 0 && s.waitingList.length === 0
            ) && (
              <div className="text-center py-16 text-gray-400 dark:text-gray-500">
                <p className="text-4xl mb-2">📭</p>
                <p className="text-lg font-medium">No registrations yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "indigo" | "amber" | "cyan" | "purple";
}) {
  const colors = {
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300",
    amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300",
    cyan: "bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300",
    purple: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300",
  };
  return (
    <div className={`rounded-xl border p-4 ${colors[color]}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs font-medium mt-1 opacity-80">{label}</p>
    </div>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white shadow"
          : "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
      }`}
    >
      {label}
    </button>
  );
}

function SessionTable({ session }: { session: SessionData }) {
  const all = [
    ...session.registrations.map((r) => ({ ...r, _type: "registered" as const })),
    ...session.waitingList.map((r) => ({ ...r, _type: "waiting" as const })),
  ];

  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-700 overflow-hidden shadow-sm">
      {/* Session header */}
      <div className="bg-indigo-600 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-white font-bold text-sm">{session.label}</h2>
        <div className="flex gap-3 text-xs text-indigo-100">
          <span>✅ {session.registrations.length} registered</span>
          <span>⏳ {session.waitingList.length} waiting</span>
        </div>
      </div>

      {all.length === 0 ? (
        <div className="py-8 text-center text-gray-400 dark:text-gray-500 bg-white dark:bg-zinc-900">
          <p>No registrations for this session</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white dark:bg-zinc-900">
            <thead>
              <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-800/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wide">
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">First name</th>
                <th className="px-4 py-3 text-left">Last name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Photo consent</th>
                <th className="px-4 py-3 text-left">Registered at</th>
              </tr>
            </thead>
            <tbody>
              {all.map((reg, i) => (
                <tr
                  key={reg.id}
                  className="border-b border-gray-50 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-4 py-3 text-gray-400 dark:text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    {reg._type === "registered" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 text-xs font-medium">
                        ✅ Registered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 text-xs font-medium">
                        ⏳ Waiting
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-100">{reg.firstName}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{reg.lastName || "—"}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {reg.email ? (
                      <a href={`mailto:${reg.email}`} className="hover:underline text-indigo-600 dark:text-indigo-400">
                        {reg.email}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{reg.phoneNumber || "—"}</td>
                  <td className="px-4 py-3 text-center">
                    {reg.photoConsent ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-300 dark:text-gray-600">✗</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 dark:text-gray-500 whitespace-nowrap">
                    {new Date(reg.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

