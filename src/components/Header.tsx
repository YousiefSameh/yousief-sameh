import React, { Suspense } from "react";
import { HiMail } from "react-icons/hi";
import { LuPhoneCall } from "react-icons/lu";

// Lazy load icons
const LazyFaFacebook = React.lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaFacebook })));
const LazyFaGithub = React.lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaGithub })));
const LazyFaWhatsapp = React.lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaWhatsapp })));
const LazyFaMoon = React.lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaMoon })));
const LazyFaSun = React.lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaSun })));

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header = ({ theme, toggleTheme }: HeaderProps) => {
  return (
    <header className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color py-8 px-5 rounded-lg w-full">
      <div className="profile flex items-center gap-2 justify-center">
        <img
          src="/assets/profile.webp"
          className="w-[75px] h-[75px] border-[3px] border-primary-color rounded-full ml-[20px]"
          alt="صورة يوسف سامح، مطور واجهات أمامية"
          loading="lazy"
          width="75"
          height="75"
        />
        <div className="text">
          <h1 className="md:text-[28px] text-xl font-bold text-black dark:text-white" aria-label="الاسم يوسف سامح">
            يوسف سامح
          </h1>
          <h2 className="md:text-[18px] text-[16px] font-medium text-gray-700 dark:text-gray-300" aria-label="الوظيفة مطور واجهات أمامية">
            مطور واجهات أمامية
          </h2>
        </div>
      </div>
      <span className="w-full h-[2px] bg-light-border-color dark:bg-dark-border-color block my-7" />
      <div className="details flex flex-col gap-6">
        <div className="email flex items-center justify-center gap-3">
          <div
            className="icon bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-lg w-fit ml-4"
            aria-hidden="true"
          >
            <HiMail className="w-[40px] h-[40px] text-primary-color" />
          </div>
          <div className="text">
            <h3 className="sm:text-[16px] text-[14px] font-medium text-gray-700 dark:text-gray-300">البريد الإلكتروني</h3>
            <p className="sm:text-[18px] text-[16px] font-medium text-black dark:text-white">
              <a href="mailto:yousief.sameh@outlook.com" aria-label="البريد الإلكتروني: yousief.sameh@outlook.com">
                yousief.sameh@outlook.com
              </a>
            </p>
          </div>
        </div>
        <div className="phone flex items-center justify-center gap-3">
          <div
            className="icon bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-lg w-fit ml-4"
            aria-hidden="true"
          >
            <LuPhoneCall className="w-[40px] h-[40px] text-primary-color" />
          </div>
          <div className="text">
            <h3 className="sm:text-[16px] text-[14px] font-medium text-gray-700 dark:text-gray-300">
              رقم التليفون (واتساب ومكالمات)
            </h3>
            <p className="sm:text-[18px] text-[16px] font-medium text-black dark:text-white">
              <a href="tel:+201288565394" aria-label="اتصل برقم الهاتف: +20 128-856-5394">
                128-856-5394 (20)+
              </a>
            </p>
          </div>
        </div>
      </div>
      <span className="w-full h-[2px] bg-light-border-color dark:bg-dark-border-color block my-7" />
      <div className="social-media flex items-center justify-center gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <div
            className="card whatsapp bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit ml-4"
            aria-hidden="true"
          >
            <a href="https://wa.me/201288565394" target="_blank" rel="noopener noreferrer" aria-label="افتح رابط الواتساب">
              <LazyFaWhatsapp className="text-black dark:text-white w-[30px] h-[30px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
            </a>
          </div>
          <div
            className="card github bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit ml-4"
            aria-hidden="true"
          >
            <a href="https://github.com/YousiefSameh" target="_blank" rel="noopener noreferrer" aria-label="افتح رابط GitHub">
              <LazyFaGithub className="text-black dark:text-white w-[30px] h-[30px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
            </a>
          </div>
          <div
            className="card facebook bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit ml-4"
            aria-hidden="true"
          >
            <a href="https://www.facebook.com/profile.php?id=100094333458845" target="_blank" rel="noopener noreferrer" aria-label="افتح رابط Facebook">
              <LazyFaFacebook className="text-black dark:text-white w-[30px] h-[30px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
            </a>
          </div>
        </Suspense>
        <button
          onClick={toggleTheme}
          className="card theme-toggle bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit"
          aria-label="تغيير السمة"
        >
          {theme === "light" ? (
            <Suspense fallback={<div>...</div>}>
              <LazyFaMoon className="text-black dark:text-gray-200 w-[30px] h-[30px]" />
            </Suspense>
          ) : (
            <Suspense fallback={<div>...</div>}>
              <LazyFaSun className="text-yellow-500 w-[30px] h-[30px]" />
            </Suspense>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;