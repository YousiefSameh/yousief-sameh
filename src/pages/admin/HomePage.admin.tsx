import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../store/store";
import { SpecialHeader } from "../../components";

const HomePageAdmin = () => {
  const projects = useSelector((state: RootState) => state.projects.projects);
	const blogs = useSelector((state: RootState) => state.blogs.blogs);
	return (
		<main
			className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
			role="main"
			aria-labelledby="admin-title"
		>
			<nav
				className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
				aria-label="الرئيسية"
			>
				<ul className="flex items-center justify-center gap-5">
					<li>
						<Link
							to="/admin/home"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
							aria-current="page"
						>
							الرئيسية
						</Link>
					</li>
					<li>
						<Link
							to="/admin/projects"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							معرض اعمالي
						</Link>
					</li>
					<li>
						<Link
							to="/admin/blogs"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-[13px] md:text-base"
						>
							المدونات
						</Link>
					</li>
				</ul>
			</nav>
      <div className="content">
        <SpecialHeader title="صفحة الرئيسيه للادمن" id="admin-title"/>
        <div className="cards grid md:grid-cols-2 grid-cols-1 gap-12 mt-8">
          <Link to={"/admin/projects"} className="card bg-primary-color flex items-center justify-center gap-2 w-full p-5 rounded-xl">
            <h1 className="text-4xl text-white font-bold">عدد المشاريع: {projects.length}</h1>
          </Link>
          <Link to={"/admin/blogs"} className="card bg-primary-color flex items-center justify-center gap-2 w-full p-5 rounded-xl">
            <h1 className="text-4xl text-white font-bold">عدد الندوات: {blogs.length}</h1>
          </Link>
        </div>
      </div>
      <footer>
				<div className="footer-content mt-6 text-center">
					<p className="md:text-lg text-base text-black dark:text-white opacity-80 font-bold hover:opacity-100 transition-opacity cursor-pointer">
						&copy; <span className="text-primary-color">يوسف سامح</span> 2025 كل
						الحقوق محفوظة
					</p>
				</div>
			</footer>
		</main>
	);
};

export default HomePageAdmin;
