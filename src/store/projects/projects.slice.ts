import { createSlice } from "@reduxjs/toolkit";
// import actionGetProjects from "./action/action.getProjects";
import { TLoading } from "../../types/general";
import { TProject } from "../../types/projects";

interface initialStateType {
  projects: TProject[];
  loading: TLoading;
  error: string | null;
}

const initialState: initialStateType = {
	projects: [
		{
			id: 1,
			projectTitle: "Fiore Website",
			projectSubtitle:
				"Fiore is a flower shop website offering beautiful, fresh bouquets and floral arrangements for every occasion",
			projectURL: "https://fiore-one.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/Fiore",
			projectImage: "Fiore.png",
			category: "react",
		},
		{
			id: 2,
			projectTitle: "Medstar Website",
			projectSubtitle:
				"Medstar: Compassionate healthcare, advanced treatments, trusted medical expertise.",
			projectURL: "https://medstarwebiste.web.app/",
			projectGithubURL: "https://github.com/YousiefSameh/MedstarWebsite",
			projectImage: "Medstar.png",
			category: "react",
		},
		{
			id: 3,
			projectTitle: "Ecommerce Website",
			projectSubtitle:
				"Topico is an e-commerce website offering a wide range of products, from electronics to home goods.",
			projectURL: "https://ecommerce-wheat-eta.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/Ecommerce",
			projectImage: "ecommerce.png",
			category: "js",
		},
		{
			id: 4,
			projectTitle: "Quiz Website",
			projectSubtitle:
				"A quiz website offering fun, interactive quizzes on various topics to test and improve your knowledge.",
			projectURL: "https://quiz-app-ecru-six.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/QuizApp",
			projectImage: "quizzApp.png",
			category: "js",
		},
		{
			id: 5,
			projectTitle: "CRUD System",
			projectSubtitle:
				"A CRUD system website allows users to create, read, update, and delete data efficiently online.",
			projectURL: "https://crudproject-yousief-samehs-projects.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/CRUD_Project",
			projectImage: "CRUD.png",
			category: "js",
		},
		{
			id: 6,
			projectTitle: "To Do List Website",
			projectSubtitle:
				"A To Do List website helps users organize tasks, set priorities, and track progress efficiently.",
			projectURL: "https://to-do-list-virid-psi.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/ToDoList",
			projectImage: "ToDoList.png",
			category: "js",
		},
		{
			id: 7,
			projectTitle: "GuessTheWord App",
			projectSubtitle:
				"Guess The Word is a fun, interactive website where players solve word puzzles and challenges.",
			projectURL: "https://guess-the-word-neon-two.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/GuessTheWord",
			projectImage: "GuessTheWord.png",
			category: "js",
		},
		{
			id: 8,
			projectTitle: "Kudzoka Website",
			projectSubtitle:
				"Kudzoka is a delivery platform that ensures fast, reliable, and secure transport of goods and packages.",
			projectURL: "https://kudzokawebsite.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/KudzokaWebsite",
			projectImage: "Kudzoka.png",
			category: "css",
		},
		{
			id: 9,
			projectTitle: "Criativo Website",
			projectSubtitle:
				"Criativo is a dynamic creative agency website offering innovative design, branding, and marketing solutions.",
			projectURL: "https://criativo-website-rho.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/CriativoWebsite",
			projectImage: "Criativo.png",
			category: "css",
		},
		{
			id: 9,
			projectTitle: "Techno Bay Website",
			projectSubtitle:
				"Techno Bay is an online store that offers a wide range of electronics, gadgets, and accessories.",
			projectURL: "https://techno-bay.vercel.app/",
			projectGithubURL: "https://github.com/YousiefSameh/TechnoBay",
			projectImage: "TechnoBay.png",
			category: "react",
		},
	],
	loading: "idle",
	error: null,
};


const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {},
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

export default projectsSlice.reducer;
