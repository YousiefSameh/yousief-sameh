import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { RootState } from "@store/store";
import { TBlog } from "@customTypes/blogs";
import { addBlog, editBlog } from "@store/blogs/blogs.slice";
import { SpecialHeader } from "@components/index";

const AddOrEditBlog = () => {
  const dispatch = useDispatch();
  const { blogId } = useParams<{ blogId: string }>();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);

  const existingBlog = blogs.find((blog: TBlog) => blog.id === Number(blogId));

  const [formData, setFormData] = useState<TBlog>({
    id: existingBlog?.id || Date.now(),
    title: existingBlog?.title || "",
    description: existingBlog?.description || "",
    content: existingBlog?.content || "",
    publishedDate: existingBlog?.publishedDate || new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (existingBlog) {
      dispatch(editBlog(formData));
      alert("تم تعديل المدونة بنجاح!");
    } else {
      dispatch(addBlog(formData));
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
        {existingBlog ? (
          <SpecialHeader title="تعديل مدونة" id="content-title" />
        ) : (
          <SpecialHeader title="إضافة مدونة" id="content-title" />
        )}
        <form onSubmit={handleSubmit} className="form my-8 space-y-7">
          <div className="space-y-3">
            <label htmlFor="title" className="text-lg font-medium text-black dark:text-white">
              عنوان المدونة
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              placeholder="اكتب عنوان المدونة هنا ..."
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="description" className="text-lg font-medium text-black dark:text-white">
              وصف المدونة
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              placeholder="اكتب وصف المدونة هنا ..."
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="space-y-3">
            <label htmlFor="content" className="text-lg font-medium text-black dark:text-white">
              محتوى المدونة
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              placeholder="اكتب محتوى المدونة هنا ..."
              onChange={handleChange}
              className="input h-[100px]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
          >
            {existingBlog ? "حفظ التعديلات" : "إضافة المدونة"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AddOrEditBlog;
