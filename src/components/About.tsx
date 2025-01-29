import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import SpecialHeader from "./SpecialHeader";

const About = () => {
  const { t } = useTranslation('home');

  const title = useMemo(() => t('title'), [t]);
  const aboutTitle = useMemo(() => t('about'), [t]);
  const aboutDescription1 = useMemo(() => t('aboutDescription1'), [t]);
  const aboutDescription2 = useMemo(() => t('aboutDescription2'), [t]);

  return (
    <>
      <SpecialHeader title={title} id="main-title" />
      <section className="about mt-6" aria-labelledby="about-title" role="region">
        <h2
          id="about-title"
          className="text-black dark:text-white sm:text-3xl text-xl font-bold my-2"
        >
          {aboutTitle}
        </h2>
        <p className="sm:text-lg text-sm text-black dark:text-white font-normal leading-loose">
          {aboutDescription1}
        </p>
        <p className="sm:text-lg text-sm text-black dark:text-white font-normal leading-loose mt-4">
          {aboutDescription2}
        </p>
      </section>
    </>
  );
};

export default React.memo(About);