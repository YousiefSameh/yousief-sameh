import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link } from "react-router";

const BlogsContainer = () => {
	const blogs = useSelector((state: RootState) => state.blogs.blogs);

	return (
		<div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
			{blogs.map((blog) => (
				<Link
					to={`/blogs/blog/${blog.id}`}
					key={blog.id}
					className="blog-card bg-light-border-color dark:bg-dark-card-color rounded-lg shadow-card-shadow relative group"
					aria-label={blog.title}
				>
					<div className="text flex flex-col gap-1 p-4 md:px-6 md:py-4">
						<span className="text-primary-color uppercase font-bold text-lg block">
							{blog.publishedDate}
						</span>
						<h3 className="text-[25px] font-bold text-black dark:text-white">
							{blog.title}
						</h3>
						<p className="text-[16px] text-black dark:text-white opacity-80">
							{blog.description}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BlogsContainer;
