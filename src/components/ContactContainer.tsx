import React, { useEffect } from "react";
import { useState } from "react";
import { SpecialHeader } from "@components/index";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

const LazyHiMail = React.lazy(() =>
  import("react-icons/hi").then((mod) => ({ default: mod.HiMail }))
);
const LazyLuPhoneCall = React.lazy(() =>
  import("react-icons/lu").then((mod) => ({ default: mod.LuPhoneCall }))
);

const ContactContainer = () => {
	const [status, setStatus] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { t } = useTranslation("contact");
	const [lang, setLang] = useState("");

	useEffect(() => {
		const Lng = localStorage.getItem("i18nextLng");
		if (Lng) {
			setLang(Lng);
		}
	}, [localStorage.getItem("i18nextLng")]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setStatus("pending");
		emailjs
			.sendForm(
				"service_kpveym8",
				"template_m5ymbx4",
				e.target as HTMLFormElement,
				"QDiyb79l5vMxBUarG"
			)
			.then(
				() => {
					setStatus("success");
				},
				(error) => {
					setStatus("error");
					setErrorMessage(error.text);
				}
			);
	};
	return (
		<div className="content">
			<SpecialHeader title={t("title")} id="content-title" />
			<div className="some-info flex sm:flex-row gap-6 sm:gap-0 flex-col items-center justify-around mt-8">
				<div className="email flex items-center gap-1">
					<div
						className={`icon bg-light-card-color dark:bg-dark-card-color sm:p-3 p-2 rounded-lg shadow-lg w-fit ${
							lang === "en" ? "mr-4" : "ml-4"
						}`}
						aria-hidden="true"
					>
						<LazyHiMail className="lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] text-primary-color" />
					</div>
					<div className="text">
						<h3 className="lg:text-[14px] text-[12px] font-medium text-gray-700 dark:text-gray-300">
							{t("email")}
						</h3>
						<p className="lg:text-[16px] text-[14px] font-medium text-black dark:text-white">
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
						className={`icon bg-light-card-color dark:bg-dark-card-color sm:p-3 p-2 rounded-lg shadow-lg w-fit ${
							lang === "en" ? "mr-4" : "ml-4"
						}`}
						aria-hidden="true"
					>
						<LazyLuPhoneCall className="lg:w-[40px] lg:h-[40px] w-[35px] h-[35px] text-primary-color" />
					</div>
					<div className="text">
						<h3 className="lg:text-[14px] text-[12px] font-medium text-gray-700 dark:text-gray-300">
							{t("phone")}
						</h3>
						<p className="lg:text-[16px] text-[14px] font-medium text-black dark:text-white">
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
			<form onSubmit={handleSubmit} className="form my-8 space-y-6">
				<h1 className="sm:text-4xl text-2xl font-bold mt-4 text-black dark:text-white">
					{t("sendMessage")}
				</h1>
				<div className="name space-y-3">
					<label
						htmlFor="fullname"
						className="sm:text-lg text-base font-medium text-black dark:text-white"
					>
						{t('fullName')}
					</label>
					<input
						type="text"
						id="fullname"
						name="fullname"
						placeholder={t('fullNamePlaceholder')}
						className="input"
					/>
				</div>
				<div className="email space-y-3">
					<label
						htmlFor="email"
						className="sm:text-lg text-base font-medium text-black dark:text-white"
					>
						{t('email')}
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder={t('emailPlaceholder')}
						className="input"
					/>
				</div>
				<div className="message space-y-3">
					<label
						htmlFor="message"
						className="sm:text-lg text-base font-medium text-black dark:text-white"
					>
						{t('message')}
					</label>
					<textarea
						id="message"
						name="message"
						placeholder={t('messagePlaceholder')}
						className="h-[200px] w-full rounded-lg shadow-card-shadow shadow-primary-color/25 bg-transparent px-6 py-3 focus:shadow-primary-color/70 outline-none placeholder:text-black/80 dark:placeholder:text-white/80 font-semibold text-black dark:text-white"
					/>
				</div>
				<button
					type="submit"
					className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
				>
					{t('sendButton')}
				</button>
			</form>

			{/* Show status message */}
			<div
				className={`status-message text-center mt-4 font-bold py-2 ${
					status === "pending"
						? "text-yellow-500"
						: status === "success"
						? "text-green-500"
						: "text-red-500"
				}`}
			>
				{status === "pending" && "جاري الإرسال..."}
				{status === "success" && "تم إرسال الرسالة بنجاح!"}
				{status === "error" && `حدث خطأ: ${errorMessage}`}
			</div>
		</div>
	);
};

export default ContactContainer;
