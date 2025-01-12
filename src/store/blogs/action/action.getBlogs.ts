import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TBlog } from "../../../types/blogs";

type TResponse = TBlog[];

const actionGetBlogs = createAsyncThunk(
  "blogs/actGetBlogs",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `http://localhost:5005/api/blogs`
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

export default actionGetBlogs;