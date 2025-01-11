import { FaEye, FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { setActiveCategory } from "../store/projects/projects.slice";
import { useEffect } from "react";

const ProjectContainer = () => {
	const dispatch = useDispatch();
	const { filteredProjects, activeCategory } = useSelector(() => store.getState().projects);	
	useEffect(() => {
		dispatch(setActiveCategory("all"));
	}, [dispatch]);
	return (
		<>
			<nav className="categories flex items-center justify-center gap-6 mt-6 flex-wrap">
				<button
					onClick={() => dispatch(setActiveCategory("react"))}
					className={`category-btn w-full md:w-[120px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "react"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all`}
				>
					<span>React</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("javascript"))}
					className={`category-btn w-full md:w-[120px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "javascript"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all`}
				>
					<span>JavaScript</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("html & css"))}
					className={`category-btn w-full md:w-[120px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "html & css"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all`}
				>
					<span>HTML & CSS</span>
				</button>
				<button
					onClick={() => dispatch(setActiveCategory("all"))}
					className={`category-btn w-full md:w-[120px] text-black dark:text-white font-bold text-[13px] md:text-base shadow-card-shadow shadow-primary-color/40 py-2 px-4 rounded-lg ${
						activeCategory === "all"
							? "bg-primary-color text-black"
							: "bg-light-border-color dark:bg-dark-border-color"
					} hover:bg-primary-color dark:hover:bg-primary-color hover:text-black dark:hover:text-white transition-all`}
				>
					<span>الكل</span>
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
							<div className="tools w-full flex justify-center items-center gap-2 p-4 absolute top-1/2 -translate-y-1/2 z-50 bg-black/60 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
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
						<div className="text flex flex-col gap-1 p-4 md:px-6 md:py-4">
							<span className="text-primary-color uppercase font-bold text-lg block">
								{project.category}
							</span>
							<h3 className="text-[28px] font-bold text-black dark:text-white">
								{project.projectTitle}
							</h3>
							<p className="text-[16px] text-black dark:text-white opacity-80">
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
