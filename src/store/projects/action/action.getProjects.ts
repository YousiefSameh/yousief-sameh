import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProject } from "../../../types/projects";

type TResponse = TProject[];

const actionGetProjects = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/api/projects`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else {
        return rejectWithValue("An unexpected error");
      }
    }
  }
);

export default actionGetProjects;