import { FaEye, FaGithub } from "react-icons/fa";
import { actionGetProjects, setActiveCategory } from "@store/projects/projects.slice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";

const ProjectContainer = () => {
	const dispatch = useAppDispatch();
	const projects = useAppSelector(
		(state) => state.projects
	);

	const [lang, setLang] = useState("");

	useEffect(() => {
		const Lng = localStorage.getItem("i18nextLng");
		if (Lng) {
			setLang(Lng);
		}
	}, [localStorage.getItem("i18nextLng")]);

		useEffect(() => {
			if (projects.projects.length === 0) {
				dispatch(actionGetProjects());
			}
			dispatch(setActiveCategory("all"));
		}, [dispatch, projects.projects.length]);
	
		if (projects.loading === 'pending') return <div className="mt-6 text-black dark:text-white">Loading...</div>;
		if (projects.error) return <div className="mt-6 text-red-600">Error: {projects.error}</div>;

	return (
		<>
			<nav className={`categories flex ${lang === "ar" ? "flex-row" : "flex-row-reverse"} items-center justify-center gap-6 mt-6 flex-wrap`}>
				<button
					onClick={() => dispatch(setActiveCategory("react"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						projects.activeCategory === "react"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all font-roboto`}
				>
					<span>React</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("javascript"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						projects.activeCategory === "javascript"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all font-roboto`}
				>
					<span>JavaScript</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("html & css"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						projects.activeCategory === "html & css"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all font-roboto`}
				>
					<span>HTML & CSS</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("all"))}
					className={`category-btn w-full md:w-[130px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						projects.activeCategory === "all"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all`}
				>
					<span>{lang === "ar" ? "الكل" : "All"}</span>
				</button>
			</nav>
			<main className="projects-container grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				{projects.filteredProjects.map((project, index) => (
					<div
						key={index}
						className="project-card bg-light-border-color dark:bg-dark-card-color rounded-lg shadow-card-shadow relative group"
						aria-label={lang === "ar" ? project.projectTitle.ar : project.projectTitle.en}
					>
						<div className="image relative">
							<img
								src={typeof project.projectImage === 'string' ? project.projectImage : ((project.projectImage as unknown) as { url: string }).url}
								alt={lang === "ar" ? project.projectTitle.ar : project.projectTitle.en}
								width="100%"
								height={140}
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
						<div className="text flex flex-col gap-1 p-3 md:px-4 md:py-3">
							<span className="text-primary-color uppercase font-bold sm:text-lg text-base block">
								{lang === "ar" ? project.category.ar : project.category.en}
							</span>
							<h3 className="sm:text-[28px] text-2xl font-bold text-black dark:text-white">
								{lang === "ar" ? project.projectTitle.ar : project.projectTitle.en}
							</h3>
							<p className="sm:text-sm text-[12px] pt-1 text-black dark:text-white opacity-80">
								{lang === "ar" ? project.projectSubtitle.ar : project.projectSubtitle.en}
							</p>
						</div>
					</div>
				))}
			</main>
		</>
	);
};

export default ProjectContainer;
