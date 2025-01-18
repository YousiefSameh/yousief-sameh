import { FaEye, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/store";
import { setActiveCategory } from "@store/projects/projects.slice";
import { useEffect, useState } from "react";

const ProjectContainer = () => {
	const dispatch = useDispatch();
	const { filteredProjects, activeCategory } = useSelector(
		(state: RootState) => state.projects
	);
	useEffect(() => {
		dispatch(setActiveCategory("all"));
	}, [dispatch]);

	const [lang, setLang] = useState("");

	useEffect(() => {
		const Lng = localStorage.getItem("i18nextLng");
		if (Lng) {
			setLang(Lng);
		}
	}, [localStorage.getItem("i18nextLng")]);

	return (
		<>
			<nav className={`categories flex ${lang === "ar" ? "flex-row" : "flex-row-reverse"} items-center justify-center gap-6 mt-6 flex-wrap`}>
				<button
					onClick={() => dispatch(setActiveCategory("react"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "react"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all font-roboto`}
				>
					<span>React</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("javascript"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "javascript"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all font-roboto`}
				>
					<span>JavaScript</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("html & css"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "html & css"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all font-roboto`}
				>
					<span>HTML & CSS</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("all"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "all"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all`}
				>
					<span>{lang === "ar" ? "الكل" : "All"}</span>
				</button>
			</nav>
			<main className="projects-container grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				{filteredProjects.map((project, index) => (
					<div
						key={index}
						className="project-card bg-light-border-color dark:bg-dark-card-color rounded-lg shadow-card-shadow relative group"
						aria-label={project.projectTitle}
					>
						<div className="image relative">
							<img
								src={project.projectImage}
								alt={project.projectTitle}
								width="100%"
								height={130}
								onError={(e) => {
									const target = e.target as HTMLImageElement;
									target.onerror = null;
									target.src =
										"https://dummyimage.com/315x123/cccccc/000000&text=No+Image";
								}}
								className="object-cover rounded-lg"
							/>
							<div className="tools w-full rounded-lg flex justify-center items-center gap-2 p-4 absolute top-1/2 -translate-y-1/2 z-50 bg-black/60 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
								<div
									className="card github bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit h-fit ml-4"
									aria-hidden="true"
								>
									<a
										href={project.projectGithubURL}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="افتح رابط GitHub"
									>
										<FaGithub className="text-black dark:text-white w-[30px] h-[30px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
									</a>
								</div>
								<div
									className="card github bg-light-card-color dark:bg-dark-card-color p-3 rounded-lg shadow-card-shadow w-fit h-fit ml-4"
									aria-hidden="true"
								>
									<a
										href={project.projectURL}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="افتح رابط المشروع"
									>
										<FaEye className="text-black dark:text-white w-[30px] h-[30px] hover:text-primary-color dark:hover:text-primary-color transition-all" />
									</a>
								</div>
							</div>
						</div>
						<div className="text flex flex-col gap-1 p-3 md:px-6 md:py-4">
							<span className="text-primary-color uppercase font-bold sm:text-lg text-base block">
								{project.category}
							</span>
							<h3 className="sm:text-[28px] text-2xl font-bold text-black dark:text-white">
								{project.projectTitle}
							</h3>
							<p className="sm:text-base text-sm text-black dark:text-white opacity-80">
								{project.projectSubtitle}
							</p>
						</div>
					</div>
				))}
			</main>
		</>
	);
};

export default ProjectContainer;
