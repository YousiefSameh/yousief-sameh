import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { TBlog } from "@customTypes/blogs";
import { SpecialHeader } from "@components/index";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actionAddBlog } from "@store/blogs/action/action.addBlog";
import { actionEditBlog } from "@store/blogs/action/action.editBlog";
import { useTranslation } from "react-i18next";

const AddOrEditBlog = () => {
  const dispatch = useAppDispatch();
  const { blogId } = useParams<{ blogId: string }>();
  const blogs = useAppSelector((state) => state.blogs.blogs);
  const { t } = useTranslation("addOrEditBlogs");
  const [lang, setLang] = useState("");
  
  useEffect(() => {
    const Lng = localStorage.getItem("i18nextLng");
    if (Lng) {
      setLang(Lng);
    }
  }, [localStorage.getItem("i18nextLng")]);

  const existingBlog = blogs.find((blog: TBlog) => blog._id === String(blogId));

  const [formData, setFormData] = useState<TBlog>({
    _id: existingBlog?._id,
    title: {
      ar: existingBlog?.title.ar || "",
      en: existingBlog?.title.en || "",
    },
    description: {
      ar: existingBlog?.description.ar || "",
      en: existingBlog?.description.en || "",
    },
    content: {
      ar: existingBlog?.content.ar || "",
      en: existingBlog?.content.en || "",
    },
    publishedDate: existingBlog?.publishedDate || new Date().toDateString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const [field, lang] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [field as keyof TBlog]: {
        ...(prev[field as keyof TBlog] as Record<string, string>),
        [lang]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (existingBlog) {
      dispatch(actionEditBlog(formData));
      alert("تم تعديل المدونة بنجاح!");
    } else {
      dispatch(actionAddBlog(formData));
      alert("تمت إضافة المدونة بنجاح!");
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
        {existingBlog ? (
          <SpecialHeader title={t('blogs.editBlog')} id="content-title" />
        ) : (
          <SpecialHeader title={t('blogs.addBlog')} id="content-title" />
        )}
        <form onSubmit={handleSubmit} className="form my-8 space-y-7">
          <div className="space-y-3">
            <label htmlFor="title.ar" className="text-lg font-medium text-black dark:text-white">
              {t('blogs.titleAr')}
            </label>
            <input
              type="text"
              id="title.ar"
              name="title.ar"
              value={formData.title.ar}
              placeholder="اكتب عنوان المدونة بالعربية هنا ..."
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="title.en" className="text-lg font-medium text-black dark:text-white">
              {t('blogs.titleEn')}
            </label>
            <input
              type="text"
              id="title.en"
              name="title.en"
              value={formData.title.en}
              placeholder="اكتب عنوان المدونة بالإنجليزية هنا ..."
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="description.ar" className="text-lg font-medium text-black dark:text-white">
              {t('blogs.descriptionAr')}
            </label>
            <input
              type="text"
              id="description.ar"
              name="description.ar"
              value={formData.description.ar}
              placeholder="اكتب وصف المدونة بالعربية هنا ..."
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="description.en" className="text-lg font-medium text-black dark:text-white">
              {t('blogs.descriptionEn')}
            </label>
            <input
              type="text"
              id="description.en"
              name="description.en"
              value={formData.description.en}
              placeholder="اكتب وصف المدونة بالإنجليزية هنا ..."
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="content.ar" className="text-lg font-medium text-black dark:text-white">
              {t('blogs.contentAr')}
            </label>
            <textarea
              id="content.ar"
              name="content.ar"
              value={formData.content.ar}
              placeholder="اكتب محتوى المدونة بالعربية هنا ..."
              onChange={handleChange}
              className="input h-[100px]"
            ></textarea>
          </div>

          <div className="space-y-3">
            <label htmlFor="content.en" className="text-lg font-medium text-black dark:text-white">
              {t('blogs.contentEn')}
            </label>
            <textarea
              id="content.en"
              name="content.en"
              value={formData.content.en}
              placeholder="اكتب محتوى المدونة بالإنجليزية هنا ..."
              onChange={handleChange}
              className="input h-[100px]"
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
          >
            {existingBlog ? t('blogs.saveChanges') : t('blogs.addBlogButton')}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddOrEditBlog;