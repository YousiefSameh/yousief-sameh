import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SpecialHeader } from '@components/index';
import { useState } from 'react';
import { TBlog } from '@customTypes/blogs';
import { deleteBlog } from '@store/blogs/blogs.slice';
import DeleteModal from '@components/DeleteModel';
import { RootState } from '@store/store';

const BlogsPageAdmin = () => {
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<TBlog | null>(null);

  const handleDeleteClick = (blog: TBlog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedBlog) {
      dispatch(deleteBlog(selectedBlog.id));
      setIsModalOpen(false);
      setSelectedBlog(null);
    }
  };

  const truncateDescription = (description: string, maxWords: number) => {
    const words = description.split(' ');
    return words.length > maxWords
      ? `${words.slice(0, maxWords).join(' ')}...`
      : description;
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

      <div className="content mx-auto p-4 md:p-6">
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6 mt-0 md:mt-2">
          <SpecialHeader title="إدارة المدونات" id="admin-title" />
          <Link
            to="/admin/blogs/add"
            className="bg-primary-color hover:bg-hover-color text-white px-3 py-2 mt-5 md:mt-0 rounded-lg transition-colors text-sm md:text-base"
          >
            + إضافة مدونة
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
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">عنوان المدونة</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">الوصف</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">تاريخ النشر</th>
                <th className="px-4 py-2 font-medium text-white text-right text-sm md:text-base">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <motion.tr
                  key={blog.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-light-border-color dark:border-dark-border-color hover:bg-hover-color/20 dark:hover:bg-hover-color/20"
                >
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">{blog.title}</td>
                  <td className="px-4 py-2 text-black dark:text-white text-xs md:text-sm">
                    {truncateDescription(blog.description, 15)}
                  </td>
                  <td className="px-4 py-2 text-black dark:text-white text-sm md:text-base">{blog.publishedDate}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/admin/blogs/edit/${blog.id}`}
                        className="text-yellow-500 dark:text-yellow-300 hover:text-yellow-700 text-sm md:text-base"
                      >
                        تعديل
                      </Link>
                      <button
                        className="text-red-500 dark:text-red-300 hover:text-red-700 text-sm md:text-base"
                        onClick={() => handleDeleteClick(blog)}
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
        projectTitle={selectedBlog?.title || ""}
      />
    </main>
  );
};

export default BlogsPageAdmin;
