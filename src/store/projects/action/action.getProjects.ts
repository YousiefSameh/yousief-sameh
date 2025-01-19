import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjects } from "@services/projects.services";

export const actionGetProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const projects = await fetchProjects();
      return projects;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to fetch projects");
    }
  }
);
