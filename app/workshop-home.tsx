import Image from "next/image";
import Link from "next/link";
import { getAllSessionStats } from "./lib/data";
import { Language, SessionId, SESSIONS, MAX_CAPACITY } from "./lib/types";
import { translations } from "./lib/translations";

type Session = {
  date: string;
  book: string;
  group: string;
};

type Book = {
  title: string;
  ageGroup: string;
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  emoji: string;
};

type Content = {
  announcement: string;
  introQuestion: string;
  introBody: string;
  offerTitle: string;
  offers: string[];
  booksTitle: string;
  books: Book[];
  teamTitle: string;
  team: TeamMember[];
  scheduleTitle: string;
  sessions: Session[];
  scheduleNote: string;
  locationLabel: string;
  locationValue: string;
  timeLabel: string;
  timeValue: string;
  participation: string;
  catering: string;
  exhibition: string;
  registrationTitle: string;
  emailLabel: string;
  emailValue: string;
  phoneLabel: string;
  phoneValue: string;
  limitedNotice: string;
};

// Session images mapping - placeholder gradients (can be replaced with actual images)
const sessionImages: Record<SessionId, { emoji: string; gradient: string }> = {
  "2026-04-25": { emoji: "🐠", gradient: "from-blue-400 to-cyan-300" },
  "2026-05-23": { emoji: "⭐", gradient: "from-yellow-400 to-orange-300" },
  "2026-08-22": { emoji: "🌱", gradient: "from-green-400 to-emerald-300" },
  "2026-09-19": { emoji: "🌊", gradient: "from-indigo-400 to-blue-300" },
  "2026-10-17": { emoji: "🌹", gradient: "from-purple-400 to-pink-300" },
};

const contentByLanguage: Record<Language, Content> = {
  nl: {
    announcement: "Aanmelding geo pend - Creatieve kinderworkshops",
    introQuestion: "Is jouw kind dol op verhalen en creativiteit?",
    introBody:
      "In dit unieke programma combineren kinderen storytelling en kunst om hun fantasie en expressie te ontwikkelen.",
    offerTitle: "Wat bieden wij:",
    offers: [
      "Meertalige storytelling (Nederlands, Engels, Farsi)",
      "Creatieve kunstactiviteiten",
      "Ontwikkeling van zelfvertrouwen en expressie",
      "Een veilige en inspirerende omgeving",
    ],
    booksTitle: "Boeken:",
    books: [
      { title: "De mooiste vis van de zee", ageGroup: "Peuters (2.5 - t/m 3 jaar)" },
      { title: "Draw me a star", ageGroup: "Groep 1 en 2" },
      { title: "The tiny seed", ageGroup: "Groep 3-4" },
      { title: "Flotsam", ageGroup: "Groep 5-6" },
      { title: "The little prince", ageGroup: "Groep 7-8" },
    ],
    teamTitle: "Maak kennis met het team",
    team: [
      {
        name: "Fariba Baharloo",
        role: "Docent Creatieve Kunst",
        bio: "Fariba Baharloo is een creatieve kunstdocent en oprichter van Toranj Art. Zij begeleidt kinderen door middel van schilderen en visuele expressie en helpt hen hun verbeelding en zelfvertrouwen te ontwikkelen in een inspirerende omgeving.",
        image: "/Fariba_Baharloo.jpeg",
        emoji: "👩‍🎨",
      },
      {
        name: "Nastaran Fadaei Heidari",
        role: "Docent Storytelling",
        bio: "Nastaran Fadaei Heidari is storytelling docent en oprichter van Siblings Education. Zij neemt kinderen mee in inspirerende en meertalige verhalen en creëert een speelse omgeving waarin taal, verbeelding en creativiteit samenkomen.",
        image: "/Nastaran_Fadaei_Heidari.jpeg",
        emoji: "📚",
      },
    ],
    scheduleTitle: "Data & leeftijdsgroepen:",
    sessions: [
      {
        date: "25 april 2026",
        book: "De mooiste vis van de zee",
        group: "Peuters (2.5 - 3 jaar)",
      },
      {
        date: "23 mei 2026",
        book: "Draw me a star",
        group: "Groep 1-2",
      },
      {
        date: "22 augustus 2026",
        book: "The tiny seed",
        group: "Groep 3-4",
      },
      {
        date: "19 september 2026",
        book: "Flotsam",
        group: "Groep 5-6",
      },
      {
        date: "17 oktober 2026",
        book: "The little prince",
        group: "Groep 7-8",
      },
    ],
    scheduleNote:
      "Elke sessie is afgestemd op een specifieke leeftijdsgroep.",
    locationLabel: "Locatie",
    locationValue: "Buurtcentrum Sint Pieter - Maastricht",
    timeLabel: "Tijd",
    timeValue: "11:45 - 14:15",
    participation:
      "Gratis deelname (met ondersteuning van Gemeente Maastricht)",
    catering: "Catering en materialen inbegrepen",
    exhibition: "Eindtentoonstelling van kinderwerken",
    registrationTitle: "Aanmelden:",
    emailLabel: "Email",
    emailValue: "h.teimoory@gmail.com",
    phoneLabel: "Tel",
    phoneValue: "063371716",
    limitedNotice: "Beperkt aantal plaatsen - meld je snel aan!",
  },
  en: {
    announcement: "Registration open - Creative workshops for children",
    introQuestion: "Does your child love stories and creativity?",
    introBody:
      "In this unique program, children combine storytelling and art to develop imagination and expression.",
    offerTitle: "What we offer:",
    offers: [
      "Multilingual storytelling (Dutch, English, Farsi)",
      "Creative art activities",
      "Building confidence and self-expression",
      "A safe and inspiring environment",
    ],
    booksTitle: "Books:",
    books: [
      { title: "The Rainbow Fish", ageGroup: "Toddlers (2.5 - 3 years)" },
      { title: "Draw me a star", ageGroup: "Group 1 and 2" },
      { title: "The tiny seed", ageGroup: "Group 3-4" },
      { title: "Flotsam", ageGroup: "Group 5-6" },
      { title: "The little prince", ageGroup: "Group 7-8" },
    ],
    teamTitle: "Meet the Team",
    team: [
      {
        name: "Fariba Baharloo",
        role: "Creative Art Instructor",
        bio: "Fariba Baharloo is a creative art instructor and founder of Toranj Art. She works with children through painting and visual expression, helping them explore their imagination and develop confidence in a supportive and inspiring environment.",
        image: "/Fariba_Baharloo.jpeg",
        emoji: "👩‍🎨",
      },
      {
        name: "Nastaran Fadaei Heidari",
        role: "Storytelling Instructor",
        bio: "Nastaran Fadaei Heidari is a storytelling instructor and founder of Siblings Education. She brings stories to life in a multilingual setting, creating a playful and engaging space where children connect with language, imagination, and creativity.",
        image: "/Nastaran_Fadaei_Heidari.jpeg",
        emoji: "📚",
      },
    ],
    scheduleTitle: "Dates & age groups:",
    sessions: [
      {
        date: "April 25, 2026",
        book: "The Rainbow Fish",
        group: "Toddlers (2.5 - 3 years)",
      },
      {
        date: "May 23, 2026",
        book: "Draw me a star",
        group: "Group 1-2",
      },
      {
        date: "August 22, 2026",
        book: "The tiny seed",
        group: "Group 3-4",
      },
      {
        date: "September 19, 2026",
        book: "Flotsam",
        group: "Group 5-6",
      },
      {
        date: "October 17, 2026",
        book: "The little prince",
        group: "Group 7-8",
      },
    ],
    scheduleNote: "Each session is tailored to a specific age group.",
    locationLabel: "Location",
    locationValue: "Buurtcentrum Sint Pieter - Maastricht",
    timeLabel: "Time",
    timeValue: "11:45 - 14:15",
    participation: "Free participation (supported by Municipality of Maastricht)",
    catering: "Snacks and materials included",
    exhibition: "Final exhibition of children's artworks",
    registrationTitle: "Registration:",
    emailLabel: "Email",
    emailValue: "h.teimoory@gmail.com",
    phoneLabel: "Phone",
    phoneValue: "063371716",
    limitedNotice: "Limited spots available - register soon!",
  },
  fa: {
    announcement: "فراخوان ثبت نام کارگاه خلاقیت کودکانه",
    introQuestion: "آیا کودک شما به داستان و نقاشی علاقه دارد؟",
    introBody:
      "در این برنامه، کودکان با ترکیب داستان گویی و هنر، خلاقیت و تخیل خود را پرورش می دهند.",
    offerTitle: "ویژگی ها:",
    offers: [
      "داستان گویی چندزبانه (هلندی، انگلیسی، فارسی)",
      "فعالیت های هنری خلاقانه",
      "تقویت اعتماد به نفس و بیان هنری",
      "محیطی امن و الهام بخش",
    ],
    booksTitle: "کتاب‌ها:",
    books: [
      { title: "زیباترین ماهی دریا", ageGroup: "۲.۵ تا ۳ سال" },
      { title: "برایم یک ستاره بکش", ageGroup: "پایه ۱ و ۲" },
      { title: "دانه کوچک", ageGroup: "پایه ۳ و ۴" },
      { title: "Flotsam", ageGroup: "پایه ۵ و ۶" },
      { title: "شازده کوچولو", ageGroup: "پایه ۷ و ۸" },
    ],
    teamTitle: "با تیم ما آشنا شوید",
    team: [
      {
        name: "فریبا بهارلو",
        role: "مربی هنرهای تجسمی",
        bio: "فریبا بهارلو مربی هنرهای تجسمی و بنیان‌گذار تورنج آرت است. او با کودکان از طریق نقاشی و بیان بصری کار می‌کند و به آن‌ها کمک می‌کند تا تخیل خود را کشف کنند و اعتماد به نفس خود را در محیطی حمایتی و الهام‌بخش توسعه دهند.",
        image: "/Fariba_Baharloo.jpeg",
        emoji: "👩‍🎨",
      },
      {
        name: "نسترن فدایی حیدری",
        role: "مربی قصه‌گویی",
        bio: "نسترن فدایی حیدری مربی قصه‌گویی و بنیان‌گذار Siblings Education است. او داستان‌ها را در محیطی چندزبانه زنده می‌کند و فضایی بازیگوش و جذاب ایجاد می‌کند که در آن کودکان با زبان، تخیل و خلاقیت ارتباط برقرار می‌کنند.",
        image: "/Nastaran_Fadaei_Heidari.jpeg",
        emoji: "📚",
      },
    ],
    scheduleTitle: "تاریخ ها و گروه های سنی:",
    sessions: [
      {
        date: "۲۵ آوریل ۲۰۲۶",
        book: "زیباترین ماهی دریا",
        group: "گروه سنی: ۲.۵ تا ۳ سال",
      },
      {
        date: "۲۳ مه ۲۰۲۶",
        book: "برایم یک ستاره بکش",
        group: "گروه سنی: پایه ۱ و ۲",
      },
      {
        date: "۲۲ آگوست ۲۰۲۶",
        book: "دانه کوچک",
        group: "گروه سنی: پایه ۳ و ۴",
      },
      {
        date: "۱۹ سپتامبر ۲۰۲۶",
        book: "Flotsam",
        group: "گروه سنی: پایه ۵ و ۶",
      },
      {
        date: "۱۷ اکتبر ۲۰۲۶",
        book: "شازده کوچولو",
        group: "گروه سنی: پایه ۷ و ۸",
      },
    ],
    scheduleNote: "هر جلسه متناسب با یک گروه سنی طراحی شده است.",
    locationLabel: "محل برگزاری",
    locationValue: "Buurtcentrum Sint Pieter - Maastricht",
    timeLabel: "زمان",
    timeValue: "11:45 - 14:15",
    participation: "شرکت رایگان (با حمایت شهرداری ماستریخت)",
    catering: "پذیرایی و متریال فراهم است",
    exhibition: "نمایشگاه پایانی آثار کودکان",
    registrationTitle: "ثبت نام:",
    emailLabel: "ایمیل",
    emailValue: "h.teimoory@gmail.com",
    phoneLabel: "تلفن",
    phoneValue: "063371716",
    limitedNotice: "ظرفیت محدود است - زودتر ثبت نام کنید!",
  },
};

const languageOptions: { code: Language; label: string }[] = [
  { code: "nl", label: "Nederlands" },
  { code: "en", label: "English" },
  { code: "fa", label: "فارسی" },
];

type WorkshopHomeProps = {
  language: Language;
};

export default async function WorkshopHome({ language }: WorkshopHomeProps) {
  const content = contentByLanguage[language];
  const t = translations[language];
  const sessionStats = await getAllSessionStats();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/20 dark:bg-zinc-900 sm:p-8">
        {/* Hero Image */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/img.png"
            alt="Creative Storytelling & Painting for Children"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
            priority
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl">
            🎨✨ Creative Storytelling & Painting for Children ✨🎨
          </h1>
          <div
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2 py-1 dark:border-white/20"
            aria-label="Language switcher"
          >
            <span aria-hidden="true" className="text-sm">
              🌐
            </span>
            {languageOptions.map((option) => {
              const isActive = language === option.code;
              const href = option.code === "nl" ? "/" : `/?lang=${option.code}`;

              return (
                <Link
                  key={option.code}
                  href={href}
                  className={`rounded-full px-3 py-1 text-sm transition ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>

        <section className="space-y-5" dir={language === "fa" ? "rtl" : "ltr"}>
          <div>
            <p className="text-lg font-semibold">{content.announcement}</p>
            <p className="mt-2 font-medium">{content.introQuestion}</p>
            <p className="mt-1 text-black/80 dark:text-white/80">{content.introBody}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">🌟 {content.offerTitle}</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {content.offers.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Books Section */}
          <div>
            <h2 className="text-lg font-semibold">📚 {content.booksTitle}</h2>
            <ol className="mt-2 list-decimal space-y-1 pl-6">
              {content.books.map((book, index) => (
                <li key={index}>
                  <span className="font-medium">{book.title}</span> — {book.ageGroup}
                </li>
              ))}
            </ol>
          </div>

          {/* Meet the Team Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">👩‍🏫 {content.teamTitle}</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {content.team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
                >
                  <div className="flex flex-col items-center p-6">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover border-4 border-white dark:border-zinc-800 shadow-lg"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center">
                      {member.emoji} {member.name}
                    </h3>
                    <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-black/70 dark:text-white/70 text-center leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Session Cards */}
          <div>
            <h2 className="text-lg font-semibold mb-4">🗓 {content.scheduleTitle}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SESSIONS.map((session, index) => {
                const contentSession = content.sessions[index];
                const stats = sessionStats[session.id];
                const imageData = sessionImages[session.id];
                
                return (
                  <Link
                    key={session.id}
                    href={`/register?session=${session.id}&lang=${language}`}
                    className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/10 hover:border-amber-400 dark:hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    {/* Image/Gradient Header */}
                    <div className={`h-32 bg-gradient-to-br ${imageData.gradient} flex items-center justify-center`}>
                      <span className="text-6xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {imageData.emoji}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 space-y-2">
                      <p className="font-bold text-amber-600 dark:text-amber-400">
                        📅 {contentSession.date}
                      </p>
                      <p className="font-medium line-clamp-2">
                        📖 {contentSession.book}
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60">
                        👥 {contentSession.group}
                      </p>
                      
                      {/* Availability Badge */}
                      <div className="pt-2">
                        {stats.isFull ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1 text-sm font-medium text-amber-700 dark:text-amber-400">
                            ⏳ {t.waitingList}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-medium text-green-700 dark:text-green-400">
                            ✅ {stats.spotsAvailable} {stats.spotsAvailable === 1 ? t.spotAvailable : t.spotsAvailable}
                          </span>
                        )}
                      </div>
                      
                      {/* CTA Button */}
                      <div className="pt-2">
                        <span className="block w-full text-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white group-hover:from-amber-600 group-hover:to-orange-600 transition-all shadow group-hover:shadow-lg">
                          {stats.isFull ? t.joinWaitingList : t.registerNow} →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-black/80 dark:text-white/80">📌 {content.scheduleNote}</p>
          </div>

          <div className="space-y-1">
            <p>
              📍 <span className="font-semibold">{content.locationLabel}:</span> {content.locationValue}
            </p>
            <p>
              🕒 <span className="font-semibold">{content.timeLabel}:</span> {content.timeValue}
            </p>
            <p>💛 {content.participation}</p>
            <p>🍪 {content.catering}</p>
            <p>🎨 {content.exhibition}</p>
          </div>

          <div className="space-y-1 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-400/30 dark:bg-amber-400/10">
            <h2 className="font-semibold">📩 {content.registrationTitle}</h2>
            <p>
              <span className="font-semibold">{content.emailLabel}:</span> {content.emailValue}
            </p>
            <p>
              <span className="font-semibold">{content.phoneLabel}:</span> {content.phoneValue}
            </p>
            <p className="font-medium">⚠️ {content.limitedNotice}</p>
          </div>
        </section>
      </div>

      {/* Floating Registration Bot */}
      <Link
        href={`/register?lang=${language}`}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Speech Bubble */}
          <div className="absolute bottom-full right-0 mb-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-white dark:bg-zinc-800 rounded-xl p-3 shadow-xl border border-black/10 dark:border-white/10">
              <p className="text-sm font-medium">{t.botGreeting}</p>
              <p className="text-xs text-black/60 dark:text-white/60 mt-1">{t.botCTA}</p>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-zinc-800 border-r border-b border-black/10 dark:border-white/10"></div>
            </div>
          </div>
          
          {/* Bot Button */}
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-bounce">
            <span className="text-3xl">🤖</span>
          </div>
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-amber-500 animate-ping opacity-20"></div>
        </div>
      </Link>
    </main>
  );
}
