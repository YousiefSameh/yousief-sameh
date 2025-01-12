import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-background-color dark:bg-dark-background-color px-4">
      <div className="text-center p-6 md:p-8 rounded-lg shadow-card-shadow shadow-primary-color/25 max-w-md md:max-w-2xl w-full bg-light-card-color dark:bg-dark-card-color">
        {/* الرقم 404 */}
        <motion.h1
          className="text-[96px] md:text-[200px] font-bold text-primary-color leading-none"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ٤٠٤
        </motion.h1>

        {/* الرسالة الرئيسية */}
        <motion.p
          className="mt-4 text-lg md:text-2xl font-bold text-black dark:text-white"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          عذرًا! الصفحة التي تبحث عنها غير موجودة.
        </motion.p>

        {/* الرسالة الفرعية */}
        <motion.p
          className="mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
        </motion.p>

        {/* زر العودة */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="mt-6 inline-block px-4 py-2 md:px-6 md:py-3 text-white bg-primary-color rounded-lg font-bold shadow-lg hover:bg-primary-color-light dark:hover:bg-primary-color-dark transition-all text-sm md:text-base"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
