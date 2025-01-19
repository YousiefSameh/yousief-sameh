import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateBlog as updateBlogsService } from "@services/blogs.services";
import { TBlog } from "@customTypes/blogs";

// Edit Blog
export const actionEditBlog = createAsyncThunk(
  "blogs/editBlogs",
  async (blog: TBlog, { rejectWithValue }) => {
    try {
      const response = await updateBlogsService(blog);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Failed to update blog");
      }
      return rejectWithValue("Failed to update blog");
    }
  }
);