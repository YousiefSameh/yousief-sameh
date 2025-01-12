import { Link } from "react-router-dom";
import { SpecialHeader } from "../components";
import ProjectContainer from "../components/ProjectContainer";

const Projects = () => {
  return (
    <main
      className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
      role="region"
      aria-labelledby="projects-title"
    >
      <nav
        className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
        aria-label="القائمة الرئيسية"
      >
        <ul className="flex items-center justify-center gap-5">
          <li>
            <Link
              to="/"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
              aria-current="page"
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              to="/projects"
              className="text-primary-color font-bold text-[13px] md:text-base"
            >
              معرض اعمالي
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              المدونات
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              تواصل معي
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <SpecialHeader title="معرض أعمالي" id="projects-title" />
        <ProjectContainer />
      </div>
      <footer>
        <div className="footer-content mt-6 text-center">
          <p className="md:text-lg text-base text-black dark:text-white opacity-80 font-bold hover:opacity-100 transition-opacity cursor-pointer">
            &copy; <span className="text-primary-color">يوسف سامح</span> 2025 كل
            الحقوق محفوظة
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Projects;
