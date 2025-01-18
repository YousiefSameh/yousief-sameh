import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Header
import headerEN from "../public/locales/en/header.json";
import headerAR from "../public/locales/ar/header.json";

// Nav Links
import navLinksEN from "../public/locales/en/nav-links.json";
import navLinksAR from "../public/locales/ar/nav-links.json";

// Home
import homeEN from "../public/locales/en/home.json";
import homeAR from "../public/locales/ar/home.json";

// Contact
import contactEN from "../public/locales/en/contact.json";
import contactAR from "../public/locales/ar/contact.json";

const resources = {
  ar: {
    header: headerAR,
    navLinks: navLinksAR,
    home: homeAR,
    contact: contactAR,
  },
  en: {
    header: headerEN,
    navLinks: navLinksEN,
    home: homeEN,
    contact: contactEN,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ar",
    lng: "ar",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
