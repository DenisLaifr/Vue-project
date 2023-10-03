import { createI18n } from "vue-i18n";

// supported languages
import en from "./en";

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
  },
});

// this functon can be used to later on update a locale with new messages
export async function setLocale(locale) {
  if (locale === "en") {
    i18n.global.setLocaleMessage(locale, en);
    i18n.global.locale.value = locale;
  } else {
    throw new Error(`Locale ${locale} is not supported.`);
  }
}

export default i18n;
