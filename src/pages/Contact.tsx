import { Link } from "react-router-dom";
import ContactContainer from "@components/ContactContainer";
import useAppTranslate from "src/hooks/useAppTranslate";

const Contact = () => {
	const { t, lang } = useAppTranslate({
		path: "navLinks"
	});

	return (
		<main
			className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
			role="main"
			aria-labelledby="main-title"
		>
			<nav
				className={`bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 w-full md:w-fit absolute top-0 rounded-s-md ${
					lang === "ar"
						? "left-0 rounded-tl-md rounded-tr-md md:rounded-tr-none"
						: "right-0 rounded-tr-md rounded-tl-md md:rounded-tl-none"
				}`}
				aria-label="القائمة الرئيسية"
			>
				<ul className="flex items-center justify-center md:gap-5 gap-3">
					<li>
						<Link
							to="/"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
							aria-current="page"
						>
							{t("home")}
						</Link>
					</li>
					<li>
						<Link
							to="/projects"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							{t("projects")}
						</Link>
					</li>
					<li>
						<Link
							to="/blogs"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							{t("blogs")}
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className="text-primary-color font-bold text-[13px] md:text-base"
						>
							{t("contact")}
						</Link>
					</li>
				</ul>
			</nav>
			<ContactContainer />
		</main>
	);
};

export default Contact;
