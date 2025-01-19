import React, { useEffect, useState } from "react";
import { actionAddProject, actionEditProject } from "@store/projects/action";
import { TProject } from "@customTypes/projects";
import { Link, useParams } from "react-router-dom";
import { SpecialHeader } from "@components/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useTranslation } from "react-i18next";

const AddOrEditProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("addOrEditProjects");
  const [lang, setLang] = useState("");
  
  useEffect(() => {
    const Lng = localStorage.getItem("i18nextLng");
    if (Lng) {
      setLang(Lng);
    }
  }, [localStorage.getItem("i18nextLng")]);

  const existingProject = projects.find(
    (project: TProject) => project._id === String(projectId)
  );

  const [formData, setFormData] = useState<TProject>({
    _id: existingProject?._id || undefined,
    projectTitle: existingProject?.projectTitle || { ar: "", en: "" },
    projectSubtitle: existingProject?.projectSubtitle || { ar: "", en: "" },
    projectURL: existingProject?.projectURL || "",
    projectGithubURL: existingProject?.projectGithubURL || "",
    projectImage: existingProject?.projectImage || "",
    category: existingProject?.category || { ar: "", en: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "projectTitleAr" || name === "projectTitleEn") {
      setFormData((prev) => ({
        ...prev,
        projectTitle: {
          ...prev.projectTitle,
          [name === "projectTitleAr" ? "ar" : "en"]: value,
        },
      }));
    } else if (name === "projectSubtitleAr" || name === "projectSubtitleEn") {
      setFormData((prev) => ({
        ...prev,
        projectSubtitle: {
          ...prev.projectSubtitle,
          [name === "projectSubtitleAr" ? "ar" : "en"]: value,
        },
      }));
    } else if (name === "categoryAr" || name === "categoryEn") {
      setFormData((prev) => ({
        ...prev,
        category: {
          ...prev.category,
          [name === "categoryAr" ? "ar" : "en"]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, projectImage: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (existingProject) {
      dispatch(actionEditProject(formData));
      alert("تم تعديل المشروع بنجاح!");
    } else {
      dispatch(actionAddProject(formData));
      alert("تمت إضافة المشروع بنجاح!");
    }
  };

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
      <div className="content">
        {existingProject ? (
          <SpecialHeader title={t('projects.editProject')} id="content-title" />
        ) : (
          <SpecialHeader title={t('projects.addProject')} id="content-title" />
        )}
        <form onSubmit={handleSubmit} className="form my-8 space-y-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="projectTitleAr" className="text-lg font-medium text-black dark:text-white">
                {t('projects.projectTitleAr')}
              </label>
              <input
                type="text"
                id="projectTitleAr"
                name="projectTitleAr"
                value={formData.projectTitle.ar}
                placeholder="اكتب عنوان المشروع بالعربية هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="projectTitleEn" className="text-lg font-medium text-black dark:text-white">
                {t('projects.projectTitleEn')}
              </label>
              <input
                type="text"
                id="projectTitleEn"
                name="projectTitleEn"
                value={formData.projectTitle.en}
                placeholder="اكتب عنوان المشروع بالإنجليزية هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="projectSubtitleAr" className="text-lg font-medium text-black dark:text-white">
                {t('projects.projectSubtitleAr')}
              </label>
              <input
                type="text"
                id="projectSubtitleAr"
                name="projectSubtitleAr"
                value={formData.projectSubtitle.ar}
                placeholder="اكتب وصف المشروع بالعربية هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="projectSubtitleEn" className="text-lg font-medium text-black dark:text-white">
                {t('projects.projectSubtitleEn')}
              </label>
              <input
                type="text"
                id="projectSubtitleEn"
                name="projectSubtitleEn"
                value={formData.projectSubtitle.en}
                placeholder="اكتب وصف المشروع بالإنجليزية هنا ..."
                onChange={handleChange}
                className="input"
                />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="projectURL" className="text-lg font-medium text-black dark:text-white">
                {t('projects.projectURL')}
              </label>
              <input
                type="text"
                id="projectURL"
                name="projectURL"
                value={formData.projectURL}
                placeholder="اكتب لينك المشروع هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="projectGithubURL" className="text-lg font-medium text-black dark:text-white">
                {t('projects.githubURL')}
              </label>
              <input
                type="text"
                id="projectGithubURL"
                name="projectGithubURL"
                value={formData.projectGithubURL}
                placeholder="اكتب لينك Github هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="projectImage" className="text-lg font-medium text-black dark:text-white">
                {t('projects.projectImage')}
              </label>
              <input
                type="file"
                id="projectImage"
                name="projectImage"
                onChange={handleFileChange}
                className="input"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="categoryAr" className="text-lg font-medium text-black dark:text-white">
                {t('projects.categoryAr')}
              </label>
              <input
                type="text"
                id="categoryAr"
                name="categoryAr"
                value={formData.category.ar}
                placeholder="اكتب نوع المشروع بالعربية هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label htmlFor="categoryEn" className="text-lg font-medium text-black dark:text-white">
                {t('projects.categoryEn')}
              </label>
              <input
                type="text"
                id="categoryEn"
                name="categoryEn"
                value={formData.category.en}
                placeholder="اكتب نوع المشروع بالإنجليزية هنا ..."
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
          >
            {existingProject ? t('projects.saveChanges') : t('projects.addProjectButton')}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddOrEditProject;