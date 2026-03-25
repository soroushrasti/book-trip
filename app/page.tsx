import WorkshopHome from "./workshop-home";

type Language = "nl" | "en" | "fa";

const languageSet = new Set<Language>(["nl", "en", "fa"]);

type HomeProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = searchParams ? await searchParams : undefined;
  const rawLang = params?.lang;
  const lang = Array.isArray(rawLang) ? rawLang[0] : rawLang;
  const language: Language =
    lang && languageSet.has(lang as Language) ? (lang as Language) : "nl";

  return <WorkshopHome language={language} />;
}
