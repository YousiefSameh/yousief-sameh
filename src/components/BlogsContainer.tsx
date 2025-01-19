import { RootState } from "@store/store";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { actionGetBlogs } from "@store/blogs/action/action.getBlogs";

const BlogsContainer = () => {
	const blogs = useAppSelector((state: RootState) => state.blogs);
	const dispatch = useAppDispatch();

	const [lang, setLang] = useState("");

	useEffect(() => {
		const Lng = localStorage.getItem("i18nextLng");
		if (Lng) {
			setLang(Lng);
		}
	}, [localStorage.getItem("i18nextLng")]);

	useEffect(() => {
		if (blogs.blogs.length === 0) {
			dispatch(actionGetBlogs());
		}
	}, [blogs.blogs.length, dispatch]);

	if (blogs.loading === "pending") return <div className="mt-6 text-black dark:text-white">Loading...</div>;
	if (blogs.error) return <div>Error: {blogs.error}</div>;

	return (
		<div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
			{blogs.blogs.map((blog) => (
				<Link
					to={`/blogs/blog/${blog._id}`}
					key={blog._id}
					className="blog-card bg-light-border-color dark:bg-dark-card-color rounded-lg shadow-card-shadow relative group"
					aria-label={lang == "ar" ? blog.title.ar : blog.title.en}
				>
					<div className="text flex flex-col gap-1 p-4 md:px-6 md:py-4">
						<span className="text-primary-color uppercase font-bold sm:text-lg text-base block">
							{blog.publishedDate}
						</span>
						<h3 className="md:text-2xl text-lg font-bold text-black dark:text-white">
							{lang == "ar" ? blog.title.ar : blog.title.en}
						</h3>
						<p className="lg:text-base text-sm md:mt-0 mt-1 leading-loose text-black dark:text-white opacity-80">
							{lang == "ar" ? blog.description.ar : blog.description.en}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
};

export default BlogsContainer;
