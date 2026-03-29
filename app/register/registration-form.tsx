"use client";

import { useActionState } from "react";
import { registerAction, FormState } from "../lib/actions";
import { Language, SessionId, SESSIONS } from "../lib/types";
import { translations } from "../lib/translations";
import Link from "next/link";
import Image from "next/image";

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
        <div className="text-8xl animate-bounce">{state.isWaitingList ? "⏳" : "🎉"}</div>
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
          {state.isWaitingList ? t.waitingListSuccess : t.registrationSuccess}
        </h2>
        
        {/* Session Image */}
        <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-yellow-400">
          <Image
            src={session.image}
            alt={localizedSession.book}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <p className="text-lg flex items-center justify-center gap-2">
            <span className="text-2xl">📖</span> {localizedSession.book}
          </p>
          <p className="text-lg flex items-center justify-center gap-2">
            <span className="text-2xl">📅</span> {formatDate(session.date, language)}
          </p>
          <p className="text-lg flex items-center justify-center gap-2">
            <span className="text-2xl">🕐</span> {session.time}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white hover:from-pink-600 hover:to-orange-600 transition shadow-lg transform hover:scale-105"
          >
            <span className="text-xl">👋</span>
            {t.registerAnother}
          </button>
          <Link
            href={language === "nl" ? "/" : `/?lang=${language}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-purple-400 dark:border-purple-500 px-6 py-3 font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition transform hover:scale-105"
          >
            <span className="text-xl">🏠</span>
            {t.backToHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Session Card with Image */}
      <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 dark:from-yellow-900/30 dark:via-pink-900/30 dark:to-purple-900/30 border-4 border-yellow-400 dark:border-yellow-600 shadow-lg">
        {/* Session Image */}
        <div className="relative h-48 w-full">
          <Image
            src={session.image}
            alt={localizedSession.book}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-xl drop-shadow-lg flex items-center gap-2">
              <span>📖</span> {localizedSession.book}
            </h3>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <p className="flex items-center gap-2 text-lg">
            <span className="text-2xl">👶</span>
            <span className="font-medium">{localizedSession.group}</span>
          </p>
          <p className="flex items-center gap-2 text-lg">
            <span className="text-2xl">📅</span>
            <span>{formatDate(session.date, language)}</span>
          </p>
          <p className="flex items-center gap-2 text-lg">
            <span className="text-2xl">🕐</span>
            <span>{session.time}</span>
          </p>
          <p className="font-bold mt-2">
            {isWaitingList ? (
              <span className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                <span className="text-xl">⏳</span>
                {t.waitingList} - {sessionStats.registeredCount}/15 {t.full.toLowerCase()}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <span className="text-xl">✅</span>
                {sessionStats.spotsAvailable} {sessionStats.spotsAvailable === 1 ? t.spotAvailable : t.spotsAvailable}
              </span>
            )}
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <span className="text-3xl">{isWaitingList ? "⏳" : "✏️"}</span>
        {isWaitingList ? t.waitingListTitle : t.registrationTitle}
      </h2>

      {state.errors?.general && (
        <div className="mb-4 p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 flex items-center gap-3">
          <span className="text-2xl">😕</span>
          {state.errors.general}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <input type="hidden" name="sessionId" value={sessionId} />
        
        {/* Personal Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-bold mb-2">
              <span className="text-lg">👤</span>
              {t.firstName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              placeholder="🌟"
              className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-zinc-800 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition text-lg ${
                state.errors?.firstName 
                  ? "border-red-400 bg-red-50 dark:bg-red-900/20" 
                  : "border-purple-300 dark:border-purple-600 bg-purple-50/50 dark:bg-purple-900/20"
              }`}
            />
            {state.errors?.firstName && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <span>⚠️</span> {state.errors.firstName}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-bold mb-2">
              <span className="text-lg">👥</span>
              {t.lastName}
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="🌈"
              className="w-full rounded-xl border-2 border-purple-300 dark:border-purple-600 bg-purple-50/50 dark:bg-purple-900/20 px-4 py-3 dark:bg-zinc-800 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="flex items-center gap-2 text-sm font-bold mb-2">
              <span className="text-lg">📱</span>
              {t.phoneNumber} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              required
              placeholder="06..."
              className={`w-full rounded-xl border-2 px-4 py-3 dark:bg-zinc-800 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition text-lg ${
                state.errors?.phoneNumber 
                  ? "border-red-400 bg-red-50 dark:bg-red-900/20" 
                  : "border-pink-300 dark:border-pink-600 bg-pink-50/50 dark:bg-pink-900/20"
              }`}
            />
            {state.errors?.phoneNumber && (
              <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                <span>⚠️</span> {state.errors.phoneNumber}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-bold mb-2">
              <span className="text-lg">📧</span>
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="✉️"
              className="w-full rounded-xl border-2 border-cyan-300 dark:border-cyan-600 bg-cyan-50/50 dark:bg-cyan-900/20 px-4 py-3 dark:bg-zinc-800 focus:ring-4 focus:ring-yellow-300 focus:border-yellow-400 outline-none transition text-lg"
            />
          </div>
        </div>

        {/* Photo Consent Checkbox */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700">
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative mt-1 flex-shrink-0">
              <input
                type="checkbox"
                name="photoConsent"
                className="peer w-7 h-7 rounded-lg border-2 border-blue-400 bg-white dark:bg-zinc-800 checked:bg-blue-500 checked:border-blue-500 transition appearance-none cursor-pointer"
              />
              <svg
                className="absolute top-1 left-1 w-5 h-5 text-white opacity-0 peer-checked:opacity-100 transition pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="absolute -top-1 -right-1 text-lg">📸</span>
            </div>
            <span className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {t.photoConsent}
            </span>
          </label>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-2xl bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 px-6 py-4 font-bold text-xl text-white hover:from-green-500 hover:via-yellow-500 hover:to-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-3"
          >
            {pending ? (
              <>
                <span className="animate-spin text-2xl">🌀</span>
                {t.submitting}
              </>
            ) : (
              <>
                <span className="text-2xl">🎨</span>
                {t.submit}
                <span className="text-2xl">✨</span>
              </>
            )}
          </button>
        </div>
      </form>


      <div className="mt-6 text-center">
        <Link
          href={language === "nl" ? "/" : `/?lang=${language}`}
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition font-medium"
        >
          <span className="text-xl">🏠</span>
          {t.backToHome}
        </Link>
      </div>
    </div>
  );
}
