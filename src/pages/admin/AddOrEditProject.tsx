import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject, editProject } from "@store/projects/projects.slice";
import { TProject } from "@customTypes/projects";
import { Link, useParams } from "react-router-dom";
import { SpecialHeader } from "@components/index";
import { RootState } from "@store/store";

const AddOrEditProject = () => {
	const dispatch = useDispatch();
	const { projectId } = useParams<{ projectId: string }>();
  console.log(projectId)
  const projects = useSelector((state: RootState) => state.projects.projects);

  const existingProject = projects.find(
    (project: TProject) => project.id === Number(projectId)
  );

	const [formData, setFormData] = useState<TProject>({
		id: existingProject?.id || Date.now(),
		projectTitle: existingProject?.projectTitle || "",
		projectSubtitle: existingProject?.projectSubtitle || "",
		projectURL: existingProject?.projectURL || "",
		projectGithubURL: existingProject?.projectGithubURL || "",
		projectImage: existingProject?.projectImage || "",
		category: existingProject?.category || "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setFormData((prev) => ({ ...prev, projectImage: files[0].name }));
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (existingProject) {
			dispatch(editProject(formData));
			alert("تم تعديل المشروع بنجاح!");
		} else {
			dispatch(addProject(formData));
			alert("تمت إضافة المشروع بنجاح!");
		}
	};

	return (
		<main
			className="bg-light-container-color dark:bg-dark-container-color border-[2px] border-light-border-color dark:border-dark-border-color p-4 md:p-8 rounded-lg w-full relative"
			role="main"
			aria-labelledby="main-title"
		>
			<nav
				className="bg-light-border-color dark:bg-dark-border-color px-3 md:px-6 py-3 rounded-s-md rounded-tl-md rounded-tr-md md:rounded-tr-none w-full md:w-fit absolute top-0 left-0"
				aria-label="الرئيسية"
			>
				<ul className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
					<li>
						<Link
							to="/admin/home"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
							aria-current="page"
						>
							الرئيسية
						</Link>
					</li>
					<li>
						<Link
							to="/admin/projects"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
						>
							معرض اعمالي
						</Link>
					</li>
					<li>
						<Link
							to="/admin/blogs"
							className="text-black dark:text-white font-bold hover:text-primary-color dark:hover:text-primary-color transition-colors text-sm md:text-base"
						>
							المدونات
						</Link>
					</li>
				</ul>
			</nav>
			<div className="content">
        { existingProject ? (
          <SpecialHeader title="تعديل مشروع" id="content-title" />
        ) : (
          <SpecialHeader title="أضافة مشروع" id="content-title" />
        ) }
				<form onSubmit={handleSubmit} className="form my-8 space-y-7">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-3">
							<label htmlFor="projectTitle" className="text-lg font-medium text-black dark:text-white">
								عنوان المشروع
							</label>
							<input
								type="text"
								id="projectTitle"
								name="projectTitle"
								value={formData.projectTitle}
								placeholder="اكتب عنوان المشروع هنا ..."
								onChange={handleChange}
								className="input"
							/>
						</div>
						<div className="space-y-3">
							<label htmlFor="projectSubtitle" className="text-lg font-medium text-black dark:text-white">
								وصف المشروع
							</label>
							<input
								type="text"
								id="projectSubtitle"
								name="projectSubtitle"
								value={formData.projectSubtitle}
								placeholder="اكتب وصف المشروع هنا ..."
								onChange={handleChange}
								className="input"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-3">
							<label htmlFor="projectURL" className="text-lg font-medium text-black dark:text-white">
								لينك المشروع
							</label>
							<input
								type="text"
								id="projectURL"
								name="projectURL"
								value={formData.projectURL}
								placeholder="اكتب لينك المشروع هنا ..."
								onChange={handleChange}
								className="input"
							/>
						</div>
						<div className="space-y-3">
							<label htmlFor="projectGithubURL" className="text-lg font-medium text-black dark:text-white">
								لينك Github
							</label>
							<input
								type="text"
								id="projectGithubURL"
								name="projectGithubURL"
								value={formData.projectGithubURL}
								placeholder="اكتب لينك Github هنا ..."
								onChange={handleChange}
								className="input"
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="space-y-3">
							<label htmlFor="projectImage" className="text-lg font-medium text-black dark:text-white">
								صورة المشروع
							</label>
							<input
								type="file"
								id="projectImage"
								name="projectImage"
								onChange={handleFileChange}
								className="input"
							/>
						</div>
						<div className="space-y-3">
							<label htmlFor="category" className="text-lg font-medium text-black dark:text-white">
								نوع المشروع
							</label>
							<input
								type="text"
								id="category"
								name="category"
								value={formData.category}
								onChange={handleChange}
								placeholder="اكتب نوع المشروع هنا ..."
								className="input"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="btn-primary w-full shadow-card-shadow shadow-primary-color/40"
					>
						{existingProject ? "حفظ التعديلات" : "أضافة المشروع"}
					</button>
				</form>
				{status === "pending" && <p>جاري الإرسال...</p>}
				{status === "success" && <p>تم الإضافة بنجاح!</p>}
				{status === "error" && <p>حدث خطأ أثناء الإضافة.</p>}
			</div>
		</main>
	);
};

export default AddOrEditProject;
