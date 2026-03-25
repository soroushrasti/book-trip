"use client";

import { useActionState } from "react";
import { registerAction, FormState } from "../lib/actions";
import { Language, SessionId, SESSIONS } from "../lib/types";
import { translations } from "../lib/translations";
import Link from "next/link";

const initialState: FormState = {
  success: false,
  isWaitingList: false,
  message: "",
};

type RegistrationFormProps = {
  language: Language;
  sessionId: SessionId;
  isWaitingList: boolean;
  sessionStats: {
    registeredCount: number;
    spotsAvailable: number;
  };
};

function formatDate(dateStr: string, language: Language): string {
  const date = new Date(dateStr);
  const localeMap: Record<Language, string> = {
    nl: "nl-NL",
    en: "en-US",
    fa: "fa-IR",
  };
  return date.toLocaleDateString(localeMap[language], {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function RegistrationForm({
  language,
  sessionId,
  isWaitingList,
  sessionStats,
}: RegistrationFormProps) {
  const [state, formAction, pending] = useActionState(registerAction, initialState);
  const t = translations[language];
  const isRTL = language === "fa";
  
  const session = SESSIONS.find((s) => s.id === sessionId);
  
  if (!session) {
    return <div>Session not found</div>;
  }

  // Localized session info
  const localizedSessions: Record<Language, Record<SessionId, { book: string; group: string }>> = {
    nl: {
      "2026-04-25": { book: "De mooiste vis van de zee", group: "Peuters (2.5 - 3 jaar)" },
      "2026-05-23": { book: "Draw me a star", group: "Groep 1-2" },
      "2026-08-22": { book: "The tiny seed", group: "Groep 3-4" },
      "2026-09-19": { book: "Flotsam", group: "Groep 5-6" },
      "2026-10-17": { book: "The little prince", group: "Groep 7-8" },
    },
    en: {
      "2026-04-25": { book: "The Rainbow Fish", group: "Toddlers (2.5 - 3 years)" },
      "2026-05-23": { book: "Draw me a star", group: "Group 1-2" },
      "2026-08-22": { book: "The tiny seed", group: "Group 3-4" },
      "2026-09-19": { book: "Flotsam", group: "Group 5-6" },
      "2026-10-17": { book: "The little prince", group: "Group 7-8" },
    },
    fa: {
      "2026-04-25": { book: "زیباترین ماهی دریا", group: "گروه سنی: ۲.۵ تا ۳ سال" },
      "2026-05-23": { book: "برایم یک ستاره بکش", group: "گروه سنی: پایه ۱ و ۲" },
      "2026-08-22": { book: "دانه کوچک", group: "گروه سنی: پایه ۳ و ۴" },
      "2026-09-19": { book: "Flotsam", group: "گروه سنی: پایه ۵ و ۶" },
      "2026-10-17": { book: "شازده کوچولو", group: "گروه سنی: پایه ۷ و ۸" },
    },
  };

  const localizedSession = localizedSessions[language][sessionId];

  if (state.success) {
    return (
      <div className="text-center space-y-6" dir={isRTL ? "rtl" : "ltr"}>
        <div className="text-6xl">{state.isWaitingList ? "⏳" : "🎉"}</div>
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
          {state.isWaitingList ? t.waitingListSuccess : t.registrationSuccess}
        </h2>
        <p className="text-black/70 dark:text-white/70">
          📖 {localizedSession.book}
        </p>
        <p className="text-black/70 dark:text-white/70">
          📅 {formatDate(session.date, language)}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href={`/register?session=${sessionId}&lang=${language}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-medium text-white hover:bg-amber-600 transition"
          >
            {t.registerAnother}
          </Link>
          <Link
            href={language === "nl" ? "/" : `/?lang=${language}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/20 dark:border-white/20 px-6 py-3 font-medium hover:bg-black/5 dark:hover:bg-white/10 transition"
          >
            {t.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700">
        <h3 className="font-semibold text-lg mb-2">{t.sessionLabel}</h3>
        <p className="text-sm">📖 {localizedSession.book}</p>
        <p className="text-sm">👥 {localizedSession.group}</p>
        <p className="text-sm">📅 {formatDate(session.date, language)}</p>
        <p className="text-sm mt-2 font-medium">
          {isWaitingList ? (
            <span className="text-amber-600 dark:text-amber-400">
              ⏳ {t.waitingList} - {sessionStats.registeredCount}/15 {t.full.toLowerCase()}
            </span>
          ) : (
            <span className="text-green-600 dark:text-green-400">
              ✅ {sessionStats.spotsAvailable} {sessionStats.spotsAvailable === 1 ? t.spotAvailable : t.spotsAvailable}
            </span>
          )}
        </p>
      </div>

      <h2 className="text-xl font-bold mb-6">
        {isWaitingList ? t.waitingListTitle : t.registrationTitle}
      </h2>

      {state.errors?.general && (
        <div className="mb-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300">
          {state.errors.general}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="sessionId" value={sessionId} />
        
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              {t.firstName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className={`w-full rounded-lg border px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
                state.errors?.firstName ? "border-red-500" : "border-black/20 dark:border-white/20"
              }`}
            />
            {state.errors?.firstName && (
              <p className="mt-1 text-sm text-red-500">{state.errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              {t.lastName}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
              {t.phoneNumber} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              className={`w-full rounded-lg border px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition ${
                state.errors?.phoneNumber ? "border-red-500" : "border-black/20 dark:border-white/20"
              }`}
            />
            {state.errors?.phoneNumber && (
              <p className="mt-1 text-sm text-red-500">{state.errors.phoneNumber}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
            />
          </div>
        </div>

        {/* Address Section */}
        <div className="pt-2">
          <h3 className="font-medium mb-3">{t.address}</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label htmlFor="street" className="block text-sm font-medium mb-1">
                  {t.street}
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="houseNumber" className="block text-sm font-medium mb-1">
                  {t.houseNumber}
                </label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="postCode" className="block text-sm font-medium mb-1">
                  {t.postCode}
                </label>
                <input
                  type="text"
                  id="postCode"
                  name="postCode"
                  className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium mb-1">
                  {t.city}
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-1">
                  {t.country}
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  defaultValue="Netherlands"
                  className="w-full rounded-lg border border-black/20 dark:border-white/20 px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-lg hover:shadow-xl"
          >
            {pending ? t.submitting : t.submit}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <Link
          href={language === "nl" ? "/" : `/?lang=${language}`}
          className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition"
        >
          ← {t.backToHome}
        </Link>
      </div>
    </div>
  );
}

