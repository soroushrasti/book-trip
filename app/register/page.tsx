import Link from "next/link";
import RegistrationForm from "./registration-form";
import { getSessionStats } from "../lib/data";
import { Language, SessionId, SESSIONS } from "../lib/types";
import { translations } from "../lib/translations";

const languageSet = new Set<Language>(["nl", "en", "fa"]);
const sessionIdSet = new Set<SessionId>(SESSIONS.map((s) => s.id));

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const languageOptions: { code: Language; label: string }[] = [
  { code: "nl", label: "Nederlands" },
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی" },
];

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const params = searchParams ? await searchParams : undefined;
  
  const rawLang = params?.lang;
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang;
  const language: Language =
    lang && languageSet.has(lang as Language) ? (lang as Language) : "nl";

  const rawSession = params?.session;
  const sessionParam = Array.isArray(rawSession) ? rawSession[0] : rawSession;
  const sessionId = sessionParam && sessionIdSet.has(sessionParam as SessionId) 
    ? (sessionParam as SessionId) 
    : null;

  const t = translations[language];
  const isRTL = language === "fa";

  if (!sessionId) {
    // Show session selection
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 pt-24">
        <div className="rounded-3xl border-4 border-purple-400 bg-white/90 backdrop-blur-sm p-6 shadow-2xl dark:bg-zinc-900/90 sm:p-8 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-2 right-2 text-3xl animate-bounce">🎨</div>
          <div className="absolute bottom-2 left-2 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>📚</div>
          
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-3xl">✏️</span>
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                {t.registrationTitle}
              </span>
              <span className="text-3xl">✨</span>
            </h1>
            <div
              className="inline-flex items-center gap-2 rounded-full border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 shadow-lg"
            >
              <span className="text-lg">🌍</span>
              {languageOptions.map((option) => {
                const isActive = language === option.code;
                const href = `/register?lang=${option.code}`;
                return (
                  <Link
                    key={option.code}
                    href={href}
                    className={`rounded-full px-3 py-1 text-sm font-bold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md scale-105"
                        : "hover:bg-purple-200 dark:hover:bg-purple-800"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <p className="mb-6 text-lg font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2" dir={isRTL ? "rtl" : "ltr"}>
            <span className="text-2xl">👇</span>
            {t.sessionLabel}:
            <span className="text-2xl">🎯</span>
          </p>

          <div className="grid gap-4" dir={isRTL ? "rtl" : "ltr"}>
            {SESSIONS.map(async (session, index) => {
              const stats = await getSessionStats(session.id);
              const emojis = ['🐠', '⭐', '🌱', '🌊', '👑'];
              if (stats.isFull) {
                return (
                  <div
                    key={session.id}
                    className="block p-4 rounded-2xl border-4 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 opacity-60 shadow-lg cursor-not-allowed"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">{emojis[index]}</span>
                        <div>
                          <p className="font-bold text-lg text-gray-500 dark:text-gray-400 flex items-center gap-2">
                            <span>📖</span> {session.book}
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <span>👶</span> {session.group}
                          </p>
                          <p className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <span>🕐</span> {session.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400">
                          🚫 {t.full}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={session.id}
                  href={`/register?session=${session.id}&lang=${language}`}
                  className="block p-4 rounded-2xl border-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-pink-50 dark:from-yellow-900/20 dark:to-pink-900/20 hover:border-pink-500 hover:scale-[1.02] transition-all group shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{emojis[index]}</span>
                      <div>
                        <p className="font-bold text-lg text-purple-700 dark:text-purple-300 group-hover:text-pink-600 transition flex items-center gap-2">
                          <span>📖</span> {session.book}
                        </p>
                        <p className="text-sm text-pink-600 dark:text-pink-400 flex items-center gap-1">
                          <span>👶</span> {session.group}
                        </p>
                        <p className="text-sm text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                          <span>🕐</span> {session.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400">
                        ✅ {stats.spotsAvailable} {stats.spotsAvailable === 1 ? t.spotAvailable : t.spotsAvailable}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <Link
              href={language === "nl" ? "/" : `/?lang=${language}`}
              className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 transition font-bold"
            >
              <span className="text-xl">🏠</span>
              {t.backToHome}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const stats = await getSessionStats(sessionId);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8 pt-24">
      <div className="rounded-3xl border-4 border-pink-400 bg-white/90 backdrop-blur-sm p-6 shadow-2xl dark:bg-zinc-900/90 sm:p-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 text-3xl animate-bounce">✨</div>
        <div className="absolute bottom-2 left-2 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🎨</div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce" style={{animationDelay: '0.3s'}}>📝</div>
        
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🎨</span>
            <span className="text-3xl">✨</span>
          </h1>
          <div
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-300 dark:border-purple-600 bg-white/80 dark:bg-zinc-800/80 px-3 py-1.5"
          >
            <span className="text-lg">🌐</span>
            {languageOptions.map((option) => {
              const isActive = language === option.code;
              const href = `/register?session=${sessionId}&lang=${option.code}`;
              return (
                <Link
                  key={option.code}
                  href={href}
                  className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md"
                      : "hover:bg-purple-100 dark:hover:bg-purple-900/30"
                  }`}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>

        <RegistrationForm
          language={language}
          sessionId={sessionId}
          sessionStats={{
            registeredCount: stats.registeredCount,
            spotsAvailable: stats.spotsAvailable,
          }}
        />
      </div>
    </main>
  );
}

