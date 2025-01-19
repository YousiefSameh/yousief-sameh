import React, { Dispatch, SetStateAction, Suspense } from "react";
import Arabic from "../assets/arabic.svg?react"
import English from "../assets/english.svg?react"
import { useTranslation } from "react-i18next";

// Lazy load icons
const LazyHiMail = React.lazy(() =>
	import("react-icons/hi").then((mod) => ({ default: mod.HiMail }))
);
const LazyLuPhoneCall = React.lazy(() =>
	import("react-icons/lu").then((mod) => ({ default: mod.LuPhoneCall }))
);
const LazyFaFacebook = React.lazy(() =>
	import("react-icons/fa").then((mod) => ({ default: mod.FaFacebook }))
);
const LazyFaGithub = React.lazy(() =>
	import("react-icons/fa").then((mod) => ({ default: mod.FaGithub }))
);
const LazyFaWhatsapp = React.lazy(() =>
	import("react-icons/fa").then((mod) => ({ default: mod.FaWhatsapp }))
);
const LazyFaMoon = React.lazy(() =>
	import("react-icons/fa").then((mod) => ({ default: mod.FaMoon }))
);
const LazyFaSun = React.lazy(() =>
	import("react-icons/fa").then((mod) => ({ default: mod.FaSun }))
);

interface HeaderProps {
	theme: string;
	lang: string;
	setLang: Dispatch<SetStateAction<string>>;
	toggleTheme: () => void;
}

const Header = ({ theme, lang, setLang, toggleTheme }: HeaderProps) => {
  const { t, i18n } = useTranslation('header');

	const changeLanguage = () => {
		const newLang = lang === "ar" ? "en" : "ar";
		setLang(newLang);
    i18n.changeLanguage(newLang);
    if (newLang === "en") {
      document.body.dir = "ltr";
    } else {
      document.body.dir = "rtl";
    }
	};
	return (
		<header className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color py-8 px-5 rounded-lg w-full">
			<div className="profile flex items-center gap-5 justify-center">
				<img
					src="/images/profile.webp"
					className="sm:w-[75px] sm:h-[75px] w-[65px] h-[65px] border-[3px] border-primary-color rounded-full"
					alt="صورة يوسف سامح، مطور واجهات أمامية"
					width="75"
					height="75"
				/>
				<div className="text space-y-2">
					<h1
						className="md:text-[28px] text-xl font-bold text-black dark:text-white"
						aria-label="الاسم يوسف سامح"
					>
						{t("name")}
					</h1>
					<h2
						className="md:text-[18px] text-[16px] font-medium text-gray-700 dark:text-gray-300"
						aria-label="الوظيفة مطور واجهات أمامية"
					>
						{t("job")}
					</h2>
				</div>
			</div>
			<span className="w-full h-[2px] bg-light-border-color dark:bg-dark-border-color block sm:my-6 my-4" />
			<div className="details flex flex-col justify-around md:flex-row lg:flex-col gap-6">
				<div className="email flex items-center gap-1">
					<div
						className={`icon bg-light-card-color dark:bg-dark-card-color sm:p-3 p-2 rounded-lg shadow-lg w-fit ${lang === "en" ? "mr-4" : "ml-4"}`}
						aria-hidden="true"
					>
						<LazyHiMail className="lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] text-primary-color" />
					</div>
					<div className="text">
						<h3 className="lg:text-[16px] text-[14px] font-medium text-gray-700 dark:text-gray-300">
							{t("email")}
						</h3>
						<p className="lg:text-[18px] text-[16px] font-medium text-black dark:text-white">
							<a
								href="mailto:yousief.sameh@outlook.com"
								aria-label="البريد الإلكتروني: yousief.sameh@outlook.com"
							>
								yousief.sameh@outlook.com
							</a>
						</p>
					</div>
				</div>
				<div className="phone flex items-center gap-1">
					<div
						className={`icon bg-light-card-color dark:bg-dark-card-color sm:p-3 p-2 rounded-lg shadow-lg w-fit ${lang === "en" ? "mr-4" : "ml-4"}`}
						aria-hidden="true"
					>
						<LazyLuPhoneCall className="lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] text-primary-color" />
					</div>
					<div className="text">
						<h3 className="lg:text-[16px] text-[14px] font-medium text-gray-700 dark:text-gray-300">
							{t("phoneorwhatsapp")}
						</h3>
						<p className="lg:text-[18px] text-[16px] font-medium text-black dark:text-white">
							<a
								href="tel:+201288565394"
								aria-label="اتصل برقم الهاتف: +20 128-856-5394"
							>
								128-856-5394 (20)+
							</a>
						</p>
					</div>
				</div>
			</div>
			<span className="w-full h-[2px] bg-light-border-color dark:bg-dark-border-color block sm:my-6 my-4" />
			<div className="fast-links flex flex-wrap items-center justify-between gap-1">
				<Suspense fallback={<div>Loading...</div>}>
					<div className="card whatsapp bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit">
						<a
							href="https://wa.me/201288565394"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="افتح رابط الواتساب"
						>
							<LazyFaWhatsapp className="text-black dark:text-white sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
						</a>
					</div>
					<div className="card github bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit">
						<a
							href="https://github.com/YousiefSameh"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="افتح رابط GitHub"
						>
							<LazyFaGithub className="text-black dark:text-white sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
						</a>
					</div>
					<div className="card facebook bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit">
						<a
							href="https://www.facebook.com/profile.php?id=100094333458845"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="افتح رابط Facebook"
						>
							<LazyFaFacebook className="text-black dark:text-white sm:w-[30px] sm:h-[30px] w-[25px] h-[25px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
						</a>
					</div>
          <button
						onClick={toggleTheme}
						className="card theme-toggle bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit"
						aria-label="تغيير السمة"
					>
						{theme === "light" ? (
							<Suspense fallback={<div>...</div>}>
								<LazyFaMoon className="text-black dark:text-gray-200 sm:w-[30px] sm:h-[30px] w-[25px] h-[25px]" />
							</Suspense>
						) : (
							<Suspense fallback={<div>...</div>}>
								<LazyFaSun className="text-yellow-500 sm:w-[30px] sm:h-[30px] w-[25px] h-[25px]" />
							</Suspense>
						)}
					</button>
				</Suspense>
			</div>
      <div className="row mt-4">
        <button
          onClick={changeLanguage}
          className="card theme-toggle bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg flex items-center justify-center gap-4 shadow-card-shadow w-full"
          aria-label="تغيير السمة"
        >
          {lang === "en" ? (
            <Suspense fallback={<div>...</div>}>
              <Arabic
                className="sm:w-[30px] sm:h-[30px] w-[25px] h-[25px]"
							/>
              <h5 className="text-lg font-bold text-black dark:text-white font-tajawal">العربية</h5>
            </Suspense>
          ) : (
						<Suspense fallback={<div>...</div>}>
              <English
                className="sm:w-[30px] sm:h-[30px] w-[25px] h-[25px]"
							/>
              <h5 className="text-lg font-bold text-black dark:text-white font-poppins">English</h5>
            </Suspense>
          )}
        </button>

      </div>
			<span className="w-full h-[2px] bg-light-border-color dark:bg-dark-border-color block sm:my-6 my-4" />
			<footer>
				<div className="footer-content mt-3 text-center">
					<p className="text-sm text-primary-color opacity-80 font-bold hover:opacity-100 transition-opacity cursor-pointer">
						{t('copyrights')}
					</p>
				</div>
			</footer>
		</header>
	);
};

export default Header;
