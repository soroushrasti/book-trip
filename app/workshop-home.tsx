import Image from "next/image";
import Link from "next/link";
import { getAllSessionStats } from "./lib/data";
import { Language, SESSIONS } from "./lib/types";
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
      { title: "De mooiste vis van de zee", ageGroup: "Groep 1-2" },
      { title: "Billy the Bat's big adventure", ageGroup: "Groep 1-2" },
      { title: "Draw me a star", ageGroup: "Groep 3-4" },
      { title: "The tiny seed", ageGroup: "Groep 5-6" },
      { title: "Flotsam", ageGroup: "Groep 7-8" },
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
        group: "Groep 1-2",
      },
      {
        date: "23 mei 2026",
        book: "Billy the Bat's big adventure",
        group: "Groep 1-2",
      },
      {
        date: "22 augustus 2026",
        book: "Draw me a star",
        group: "Groep 3-4",
      },
      {
        date: "19 september 2026",
        book: "The tiny seed",
        group: "Groep 5-6",
      },
      {
        date: "17 oktober 2026",
        book: "Flotsam",
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
      { title: "The Rainbow Fish", ageGroup: "Group 1-2" },
      { title: "Billy the Bat's big adventure", ageGroup: "Group 1-2" },
      { title: "Draw me a star", ageGroup: "Group 3-4" },
      { title: "The tiny seed", ageGroup: "Group 5-6" },
      { title: "Flotsam", ageGroup: "Group 7-8" },
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
        group: "Group 1-2",
      },
      {
        date: "May 23, 2026",
        book: "Billy the Bat's big adventure",
        group: "Group 1-2",
      },
      {
        date: "August 22, 2026",
        book: "Draw me a star",
        group: "Group 3-4",
      },
      {
        date: "September 19, 2026",
        book: "The tiny seed",
        group: "Group 5-6",
      },
      {
        date: "October 17, 2026",
        book: "Flotsam",
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
      { title: "زیباترین ماهی دریا", ageGroup: "پایه ۱ و ۲" },
      { title: "Billy the Bat's big adventure", ageGroup: "پایه ۱ و ۲" },
      { title: "برایم یک ستاره بکش", ageGroup: "پایه ۳ و ۴" },
      { title: "دانه کوچک", ageGroup: "پایه ۵ و ۶" },
      { title: "Flotsam", ageGroup: "پایه ۷ و ۸" },
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
        group: "گروه سنی: پایه ۱ و ۲",
      },
      {
        date: "۲۳ مه ۲۰۲۶",
        book: "Billy the Bat's big adventure",
        group: "گروه سنی: پایه ۱ و ۲",
      },
      {
        date: "۲۲ آگوست ۲۰۲۶",
        book: "برایم یک ستاره بکش",
        group: "گروه سنی: پایه ۳ و ۴",
      },
      {
        date: "۱۹ سپتامبر ۲۰۲۶",
        book: "دانه کوچک",
        group: "گروه سنی: پایه ۵ و ۶",
      },
      {
        date: "۱۷ اکتبر ۲۰۲۶",
        book: "Flotsam",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://book-trip.up.railway.app";

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8 pt-24">
      <div className="rounded-3xl border-4 border-pink-400 bg-white/90 backdrop-blur-sm p-6 shadow-2xl dark:bg-zinc-900/90 sm:p-8 relative overflow-hidden">
        {/* Decorative corner stars */}
        <div className="absolute top-2 right-2 text-3xl animate-bounce">⭐</div>
        <div className="absolute bottom-2 left-2 text-3xl animate-bounce" style={{animationDelay: '0.5s'}}>🌟</div>
        
        {/* Hero Image */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Image
              src="/img.png"
              alt="Creative Storytelling & Painting for Children"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
              priority
            />
            <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎨</div>
            <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{animationDelay: '0.3s'}}>✨</div>
            <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce" style={{animationDelay: '0.6s'}}>📚</div>
            <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce" style={{animationDelay: '0.9s'}}>🖌️</div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold sm:text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            🎨✨ Creative Storytelling & Painting for Children ✨🎨
          </h1>
          <div
            className="inline-flex items-center gap-2 rounded-full border-2 border-purple-400 bg-purple-50 dark:bg-purple-900/30 px-3 py-1.5 shadow-lg"
            aria-label="Language switcher"
          >
            <span aria-hidden="true" className="text-lg">
              🌍
            </span>
            {languageOptions.map((option) => {
              const isActive = language === option.code;
              const href = option.code === "nl" ? "/" : `/?lang=${option.code}`;

              return (
                <Link
                  key={option.code}
                  href={href}
                  className={`rounded-full px-3 py-1 text-sm font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-md scale-105"
                      : "hover:bg-purple-200 dark:hover:bg-purple-800"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {option.label}
                </Link>
              );
            })}
          </div>
        </div>

        <section className="space-y-6" dir={language === "fa" ? "rtl" : "ltr"}>
          {/* Announcement Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 dark:from-yellow-900/30 dark:via-pink-900/30 dark:to-purple-900/30 border-2 border-yellow-400 shadow-lg">
            <p className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📢</span> {content.announcement}
            </p>
            <p className="mt-2 font-medium flex items-center gap-2">
              <span className="text-xl">🤔</span> {content.introQuestion}
            </p>
            <p className="mt-1 text-black/80 dark:text-white/80 flex items-center gap-2">
              <span className="text-xl">🌈</span> {content.introBody}
            </p>
          </div>

          {/* What we offer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-green-100 to-cyan-100 dark:from-green-900/30 dark:to-cyan-900/30 border-2 border-green-400 shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">🌟</span> {content.offerTitle}
            </h2>
            <ul className="mt-3 space-y-2">
              {content.offers.map((item, index) => (
                <li key={item} className="flex items-center gap-2 text-lg">
                  <span className="text-xl">{['🗣️', '🎨', '💪', '🏠'][index]}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Books Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 border-2 border-orange-400 shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl">📚</span> {content.booksTitle}
            </h2>
            <div className="mt-3 grid gap-2">
              {content.books.map((book, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-xl bg-white/50 dark:bg-white/10 hover:scale-[1.02] transition-transform">
                  <span className="text-2xl">{['🐠', '⭐', '🌱', '🌊', '👑'][index]}</span>
                  <div>
                    <span className="font-bold text-purple-700 dark:text-purple-300">{book.title}</span>
                    <span className="mx-2">—</span>
                    <span className="text-pink-600 dark:text-pink-400">{book.ageGroup}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meet the Team Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 border-2 border-pink-400 shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="text-2xl">👩‍🏫</span> {content.teamTitle}
              <span className="text-2xl">👩‍🎨</span>
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {content.team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border-2 border-purple-400 overflow-hidden bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:scale-[1.02] transition-transform"
                >
                  <div className="flex flex-col items-center p-4">
                    <div className="relative w-20 h-20 mb-3">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 text-xl">{member.emoji}</div>
                    </div>
                    <h3 className="text-base font-bold text-center text-purple-700 dark:text-purple-300">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-pink-600 dark:text-pink-400 mb-2 flex items-center gap-1">
                      <span>✨</span> {member.role} <span>✨</span>
                    </p>
                    <p className="text-xs text-black/70 dark:text-white/70 text-center leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Session Cards */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 border-2 border-cyan-400 shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <span className="text-2xl">🗓️</span> {content.scheduleTitle}
              <span className="text-2xl">🎉</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SESSIONS.map((session, index) => {
                const contentSession = content.sessions[index];
                const stats = sessionStats[session.id];

                return (
                  <Link
                    key={session.id}
                    href={`/register?session=${session.id}&lang=${language}`}
                    className="group relative overflow-hidden rounded-2xl border-2 border-purple-300 hover:border-pink-500 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-white dark:bg-zinc-800"
                  >
                    {/* Session Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-zinc-700 dark:to-zinc-800">
                      <Image
                        src={session.image}
                        alt={contentSession.book}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Exhibition badge for last session */}
                      {session.isExhibition && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                          🎨 {t.exhibition}
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-3 space-y-1 bg-gradient-to-br from-yellow-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-800">
                      <p className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1 text-sm">
                        <span>📖</span> {contentSession.book}
                      </p>
                      <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 text-sm">
                        <span>📅</span> {contentSession.date}
                      </p>
                      <p className="text-sm text-black/70 dark:text-white/70 flex items-center gap-1">
                        <span>👶</span> {contentSession.group}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1">
                        <span>🕐</span> {session.time}
                      </p>
                      
                      {/* Availability Badge */}
                      <div className="pt-1">
                        {stats.isFull ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                            ⏳ {t.waitingList}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/30 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                            ✅ {stats.spotsAvailable} {stats.spotsAvailable === 1 ? t.spotAvailable : t.spotsAvailable}
                          </span>
                        )}
                      </div>
                      
                      {/* CTA Button */}
                      <div className="pt-1">
                        <span className="w-full text-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white group-hover:from-pink-600 group-hover:to-orange-600 transition-all shadow-lg group-hover:shadow-xl flex items-center justify-center gap-1">
                          <span>🎨</span> {stats.isFull ? t.joinWaitingList : t.registerNow} <span>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 text-sm bg-white/50 dark:bg-white/10 rounded-full px-4 py-2 inline-flex items-center gap-2">
              <span>📌</span> {content.scheduleNote}
            </p>
          </div>

          {/* Location Info */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-lime-100 to-green-100 dark:from-lime-900/30 dark:to-green-900/30 border-2 border-lime-400 shadow-lg space-y-3">
            <div className="flex items-center gap-3 text-lg">
              <span className="text-3xl">📍</span>
              <div>
                <span className="font-bold">{content.locationLabel}:</span>
                <span className="ml-2">{content.locationValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-3xl">🕐</span>
              <div>
                <span className="font-bold">{content.timeLabel}:</span>
                <span className="ml-2 text-purple-700 dark:text-purple-300 font-bold">{content.timeValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-3xl">💛</span>
              <span>{content.participation}</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-3xl">🍪</span>
              <span>{content.catering}</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <span className="text-3xl">🖼️</span>
              <span>{content.exhibition}</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-200 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40 border-4 border-amber-500 shadow-lg">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-3">
              <span className="text-2xl">📩</span> {content.registrationTitle}
              <span className="text-2xl">✉️</span>
            </h2>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-lg">
                <span className="text-2xl">📧</span>
                <span className="font-bold">{content.emailLabel}:</span>
                <span className="text-blue-700 dark:text-blue-300">{content.emailValue}</span>
              </p>
              <p className="flex items-center gap-2 text-lg">
                <span className="text-2xl">📱</span>
                <span className="font-bold">{content.phoneLabel}:</span>
                <span className="text-green-700 dark:text-green-300">{content.phoneValue}</span>
              </p>
              <p className="flex items-center gap-2 text-lg font-bold text-red-600 dark:text-red-400 mt-3 bg-red-100 dark:bg-red-900/30 rounded-full px-4 py-2">
                <span className="text-2xl animate-bounce">⚠️</span>
                {content.limitedNotice}
                <span className="text-2xl">🏃</span>
              </p>
            </div>
          </div>

          {/* Social Share Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-100 via-purple-100 to-cyan-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-cyan-900/30 border-2 border-purple-300 dark:border-purple-600">
            <p className="text-center font-bold text-purple-700 dark:text-purple-300 mb-3 flex items-center justify-center gap-2">
              <span className="text-2xl">🎉</span>
              {t.shareTitle}
              <span className="text-2xl">🎉</span>
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(t.shareText + " " + siteUrl)}`}
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
                href={`https://t.me/share/url?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(t.shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                <span className="font-medium">Telegram</span>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition transform hover:scale-105 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
                <span className="font-medium">Instagram</span>
              </a>

              {/* LinkedIn */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`}
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
        </section>
      </div>

      {/* Floating Registration Bot */}
      <Link
        href={`/register?lang=${language}`}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Speech Bubble */}
          <div className="absolute bottom-full right-0 mb-2 w-52 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 rounded-2xl p-4 shadow-2xl border-2 border-pink-400">
              <p className="text-sm font-bold flex items-center gap-2">
                <span className="text-xl">👋</span> {t.botGreeting}
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-1 flex items-center gap-1">
                <span>🎨</span> {t.botCTA} <span>✨</span>
              </p>
              <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-4 h-4 bg-purple-100 dark:bg-purple-900 border-r-2 border-b-2 border-pink-400"></div>
            </div>
          </div>
          
          {/* Bot Button */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-500 shadow-2xl hover:shadow-xl hover:scale-125 transition-all duration-300 animate-bounce border-4 border-white">
            <span className="text-4xl">🎨</span>
          </div>
          
          {/* Decorative stars around button */}
          <div className="absolute -top-2 -left-2 text-xl animate-bounce" style={{animationDelay: '0.2s'}}>⭐</div>
          <div className="absolute -top-2 -right-2 text-xl animate-bounce" style={{animationDelay: '0.4s'}}>✨</div>
          <div className="absolute -bottom-1 left-0 text-lg animate-bounce" style={{animationDelay: '0.6s'}}>🌟</div>
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-30"></div>
        </div>
      </Link>
    </main>
  );
}
