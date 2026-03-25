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
  address: string;
  street: string;
  houseNumber: string;
  postCode: string;
  city: string;
  country: string;
  required: string;
  submit: string;
  submitting: string;
  backToHome: string;
  
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
    address: "Adres",
    street: "Straat",
    houseNumber: "Huisnummer",
    postCode: "Postcode",
    city: "Stad",
    country: "Land",
    required: "Verplicht",
    submit: "Aanmelden",
    submitting: "Bezig met aanmelden...",
    backToHome: "Terug naar home",
    
    registrationSuccess: "Je bent succesvol aangemeld!",
    waitingListSuccess: "Je staat op de wachtlijst!",
    registerAnother: "Nog iemand aanmelden",
    
    botGreeting: "Hallo! 👋",
    botCTA: "Wil je je aanmelden voor een workshop?",
    clickToRegister: "Klik hier om je aan te melden!",
    
    dateLabel: "Datum",
    bookLabel: "Boek",
    ageGroupLabel: "Leeftijdsgroep",
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
    address: "Address",
    street: "Street",
    houseNumber: "House number",
    postCode: "Post code",
    city: "City",
    country: "Country",
    required: "Required",
    submit: "Register",
    submitting: "Registering...",
    backToHome: "Back to home",
    
    registrationSuccess: "You are successfully registered!",
    waitingListSuccess: "You are on the waiting list!",
    registerAnother: "Register another person",
    
    botGreeting: "Hello! 👋",
    botCTA: "Would you like to register for a workshop?",
    clickToRegister: "Click here to register!",
    
    dateLabel: "Date",
    bookLabel: "Book",
    ageGroupLabel: "Age group",
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
    address: "آدرس",
    street: "خیابان",
    houseNumber: "شماره منزل",
    postCode: "کد پستی",
    city: "شهر",
    country: "کشور",
    required: "اجباری",
    submit: "ثبت نام",
    submitting: "در حال ثبت نام...",
    backToHome: "بازگشت به صفحه اصلی",
    
    registrationSuccess: "ثبت نام شما با موفقیت انجام شد!",
    waitingListSuccess: "شما در لیست انتظار قرار گرفتید!",
    registerAnother: "ثبت نام فرد دیگر",
    
    botGreeting: "سلام! 👋",
    botCTA: "آیا می خواهید در کارگاه ثبت نام کنید؟",
    clickToRegister: "برای ثبت نام اینجا کلیک کنید!",
    
    dateLabel: "تاریخ",
    bookLabel: "کتاب",
    ageGroupLabel: "گروه سنی",
  },
};

