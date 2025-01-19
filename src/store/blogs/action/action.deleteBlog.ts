import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteBlog as deleteBlogsService } from "@services/blogs.services";

// Delete blog
export const actionDeleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (blogId: string, { rejectWithValue }) => {
    try {
      await deleteBlogsService(blogId);
      return blogId;
    } catch (error) {
      return rejectWithValue((error as Error).message || "Failed to delete blog");
    }
  }
);