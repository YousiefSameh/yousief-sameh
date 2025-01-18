import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "@components/Header";
import { motion } from "framer-motion";
import CustomCursor from "@components/CustomeCursor";

const MainLayout = React.memo(() => {
	const [theme, setTheme] = useState("dark");
	const [ lang, setLang ] = useState("");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "dark";
		setTheme(savedTheme);
		document.documentElement.classList.toggle("dark", savedTheme === "dark");
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

  useEffect(() => {
    const Lng = localStorage.getItem("i18nextLng");
    if (Lng) {
      setLang(Lng);
    }
  }, [])

	return (
		<>
			<CustomCursor />
			<motion.main
				className={`${
					theme === "dark"
						? "bg-dark-background-color"
						: "bg-light-background-color"
				} min-h-screen text-white transition-colors ${lang === "ar" ? "font-tajawal" : "font-roboto"}`}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
			>
				<motion.div
					className="container mx-auto flex flex-col lg:items-start items-center lg:flex-row justify-between"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
						className="static lg:sticky top-0 left-0 z-50 py-[30px] lg:w-fit w-[90%]"
					>
						<Header
							theme={theme}
							toggleTheme={toggleTheme}
							setLang={setLang}
							lang={lang}
						/>
					</motion.div>
					<motion.div
						className="wrapper w-[90%] lg:w-[70%] py-[30px]"
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<Outlet />
					</motion.div>
				</motion.div>
			</motion.main>
		</>
	);
});

export default MainLayout;
