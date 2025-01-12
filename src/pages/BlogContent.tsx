import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { TBlog } from "../types/blogs";
import store from "../store/store";

const BlogContent = () => {
  const { id } = useParams<{ id: string }>();
  const { blogs } = useSelector(() => store.getState().blogs);
  const blog = blogs.find((blog: TBlog) => blog.id === parseInt(id || "", 10));

  if (!blog) {
    return (
      <div className="text-center py-10 text-red-500">
        المدونة غير موجودة. يرجى العودة إلى الصفحة الرئيسية.
      </div>
    );
  }

  return (
    <main
      className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
      role="region"
      aria-labelledby="blogs-title"
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
              className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
            >
              معرض اعمالي
            </Link>
          </li>
          <li>
            <Link
              to="/blogs"
              className="text-primary-color font-bold text-[13px] md:text-base"
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
      <div className="content mt-12">
        <motion.h2
          className="text-[32px] font-bold text-black dark:text-white mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {blog.title}
        </motion.h2>
        <motion.p
          className="text-[16px] text-black dark:text-white opacity-80"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          {blog.description}
        </motion.p>
        <motion.span
          className="line w-full my-8 block border-t border-light-border-color dark:border-dark-border-color"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className="blog-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <p className="text-[18px] text-black dark:text-white my-4 leading-loose">
            {blog.content}
          </p>
          <motion.img
            src={blog.imageUrl}
            alt={blog.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                "https://dummyimage.com/315x123/cccccc/000000&text=No+Image";
            }}
            className="object-cover w-full rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </main>
  );
};

export default BlogContent;
