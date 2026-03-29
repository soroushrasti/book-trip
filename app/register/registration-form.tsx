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

// Social sharing component
function SocialShare({ url, text, t }: { url: string; text: string; t: { shareTitle: string } }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return (
    <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-cyan-900/30 border-2 border-dashed border-purple-300 dark:border-purple-600">
      <p className="text-center font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center justify-center gap-2">
        <span className="text-2xl">🎉</span>
        {t.shareTitle}
        <span className="text-2xl">🎉</span>
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="font-medium">WhatsApp</span>
        </a>

        {/* Telegram */}
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span className="font-medium">Telegram</span>
        </a>

        {/* Instagram (copy link) */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${text} ${url}`);
            alert("Link copied! Share on Instagram 📸");
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
          <span className="font-medium">Instagram</span>
        </button>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition transform hover:scale-105 shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          <span className="font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  );
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
  const shareUrl = typeof window !== "undefined" ? window.location.origin : "";

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

        <SocialShare url={shareUrl} text={t.shareText} t={t} />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href={`/register?session=${sessionId}&lang=${language}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white hover:from-pink-600 hover:to-orange-600 transition shadow-lg transform hover:scale-105"
          >
            <span className="text-xl">👋</span>
            {t.registerAnother}
          </Link>
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
      <div className="mb-6 rounded-2xl overflow-hidden bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 dark:from-yellow-900/30 dark:via-pink-900/30 dark:to-purple-900/30 border-4 border-dashed border-yellow-400 dark:border-yellow-600 shadow-lg">
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

      {/* Social Share */}
      <SocialShare url={shareUrl} text={t.shareText} t={t} />

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
