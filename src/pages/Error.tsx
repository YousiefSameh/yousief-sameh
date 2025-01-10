import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background-color">
      <div className="text-center p-8 rounded-lg shadow-card-shadow shadow-[#2dc6533f] max-w-2xl w-full">
        <motion.h1
          className="text-[200px] font-bold text-primary-color leading-none"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          ٤٠٤
        </motion.h1>
        
        <motion.p
          className="mt-4 text-2xl font-bold text-white"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          عذرًا! الصفحة التي تبحث عنها غير موجودة.
        </motion.p>
        
        <motion.p
          className="mt-2 text-gray-300 font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Link
            to="/"
            className="mt-6 btn-primary"
          >
            العودة إلى الصفحة الرئيسية
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;
