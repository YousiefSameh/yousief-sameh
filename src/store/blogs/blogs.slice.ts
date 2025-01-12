import { createSlice } from "@reduxjs/toolkit";
import { TBlog } from "../../types/blogs";
import { TLoading } from "../../types/general";

interface initialStateType {
  blogs: TBlog[];
  loading: TLoading;
  error: null | string;
}

const initialState: initialStateType = {
  blogs: [],
  loading: "idle",
  error: null,
};

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
	// extraReducers: (builder) => {
	//   builder.addCase(actionGetBlogs.pending, (state) => {
	//     state.loading = "pending";
	//     state.error = null;
	//   });
	//   builder.addCase(actionGetBlogs.fulfilled, (state, action) => {
	//     state.loading = "succeeded";
	//     state.blogs = action.payload;
	//   });
	//   builder.addCase(actionGetBlogs.rejected, (state, action) => {
	//     state.loading = "failed";
	//     if (action.payload && typeof action.payload === "string") {
	//       state.error = action.payload;
	//     }
	//   });
	// },
});

export default blogsSlice.reducer;