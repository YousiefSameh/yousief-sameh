import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Link } from "react-router-dom";
import { SpecialHeader } from "@components/index";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { actionGetProjects } from "@store/projects/action";
import { actionGetBlogs } from "@store/blogs/action/action.getBlogs";

const HomePageAdmin = () => {
	const { t } = useTranslation("homePageAdmin");
	const [lang, setLang] = useState("");

	useEffect(() => {
		const Lng = localStorage.getItem("i18nextLng");
		if (Lng) {
			setLang(Lng);
		}
	}, [localStorage.getItem("i18nextLng")]);

	const { projects } = useAppSelector(
		(state) => state.projects
	);
	const { blogs } = useAppSelector(
		(state) => state.blogs
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (projects.length === 0) {
			dispatch(actionGetProjects())
		}
		if (blogs.length === 0) {
			dispatch(actionGetBlogs())
		}
	}, [blogs.length, dispatch, projects.length])
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
				<ul className="flex items-center justify-center gap-5">
					<li>
						<Link
							to="/admin/home"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
							aria-current="page"
						>
							{t("home")}
						</Link>
					</li>
					<li>
						<Link
							to="/admin/projects"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							{t("projects")}
						</Link>
					</li>
					<li>
						<Link
							to="/admin/blogs"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							{t("blogs")}
						</Link>
					</li>
				</ul>
			</nav>
			<div className="content">
				<SpecialHeader title={t("adminTitle")} id="admin-title" />
				<div className="cards grid md:grid-cols-2 grid-cols-1 gap-12 mt-8">
					<Link
						to={"/admin/projects"}
						className="card bg-primary-color flex items-center justify-center gap-2 w-full p-5 rounded-xl"
					>
						<h1 className="text-3xl text-white font-bold">
							{t("projectsCount", { count: projects.length })}
						</h1>
					</Link>
					<Link
						to={"/admin/blogs"}
						className="card bg-primary-color flex items-center justify-center gap-2 w-full p-5 rounded-xl"
					>
						<h1 className="text-3xl text-white font-bold">
							{t("blogsCount", { count: blogs.length })}
						</h1>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default HomePageAdmin;
