import { createAsyncThunk } from "@reduxjs/toolkit";
import { addBlog as addBlogsService } from "@services/blogs.services";
import { TBlog } from "@customTypes/blogs";

// Add Blog
export const actionAddBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blog: TBlog, { rejectWithValue }) => {
    try {
      const response = await addBlogsService(blog);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to add blog");
      }
      return rejectWithValue("Failed to add blog");
    }
  }
);