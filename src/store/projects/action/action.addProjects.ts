import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProject } from "@customTypes/projects";
import { addProject as addProjectService } from "@services/projects.services";

// Add Project
export const actionAddProject = createAsyncThunk(
  "projects/addProject",
  async (project: TProject, { rejectWithValue }) => {
    try {
      const response = await addProjectService(project);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to add project");
      }
      return rejectWithValue("Failed to add project");
    }
  }
);