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

// HomePageAdmin
import homePageAdminEN from "../public/locales/en/HomePageAdmin.json";
import homePageAdminAR from "../public/locales/ar/HomePageAdmin.json";

// ProjectPageAdmin
import projectsPageAdminEN from "../public/locales/en/ProjectPageAdmin.json";
import projectsPageAdminAR from "../public/locales/ar/ProjectPageAdmin.json";

// ProjectPageAdmin
import blogsPageAdminEN from "../public/locales/en/BlogsPageAdmin.json";
import blogsPageAdminAR from "../public/locales/ar/BlogsPageAdmin.json";

// AddOrEditProjects
import addOrEditProjectsEN from "../public/locales/en/AddOrEditProjects.json";
import addOrEditProjectsAR from "../public/locales/ar/AddOrEditProjects.json";

// AddOrEditBlogs
import addOrEditBlogsEN from "../public/locales/en/AddOrEditBlogs.json";
import addOrEditBlogsAR from "../public/locales/ar/AddOrEditBlogs.json";

const resources = {
  ar: {
    header: headerAR,
    navLinks: navLinksAR,
    home: homeAR,
    contact: contactAR,
    homePageAdmin: homePageAdminAR,
    projectPageAdmin: projectsPageAdminAR,
    blogsPageAdmin: blogsPageAdminAR,
    addOrEditProjects: addOrEditProjectsAR,
    addOrEditBlogs: addOrEditBlogsAR,
  },
  en: {
    header: headerEN,
    navLinks: navLinksEN,
    home: homeEN,
    contact: contactEN,
    homePageAdmin: homePageAdminEN,
    projectPageAdmin: projectsPageAdminEN,
    blogsPageAdmin: blogsPageAdminEN,
    addOrEditProjects: addOrEditProjectsEN,
    addOrEditBlogs: addOrEditBlogsEN,
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
