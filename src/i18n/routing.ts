import { defineRouting } from "next-intl/routing";

// EN is the launch language. RU and UZ are architected in from day one
// (routing, switcher, message files) but wired with placeholder content only.
export const routing = defineRouting({
  locales: ["en", "ru", "uz"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  uz: "O‘zbek",
};
