import { Link } from "react-router";
import { SpecialHeader } from "../components";
import BlogsContainer from "../components/BlogsContainer";

const Blogs = () => {
	return (
		<main
			className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
			role="region"
			aria-labelledby="blogs-title"
		>
			<nav
				className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
				aria-label="القائمة الرئيسية"
			>
				<ul className="flex items-center justify-center md:gap-5 gap-3">
					<li>
						<Link
							to="/"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
							aria-current="page"
						>
							الرئيسية
						</Link>
					</li>
					<li>
						<Link
							to="/projects"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							معرض اعمالي
						</Link>
					</li>
					<li>
						<Link
							to="/blogs"
							className="text-primary-color font-bold text-[13px] md:text-base"
						>
							المدونات
						</Link>
					</li>
					<li>
						<Link
							to="/contact"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							تواصل معي
						</Link>
					</li>
				</ul>
			</nav>
			<div className="content">
				<SpecialHeader title="المدونات" id="projects-title" />
				<BlogsContainer />
			</div>
		</main>
	);
};

export default Blogs;
