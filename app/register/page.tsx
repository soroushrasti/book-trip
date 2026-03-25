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
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/20 dark:bg-zinc-900 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">{t.registrationTitle}</h1>
            <div
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2 py-1 dark:border-white/20"
            >
              <span className="text-sm">🌐</span>
              {languageOptions.map((option) => {
                const isActive = language === option.code;
                const href = `/register?lang=${option.code}`;
                return (
                  <Link
                    key={option.code}
                    href={href}
                    className={`rounded-full px-3 py-1 text-sm transition ${
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    {option.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <p className="mb-6 text-black/70 dark:text-white/70" dir={isRTL ? "rtl" : "ltr"}>
            {t.sessionLabel}:
          </p>

          <div className="grid gap-4" dir={isRTL ? "rtl" : "ltr"}>
            {SESSIONS.map(async (session) => {
              const stats = await getSessionStats(session.id);
              return (
                <Link
                  key={session.id}
                  href={`/register?session=${session.id}&lang=${language}`}
                  className="block p-4 rounded-xl border border-black/10 dark:border-white/10 hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        📖 {session.book}
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        {session.group}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        stats.isFull 
                          ? "text-amber-600 dark:text-amber-400" 
                          : "text-green-600 dark:text-green-400"
                      }`}>
                        {stats.isFull 
                          ? `⏳ ${t.waitingList}`
                          : `✅ ${stats.spotsAvailable} ${stats.spotsAvailable === 1 ? t.spotAvailable : t.spotsAvailable}`
                        }
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
              className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition"
            >
              ← {t.backToHome}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const stats = await getSessionStats(sessionId);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/20 dark:bg-zinc-900 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold">
            🎨 {stats.isFull ? t.waitingListTitle : t.registrationTitle}
          </h1>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2 py-1 dark:border-white/20"
          >
            <span className="text-sm">🌐</span>
            {languageOptions.map((option) => {
              const isActive = language === option.code;
              const href = `/register?session=${sessionId}&lang=${option.code}`;
              return (
                <Link
                  key={option.code}
                  href={href}
                  className={`rounded-full px-3 py-1 text-sm transition ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
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
          isWaitingList={stats.isFull}
          sessionStats={{
            registeredCount: stats.registeredCount,
            spotsAvailable: stats.spotsAvailable,
          }}
        />
      </div>
    </main>
  );
}

