import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteProject as deleteProjectService } from "@services/projects.services";

// Delete Project
export const actionDeleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string, { rejectWithValue }) => {
    try {
      await deleteProjectService(projectId);
      return projectId;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to delete project");
    }
  }
);