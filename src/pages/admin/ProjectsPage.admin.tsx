import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SpecialHeader } from '@components/index';
import { useState } from 'react';
import { TProject } from '@customTypes/projects';
import { deleteProject } from '@store/projects/projects.slice';
import DeleteModal from '@components/DeleteModel';
import { RootState } from '@store/store';

const ProjectsPageAdmin = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<TProject | null>(null);

  const handleDeleteClick = (project: TProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProject) {
      dispatch(deleteProject(selectedProject.id));
      setIsModalOpen(false);
      setSelectedProject(null);
    }
  };

  return (
    <main
      className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
      role="main"
      aria-labelledby="admin-title"
    >
      <nav
        className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
        aria-label="الرئيسية"
      >
        <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <li>
            <Link
              to="/admin/home"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
              aria-current="page"
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              to="/admin/projects"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
            >
              معرض اعمالي
            </Link>
          </li>
          <li>
            <Link
              to="/admin/blogs"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
            >
              المدونات
            </Link>
          </li>
        </ul>
      </nav>

      {/* محتوى الصفحة */}
      <div className="content mx-auto p-4 md:p-6">
        {/* عنوان الصفحة مع زر الإضافة */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6 mt-0 md:mt-2">
          <SpecialHeader title="إدارة المشاريع" id="admin-title" />
          <Link
            to="/admin/projects/add"
            className="bg-primary-color hover:bg-hover-color text-white px-3 py-2 mt-5 md:mt-0 rounded-lg transition-colors text-sm md:text-base"
          >
            + إضافة مشروع
          </Link>
        </div>

        {/* جدول المشاريع */}
        <div className="overflow-x-auto">
          <motion.table
            className="min-w-full bg-transparent shadow-lg border border-primary-color rounded-lg mt-4 md:mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <thead className="bg-primary-color">
              <tr>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">عنوان المشروع</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">الفئة</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">رابط المشروع</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">رابط GitHub</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <motion.tr
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-light-border-color dark:border-dark-border-color hover:bg-hover-color/20 dark:hover:bg-hover-color/20"
                >
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">{project.projectTitle}</td>
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">{project.category}</td>
                  <td className="px-4 py-2">
                    <a
                      href={project.projectURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-300 hover:underline text-sm md:text-base"
                    >
                      عرض
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href={project.projectGithubURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-300 hover:underline text-sm md:text-base"
                    >
                      عرض
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/projects/edit/${project.id}`}
                        className="text-yellow-500 dark:text-yellow-300 hover:text-yellow-700 text-sm md:text-base"
                      >
                        تعديل
                      </Link>
                      <button
                        className="text-red-500 dark:text-red-300 hover:text-red-700 text-sm md:text-base"
                        onClick={() => handleDeleteClick(project)}
                      >
                        حذف
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
        projectTitle={selectedProject?.projectTitle || ""}
      />
    </main>
  );
};

export default ProjectsPageAdmin;
