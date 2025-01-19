import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/general";
import { TProject } from "@customTypes/projects";
import {
	actionGetProjects,
  actionAddProject,
  actionEditProject,
  actionDeleteProject,
} from "./action/index";

interface initialStateType {
  projects: TProject[];
  filteredProjects: TProject[];
  activeCategory: string;
  loading: TLoading;
  error: string | null;
}

const initialState: initialStateType = {
  projects: [],
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
          (project) =>
            project.category.ar === action.payload || project.category.en === action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(actionGetProjects.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actionGetProjects.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.projects = action.payload;
        state.filteredProjects = action.payload;
      })
      .addCase(actionGetProjects.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An unexpected error occurred";
        }
      })

      // Add Project
      .addCase(actionAddProject.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actionAddProject.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.projects.push(action.payload);
        if (
          state.activeCategory === "all" ||
          action.payload.category.ar === state.activeCategory ||
          action.payload.category.en === state.activeCategory
        ) {
          state.filteredProjects.push(action.payload);
        }
      })
      .addCase(actionAddProject.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An unexpected error occurred";
        }
      })

      // Edit Project
      .addCase(actionEditProject.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actionEditProject.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const updatedProject = action.payload;
        const projectIndex = state.projects.findIndex(
          (project) => project._id === updatedProject._id
        );
        if (projectIndex !== -1) {
          state.projects[projectIndex] = updatedProject;
          const filteredIndex = state.filteredProjects.findIndex(
            (project) => project._id === updatedProject._id
          );
          if (filteredIndex !== -1) {
            state.filteredProjects[filteredIndex] = updatedProject;
          }
        }
      })
      .addCase(actionEditProject.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An unexpected error occurred";
        }
      })

      // Delete Project
      .addCase(actionDeleteProject.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actionDeleteProject.fulfilled, (state, action) => {
        state.loading = "succeeded";
        const projectId = action.payload;
        state.projects = state.projects.filter((project) => project._id !== projectId);
        state.filteredProjects = state.filteredProjects.filter(
          (project) => project._id !== projectId
        );
      })
      .addCase(actionDeleteProject.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload && typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.error = "An unexpected error occurred";
        }
      });
  },
});

export const { setActiveCategory } = projectsSlice.actions;
export { actionGetProjects, actionAddProject, actionEditProject, actionDeleteProject }
export default projectsSlice.reducer;