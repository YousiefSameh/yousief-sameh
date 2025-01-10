import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { motion } from "framer-motion";
import CustomCursor from "../components/CustomeCursor";

const MainLayout = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <CustomCursor />
      <motion.main
        className={`${
          theme === "dark" ? "bg-dark-background-color" : "bg-light-background-color"
        } min-h-screen text-white transition-colors`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          className="container mx-auto flex flex-col sm:items-start items-center sm:flex-row justify-between"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="static md:sticky top-0 left-0 z-50 py-[50px] md:w-fit w-[90%]"
          >
            <Header theme={theme} toggleTheme={toggleTheme} />
          </motion.div>
          <motion.div
            className="wrapper w-[90%] md:w-[70%] py-[50px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </motion.div>
      </motion.main>
    </>
  );
};

export default MainLayout;
