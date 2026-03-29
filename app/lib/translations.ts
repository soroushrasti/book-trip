import { Language } from "./types";

export type Translations = {
  // Session cards
  spotsAvailable: string;
  spotAvailable: string;
  full: string;
  waitingList: string;
  registerNow: string;
  joinWaitingList: string;
  
  // Registration form
  registrationTitle: string;
  waitingListTitle: string;
  sessionLabel: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  required: string;
  submit: string;
  submitting: string;
  backToHome: string;
  
  // Consent
  photoConsent: string;
  
  // Time
  timeLabel: string;
  
  // Share
  shareTitle: string;
  shareText: string;
  
  // Success messages
  registrationSuccess: string;
  waitingListSuccess: string;
  registerAnother: string;
  
  // Bot/CTA
  botGreeting: string;
  botCTA: string;
  clickToRegister: string;
  
  // Workshop info
  dateLabel: string;
  bookLabel: string;
  ageGroupLabel: string;
  exhibition: string;
};

export const translations: Record<Language, Translations> = {
  nl: {
    spotsAvailable: "plaatsen beschikbaar",
    spotAvailable: "plaats beschikbaar",
    full: "Vol",
    waitingList: "Wachtlijst",
    registerNow: "Nu aanmelden",
    joinWaitingList: "Wachtlijst",
    
    registrationTitle: "Aanmelding",
    waitingListTitle: "Wachtlijst Aanmelding",
    sessionLabel: "Workshop sessie",
    firstName: "Voornaam",
    lastName: "Achternaam",
    phoneNumber: "Telefoonnummer",
    email: "E-mail",
    required: "Verplicht",
    submit: "Aanmelden",
    submitting: "Bezig met aanmelden...",
    backToHome: "Terug naar home",
    
    photoConsent: "Ik geef toestemming voor het maken en gebruiken van foto's en video's van mijn kind tijdens de workshops, voor promotiedoeleinden (zoals website en social media) van het project. Ik begrijp dat deze beelden zorgvuldig worden gebruikt en niet worden gedeeld met derden zonder toestemming.",
    
    timeLabel: "Tijd",
    
    shareTitle: "Deel met vrienden!",
    shareText: "Kom ook naar de creatieve kinderworkshops! 🎨✨",
    
    registrationSuccess: "Je bent succesvol aangemeld!",
    waitingListSuccess: "Je staat op de wachtlijst!",
    registerAnother: "Nog iemand aanmelden",
    
    botGreeting: "Hallo! 👋",
    botCTA: "Wil je je aanmelden voor een workshop?",
    clickToRegister: "Klik hier om je aan te melden!",
    
    dateLabel: "Datum",
    bookLabel: "Boek",
    ageGroupLabel: "Leeftijdsgroep",
    exhibition: "Tentoonstelling",
  },
  en: {
    spotsAvailable: "spots available",
    spotAvailable: "spot available",
    full: "Full",
    waitingList: "Waiting list",
    registerNow: "Register now",
    joinWaitingList: "Join waiting list",
    
    registrationTitle: "Registration",
    waitingListTitle: "Waiting List Registration",
    sessionLabel: "Workshop session",
    firstName: "First name",
    lastName: "Last name",
    phoneNumber: "Phone number",
    email: "Email",
    required: "Required",
    submit: "Register",
    submitting: "Registering...",
    backToHome: "Back to home",
    
    photoConsent: "I consent to photos and videos being taken of my child during the workshops for promotional purposes (such as website and social media) of the project. I understand that these images will be used carefully and will not be shared with third parties without permission.",
    
    timeLabel: "Time",
    
    shareTitle: "Share with friends!",
    shareText: "Join the creative children's workshops! 🎨✨",
    
    registrationSuccess: "You are successfully registered!",
    waitingListSuccess: "You are on the waiting list!",
    registerAnother: "Register another person",
    
    botGreeting: "Hello! 👋",
    botCTA: "Would you like to register for a workshop?",
    clickToRegister: "Click here to register!",
    
    dateLabel: "Date",
    bookLabel: "Book",
    ageGroupLabel: "Age group",
    exhibition: "Exhibition",
  },
  fa: {
    spotsAvailable: "جای خالی",
    spotAvailable: "جای خالی",
    full: "تکمیل",
    waitingList: "لیست انتظار",
    registerNow: "ثبت نام",
    joinWaitingList: "لیست انتظار",
    
    registrationTitle: "ثبت نام",
    waitingListTitle: "ثبت نام در لیست انتظار",
    sessionLabel: "جلسه کارگاه",
    firstName: "نام",
    lastName: "نام خانوادگی",
    phoneNumber: "شماره تلفن",
    email: "ایمیل",
    required: "اجباری",
    submit: "ثبت نام",
    submitting: "در حال ثبت نام...",
    backToHome: "بازگشت به صفحه اصلی",
    
    photoConsent: "من اجازه می‌دهم که از کودکم در طول کارگاه‌ها عکس و فیلم گرفته شود و برای اهداف تبلیغاتی پروژه (مانند وب‌سایت و شبکه‌های اجتماعی) استفاده شود. من می‌دانم که این تصاویر با دقت استفاده می‌شوند و بدون اجازه با اشخاص ثالث به اشتراک گذاشته نمی‌شوند.",
    
    timeLabel: "زمان",
    
    shareTitle: "با دوستان به اشتراک بگذارید!",
    shareText: "به کارگاه‌های خلاقیت کودکان بپیوندید! 🎨✨",
    
    registrationSuccess: "ثبت نام شما با موفقیت انجام شد!",
    waitingListSuccess: "شما در لیست انتظار قرار گرفتید!",
    registerAnother: "ثبت نام فرد دیگر",
    
    botGreeting: "سلام! 👋",
    botCTA: "آیا می خواهید در کارگاه ثبت نام کنید؟",
    clickToRegister: "برای ثبت نام اینجا کلیک کنید!",
    
    dateLabel: "تاریخ",
    bookLabel: "کتاب",
    ageGroupLabel: "گروه سنی",
    exhibition: "نمایشگاه",
  },
};

