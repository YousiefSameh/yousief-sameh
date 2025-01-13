import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProject } from "../../store/projects/projects.slice";
import { Link } from "react-router";
import { SpecialHeader } from "../../components";

const AddProjectAdmin = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    projectTitle: "",
    projectSubtitle: "",
    projectURL: "",
    projectGithubURL: "",
    projectImage: "",
    category: "",
  });

  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, projectImage: files[0].name }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("pending");

    const newProject = {
      ...formData,
      id: Date.now(),
    };

    try {
      dispatch(addProject(newProject));
      setStatus("success");
      setFormData({
        projectTitle: "",
        projectSubtitle: "",
        projectURL: "",
        projectGithubURL: "",
        projectImage: "",
        category: "",
      });
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  return (
    <main
      className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
      role="main"
      aria-labelledby="main-title"
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
      <div className="content">
        <SpecialHeader title="إضافة مشروع" id="content-title" />
        <form className="form my-8 space-y-7" onSubmit={handleSubmit}>
          <div className="title grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="first space-y-3">
              <label
                htmlFor="projectTitle"
                className="text-lg font-medium text-black dark:text-white"
              >
                عنوان المشروع
              </label>
              <input
                type="text"
                id="projectTitle"
                name="projectTitle"
                placeholder="اكتب عنوان المشروع هنا ..."
                className="input"
                value={formData.projectTitle}
                onChange={handleChange}
                required
              />
            </div>
            <div className="second space-y-3">
              <label
                htmlFor="projectSubtitle"
                className="text-lg font-medium text-black dark:text-white"
              >
                وصف المشروع
              </label>
              <input
                type="text"
                id="projectSubtitle"
                name="projectSubtitle"
                placeholder="اكتب وصف المشروع هنا ..."
                className="input"
                value={formData.projectSubtitle}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="link grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="first space-y-3">
              <label
                htmlFor="projectURL"
                className="text-lg font-medium text-black dark:text-white"
              >
                لينك المشروع على الانترنت
              </label>
              <input
                type="text"
                id="projectURL"
                name="projectURL"
                placeholder="اكتب لينك المشروع هنا ..."
                className="input"
                value={formData.projectURL}
                onChange={handleChange}
                required
              />
            </div>
            <div className="second space-y-3">
              <label
                htmlFor="projectGithubURL"
                className="text-lg font-medium text-black dark:text-white"
              >
                لينك المشروع على Github
              </label>
              <input
                type="text"
                id="projectGithubURL"
                name="projectGithubURL"
                placeholder="اكتب لينك المشروع على Github هنا ..."
                className="input"
                value={formData.projectGithubURL}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="image-and-category grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="first space-y-3">
              <label
                htmlFor="projectImage"
                className="text-lg font-medium text-black dark:text-white"
              >
                صورة المشروع
              </label>
              <input
                type="file"
                id="projectImage"
                name="projectImage"
                placeholder="ارفع صورة المشروع هنا ..."
                className="input"
                onChange={handleFileChange}
              />
            </div>
            <div className="second space-y-3">
              <label
                htmlFor="category"
                className="text-lg font-medium text-black dark:text-white"
              >
                نوع المشروع
              </label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="اكتب نوع المشروع هنا ..."
                className="input"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
          >
            إضافة المشروع
          </button>
        </form>
        {status === "pending" && <p>جاري الإرسال...</p>}
        {status === "success" && <p>تم الإضافة بنجاح!</p>}
        {status === "error" && <p>حدث خطأ أثناء الإضافة.</p>}
      </div>
    </main>
  );
};

export default AddProjectAdmin;
