import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProject } from "@customTypes/projects";
import { updateProject as updateProjectService } from "@services/projects.services";

// Edit Project
export const actionEditProject = createAsyncThunk(
  "projects/editProject",
  async (project: TProject, { rejectWithValue }) => {
    try {
      const response = await updateProjectService(project);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to update project");
      }
      return rejectWithValue("Failed to update project");
    }
  }
);