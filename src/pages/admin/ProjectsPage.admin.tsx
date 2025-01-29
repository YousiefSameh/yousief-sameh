import { useAppDispatch, useAppSelector } from "@store/hooks";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SpecialHeader } from "@components/index";
import { useEffect, useState } from "react";
import { TProject } from "@customTypes/projects";
import { actionDeleteProject, actionGetProjects } from "@store/projects/projects.slice";
import DeleteModal from "@components/DeleteModel";
import useAppTranslate from "src/hooks/useAppTranslate";

const ProjectsPageAdmin: React.FC = () => {
  const projects = useAppSelector((state) => state.projects);
  const dispatch = useAppDispatch();
  const { t, lang } = useAppTranslate({
		path: "projectPageAdmin"
	});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

  const handleDeleteClick = (project: TProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProject && selectedProject._id) {
      dispatch(actionDeleteProject(selectedProject._id));
    }
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    if (projects.projects.length === 0) {
      dispatch(actionGetProjects());
    }
  }, [dispatch, projects.projects.length]);

  if (projects.loading === 'pending') return <div>Loading...</div>;
  if (projects.error) return <div>Error: {projects.error}</div>;

  return (
    <main
      className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
      role="main"
      aria-labelledby="admin-title"
    >
      <nav
        className={`bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 w-full md:w-fit absolute top-0 rounded-s-md ${
					lang === "ar"
						? "left-0 rounded-tl-md rounded-tr-md md:rounded-tr-none"
						: "right-0 rounded-tr-md rounded-tl-md md:rounded-tl-none"
				}`}
        aria-label={t("general.home")}
      >
        <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <li>
            <Link
              to="/admin/home"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
              aria-current="page"
            >
              {t("general.home")}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/projects"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
            >
              {t("general.projects")}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/blogs"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
            >
              {t("general.blogs")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="content mx-auto p-4 md:p-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6 mt-0 md:mt-2">
          <SpecialHeader title={t('projects.title')} id="admin-title" />
          <Link
            to="/admin/projects/add"
            className="bg-primary-color hover:bg-hover-color text-white px-3 py-2 mt-5 md:mt-0 rounded-lg transition-colors text-sm md:text-base"
          >
            + {t('projects.addProject')}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full bg-transparent shadow-lg border border-primary-color rounded-lg mt-4 md:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead className="bg-primary-color">
              <tr>
                <th className={`px-4 py-2 font-medium text-white ${lang === "ar" ? "text-right" : "text-left"} text-sm md:text-base`}>
                  {t('projects.projectTitle')}
                </th>
                <th className={`px-4 py-2 font-medium text-white ${lang === "ar" ? "text-right" : "text-left"} text-sm md:text-base`}>
                  {t('projects.category')}
                </th>
                <th className={`px-4 py-2 font-medium text-white ${lang === "ar" ? "text-right" : "text-left"} text-sm md:text-base`}>
                  {t('projects.projectURL')}
                </th>
                <th className={`px-4 py-2 font-medium text-white ${lang === "ar" ? "text-right" : "text-left"} text-sm md:text-base`}>
                  {t('projects.githubURL')}
                </th>
                <th className={`px-4 py-2 font-medium text-white ${lang === "ar" ? "text-right" : "text-left"} text-sm md:text-base`}>
                  {t('projects.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.projects.map((project) => (
                <motion.tr
                  key={project._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-light-border-color dark:border-dark-border-color hover:bg-hover-color/20 dark:hover:bg-hover-color/20"
                >
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">
                    {lang === "ar" ? project.projectTitle.ar : project.projectTitle.en}
                  </td>
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">
                    {lang === "ar" ? project.category.ar : project.category.en}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={project.projectURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-300 hover:underline text-sm md:text-base"
                    >
                      {t('projects.view')}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={project.projectGithubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-300 hover:underline text-sm md:text-base"
                    >
                      {t('projects.view')}
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/projects/edit/${project._id}`}
                        className="text-yellow-500 dark:text-yellow-300 hover:text-yellow-700 text-sm md:text-base"
                      >
                        {t('projects.edit')}
                      </Link>
                      <button
                        className="text-red-500 dark:text-red-300 hover:text-red-700 text-sm md:text-base"
                        onClick={() => handleDeleteClick(project)}
                        >
                        {t('projects.delete')}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={
          lang === "ar" ? selectedProject?.projectTitle.ar || "" : selectedProject?.projectTitle.en || ""
        }
      />
    </main>
  );
};

export default ProjectsPageAdmin;