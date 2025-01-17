import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { TBlog } from "@customTypes/blogs";
import store from "@store/store";

const BlogContent = () => {
	const { id } = useParams<{ id: string }>();
	const { blogs } = useSelector(() => store.getState().blogs);
	const blog = blogs.find((blog: TBlog) => blog.id === parseInt(id || "", 10));

	if (!blog) {
		return (
			<div className="text-center py-10 text-red-500">
				المدونة غير موجودة. يرجى العودة إلى الصفحة الرئيسية.
			</div>
		);
	}

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
			<div className="content mt-12">
				<motion.h2
					className="md:text-4xl text-2xl font-bold text-black dark:text-white sm:mb-2 mb-4"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					{blog.title}
				</motion.h2>
				<motion.p
					className="sm:text-base text-sm leading-relaxed text-black dark:text-white opacity-80"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
				>
					{blog.description}
				</motion.p>
				<motion.span
					className="line w-full sm:my-8 my-4 block border-t border-light-border-color dark:border-dark-border-color"
					initial={{ scaleX: 0 }}
					animate={{ scaleX: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<motion.div
					className="blog-content"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
				>
					<p className="sm:text-lg text-base text-black dark:text-white my-4 leading-loose">
						{blog.content}
					</p>
				</motion.div>
			</div>
		</main>
	);
};

export default BlogContent;
