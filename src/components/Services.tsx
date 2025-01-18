import { useTranslation } from "react-i18next";
import { AiOutlineAntDesign } from "react-icons/ai";
import { FaReact } from "react-icons/fa";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoSpeedometerOutline } from "react-icons/io5";

const Services = () => {
	const { t } = useTranslation("home");
	return (
		<section className="services mt-6" aria-labelledby="services-title">
			<h2
				id="services-title"
				className="text-black dark:text-white sm:text-3xl text-2xl font-bold my-2"
			>
				{t("services")}
			</h2>
			<div
				className="cards grid grid-cols-1 md:grid-cols-2 gap-8 my-4"
				role="list"
			>
				<div
					className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
					role="listitem"
				>
					<div className="head flex items-center gap-2">
						<AiOutlineAntDesign
							className="sm:text-5xl text-3xl text-primary-color sm:w-[40px] w-[35px] sm:h-[40px] h-[35px]"
							aria-hidden="true"
						/>
						<h3 className="sm:text-xl text-lg font-bold text-black dark:text-white">
							{t("frontEndDevelopment")}
						</h3>
					</div>
					<p className="body sm:text-lg text-base text-black dark:text-white leading-loose mt-1">
						{t("frontEndDevelopmentDescription")}
					</p>
				</div>
				<div
					className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
					role="listitem"
				>
					<div className="head flex items-center gap-2">
						<FaReact
							className="sm:text-5xl text-3xl text-primary-color sm:w-[40px] w-[35px] sm:h-[40px] h-[35px]"
							aria-hidden="true"
						/>
						<h3 className="sm:text-xl text-lg font-bold text-black dark:text-white">
							{t("reactDevelopment")}
						</h3>
					</div>
					<p className="body lg:text-lg text-sm text-black dark:text-white leading-loose mt-1">
						{t("reactDevelopmentDescription")}
					</p>
				</div>
				<div
					className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
					role="listitem"
				>
					<div className="head flex items-center gap-2">
						<IoSpeedometerOutline
							className="sm:text-5xl text-3xl text-primary-color sm:w-[40px] w-[35px] sm:h-[40px] h-[35px]"
							aria-hidden="true"
						/>
						<h3 className="sm:text-xl text-lg font-bold text-black dark:text-white">
							{t("performanceOptimization")}
						</h3>
					</div>
					<p className="body lg:text-lg text-sm text-black dark:text-white leading-loose mt-1">
						{t("performanceOptimizationDescription")}
					</p>
				</div>
				<div
					className="card p-4 border-[2px] border-light-border-color dark:border-dark-border-color bg-light-card-color dark:bg-dark-card-color shadow-card-shadow rounded-lg"
					role="listitem"
				>
					<div className="head flex items-center gap-2">
						<GiSettingsKnobs
							className="sm:text-5xl text-3xl text-primary-color sm:w-[40px] w-[35px] sm:h-[40px] h-[35px]"
							aria-hidden="true"
						/>
						<h3 className="sm:text-xl text-lg font-bold text-black dark:text-white">
							{t("manageTechProjects")}
						</h3>
					</div>
					<p className="body lg:text-lg text-sm text-black dark:text-white leading-loose mt-1">
						{t("manageTechProjectsDescription")}
					</p>
				</div>
			</div>
		</section>
	);
};

export default Services;
