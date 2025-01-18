import { useTranslation } from "react-i18next";
import SpecialHeader from "./SpecialHeader";

const About = () => {
	const { t } = useTranslation('home');
	return (
		<>
			<SpecialHeader title={t('title')} id="main-title" />
			<section className="about mt-6" aria-labelledby="about-title">
				<h2
					id="about-title"
					className="text-black dark:text-white sm:text-3xl text-xl font-bold my-2"
				>
					{t('about')}
				</h2>
				<p className="sm:text-lg text-sm text-black dark:text-white font-normal leading-loose">
					{t('aboutDescription1')}
				</p>
				<p className="sm:text-lg text-sm text-black dark:text-white font-normal leading-loose mt-4">
					{t('aboutDescription2')}
				</p>
			</section>
		</>
	);
};

export default About;
