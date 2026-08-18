export const i18nConfig = {
  defaultLocale: "en" as const,
  locales: ["en", "id"] as const,
  localeNames: {
    en: "EN",
    id: "ID",
  } as const,
};

export type Locale = (typeof i18nConfig.locales)[number];
