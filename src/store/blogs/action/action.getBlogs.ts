import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBlogs } from "@services/blogs.services";

export const actionGetBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const Blogs = await fetchBlogs();
      return Blogs;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to fetch blogs");
    }
  }
);
