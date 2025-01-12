import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import actionGetProjects from "./action/action.getProjects";
import { TLoading } from "../../types/general";
import { TProject } from "../../types/projects";

interface initialStateType {
	projects: TProject[];
	filteredProjects: TProject[];
	activeCategory: string;
	loading: TLoading;
	error: string | null;
}

const initialState: initialStateType = {
	projects: [
		{
			id: 1,
			projectTitle: "موقع فيوري",
			projectSubtitle:
				"فيوري هو موقع لمحل زهور يقدم باقات زهور وترتيبات زهرية جميلة وطازجة لكل المناسبات",
			projectURL: "https://fiore-one.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/Fiore",
			projectImage: "Fiore.png",
			category: "react",
		},
		{
			id: 2,
			projectTitle: "موقع ميدستار",
			projectSubtitle:
				"ميدستار: رعاية صحية رحيمة، علاجات متقدمة، وخبرة طبية موثوقة.",
			projectURL: "https://medstarwebiste.web.app/",
			projectGithubURL: "https://github.com/YousiefSameh/MedstarWebsite",
			projectImage: "Medstar.png",
			category: "react",
		},
		{
			id: 3,
			projectTitle: "موقع التجارة الإلكترونية",
			projectSubtitle:
				"توبيكو هو موقع تجارة إلكترونية يقدم مجموعة واسعة من المنتجات، من الإلكترونيات إلى الأدوات المنزلية.",
			projectURL: "https://ecommerce-wheat-eta.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/Ecommerce",
			projectImage: "ecommerce.png",
			category: "javascript",
		},
		{
			id: 4,
			projectTitle: "موقع الاختبارات",
			projectSubtitle:
				"موقع اختبارات ممتع وتفاعلي يقدم اختبارات متنوعة لاختبار وتحسين معرفتك.",
			projectURL: "https://quiz-app-ecru-six.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/QuizApp",
			projectImage: "quizzApp.png",
			category: "javascript",
		},
		{
			id: 5,
			projectTitle: "نظام CRUD",
			projectSubtitle:
				"موقع نظام CRUD يتيح للمستخدمين إنشاء وقراءة وتحديث وحذف البيانات بكفاءة عبر الإنترنت.",
			projectURL: "https://crudproject-yousief-samehs-projects.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/CRUD_Project",
			projectImage: "CRUD.png",
			category: "javascript",
		},
		{
			id: 6,
			projectTitle: "موقع قائمة المهام",
			projectSubtitle:
				"موقع قائمة المهام يساعد المستخدمين على تنظيم المهام، تحديد الأولويات، ومتابعة التقدم بكفاءة.",
			projectURL: "https://to-do-list-virid-psi.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/ToDoList",
			projectImage: "ToDoList.png",
			category: "javascript",
		},
		{
			id: 7,
			projectTitle: "تطبيق خمن الكلمة",
			projectSubtitle:
				"خمن الكلمة هو موقع ممتع وتفاعلي يقدم ألغاز وتحديات كلمات.",
			projectURL: "https://guess-the-word-neon-two.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/GuessTheWord",
			projectImage: "GuessTheWord.png",
			category: "javascript",
		},
		{
			id: 8,
			projectTitle: "موقع كودزوكا",
			projectSubtitle:
				"كودزوكا هو منصة توصيل تضمن نقل سريع وموثوق وآمن للبضائع والطرود.",
			projectURL: "https://kudzokawebsite.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/KudzokaWebsite",
			projectImage: "Kudzoka.png",
			category: "html & css",
		},
		{
			id: 9,
			projectTitle: "موقع كرياتيفو",
			projectSubtitle:
				"كرياتيفو هو موقع لوكالة إبداعية ديناميكية يقدم حلول تصميم، علامة تجارية، وتسويق مبتكرة.",
			projectURL: "https://criativo-website-rho.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/CriativoWebsite",
			projectImage: "Criativo.png",
			category: "html & css",
		},
		{
			id: 10,
			projectTitle: "موقع تيكنو باي",
			projectSubtitle:
				"تيكنو باي هو متجر إلكتروني يقدم مجموعة واسعة من الإلكترونيات، الأدوات، والإكسسوارات.",
			projectURL: "https://techno-bay.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/TechnoBay",
			projectImage: "TechnoBay.png",
			category: "react",
		},
	],
	filteredProjects: [],
	activeCategory: "all",
	loading: "idle",
	error: null,
};

const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		setActiveCategory: (state, action: PayloadAction<string>) => {
			state.activeCategory = action.payload;
			if (action.payload === "all") {
				state.filteredProjects = state.projects;
			} else {
				state.filteredProjects = state.projects.filter(
					(project) => project.category === action.payload
				);
			}
		},
		addProject: (state, action: PayloadAction<TProject>) => {
			state.projects.push(action.payload);
			if (
				state.activeCategory === "all" ||
				action.payload.category === state.activeCategory
			) {
				state.filteredProjects.push(action.payload);
			}
		},
		editProject: (state, action: PayloadAction<TProject>) => {
			const updatedProject = action.payload;
			const projectIndex = state.projects.findIndex(
				(project) => project.id === updatedProject.id
			);
			if (projectIndex !== -1) {
				state.projects[projectIndex] = updatedProject;

				const filteredIndex = state.filteredProjects.findIndex(
					(project) => project.id === updatedProject.id
				);
				if (filteredIndex !== -1) {
					state.filteredProjects[filteredIndex] = updatedProject;
				}
			}
		},
		deleteProject: (state, action: PayloadAction<number>) => {
      state.projects = state.projects.filter((project) => project.id !== action.payload);
		},
	},
	// extraReducers: (builder) => {
	//   builder.addCase(actionGetProjects.pending, (state) => {
	//     state.loading = "pending";
	//     state.error = null;
	//   });
	//   builder.addCase(actionGetProjects.fulfilled, (state, action) => {
	//     state.loading = "succeeded";
	//     state.projects = action.payload;
	//   });
	//   builder.addCase(actionGetProjects.rejected, (state, action) => {
	//     state.loading = "failed";
	//     if (action.payload && typeof action.payload === "string") {
	//       state.error = action.payload;
	//     }
	//   });
	// },
});

export const { setActiveCategory, addProject, editProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
