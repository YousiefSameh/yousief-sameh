import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SpecialHeader } from "@components/index";
import { useEffect, useState } from "react";
import { TBlog } from "@customTypes/blogs";
import DeleteModal from "@components/DeleteModel";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actionDeleteBlog } from "@store/blogs/action/action.deleteBlog";
import { actionGetBlogs } from "@store/blogs/action/action.getBlogs";
import useAppTranslate from "src/hooks/useAppTranslate";

const BlogsPageAdmin = () => {
  const blogs = useAppSelector((state) => state.blogs);
  const dispatch = useAppDispatch();
  const { t, lang } = useAppTranslate({
		path: "blogsPageAdmin"
	});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<TBlog | null>(null);

  const handleDeleteClick = (blog: TBlog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBlog && selectedBlog._id) {
      dispatch(actionDeleteBlog(selectedBlog._id));
    }
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  useEffect(() => {
    if (blogs.blogs.length === 0) {
      dispatch(actionGetBlogs());
    }
  }, [blogs.blogs.length, dispatch]);

  if (blogs.loading === "pending") return <div>{t("loading")}</div>;
  if (blogs.error) return <div>{t("error", { error: blogs.error })}</div>;

  const truncateDescription = (description: string, maxWords: number) => {
    const words = description.split(" ");
    return words.length > maxWords
      ? `${words.slice(0, maxWords).join(" ")}...`
      : description;
  };

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
        aria-label={t("home")}
      >
        <ul className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          <li>
            <Link
              to="/admin/home"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
              aria-current="page"
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/projects"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
            >
              {t("projects")}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/blogs"
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
            >
              {t("blogs")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="content mx-auto p-4 md:p-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6 mt-0 md:mt-2">
          <SpecialHeader title={t("adminTitle")} id="admin-title" />
          <Link
            to="/admin/blogs/add"
            className="bg-primary-color hover:bg-hover-color text-white px-3 py-2 mt-5 md:mt-0 rounded-lg transition-colors text-sm md:text-base"
          >
            {t("addBlog")}
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
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">
                  {t("blogTitle")}
                </th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">
                  {t("description")}
                </th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">
                  {t("publishDate")}
                </th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {blogs.blogs.map((blog) => (
                <motion.tr
                  key={blog._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-light-border-color dark:border-dark-border-color hover:bg-hover-color/20 dark:hover:bg-hover-color/20"
                >
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">
                    {lang === "ar" ? blog.title.ar : blog.title.en}
                  </td>
                  <td className="px-4 py-2 text-black dark:text-white text-xs md:text-sm">
                    {lang === "ar" ? truncateDescription(blog.description.ar, 15) : truncateDescription(blog.description.en, 15)}
                  </td>
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">
                    {blog.publishedDate}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/blogs/edit/${blog._id}`}
                        className="text-yellow-500 dark:text-yellow-300 hover:text-yellow-700 text-sm md:text-base"
                      >
                        {t("edit")}
                      </Link>
                      <button
                        className="text-red-500 dark:text-red-300 hover:text-red-700 text-sm md:text-base"
                        onClick={() => handleDeleteClick(blog)}
                      >
                        {t("delete")}
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
          lang === "ar" ? selectedBlog?.title.ar || "" : selectedBlog?.title.en || ""
        }
      />
    </main>
  );
};

export default BlogsPageAdmin;