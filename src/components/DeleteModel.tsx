import React from "react";
import { motion } from "framer-motion";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectTitle: string; 
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  projectTitle,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-light-container-color dark:bg-dark-container-color border border-light-border-color dark:border-dark-border-color rounded-lg p-6 w-[90%] max-w-md">
        <h3 className="text-lg font-semibold text-center text-black dark:text-white">
          تأكيد الحذف
        </h3>
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          هل أنت متأكد أنك تريد حذف المشروع <span className="font-bold">{projectTitle}</span>؟
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="bg-primary-color hover:bg-hover-color dark:bg-primary-color dark:hover:bg-hover-color text-black dark:text-white px-4 py-2 rounded-md transition-colors"
          >
            إلغاء
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DeleteModal;
