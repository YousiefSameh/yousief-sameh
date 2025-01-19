import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateType, TBlog } from "../../types/blogs";
import { actionGetBlogs } from "./action/action.getBlogs";
import { actionAddBlog } from "./action/action.addBlog";
import { actionEditBlog } from "./action/action.editBlog";
import { actionDeleteBlog } from "./action/action.deleteBlog";

const initialState: initialStateType = {
	blogs: [],
	loading: "idle",
	error: null,
};

const blogsSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		addBlog: (state, action: PayloadAction<TBlog>) => {
			state.blogs.push(action.payload);
		},
		editBlog: (state, action: PayloadAction<TBlog>) => {
			const updatedBlog = action.payload;
			const blogIndex = state.blogs.findIndex(
				(blog) => blog._id === updatedBlog._id
			);
			if (blogIndex !== -1) {
				state.blogs[blogIndex] = updatedBlog;
			}
		},
		deleteBlog: (state, action: PayloadAction<string>) => {
			state.blogs = state.blogs.filter((blog) => blog._id !== action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Blogs
			.addCase(actionGetBlogs.pending, (state) => {
				state.loading = "pending";
				state.error = null;
			})
			.addCase(actionGetBlogs.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.blogs = action.payload;
			})
			.addCase(actionGetBlogs.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload && typeof action.payload === "string") {
					state.error = action.payload;
				} else {
					state.error = "An unexpected error occurred";
				}
			})

			// Add Blog
			.addCase(actionAddBlog.pending, (state) => {
				state.loading = "pending";
				state.error = null;
			})
			.addCase(actionAddBlog.fulfilled, (state, action) => {
				state.loading = "succeeded";
				state.blogs.push(action.payload);
			})
			.addCase(actionAddBlog.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload && typeof action.payload === "string") {
					state.error = action.payload;
				} else {
					state.error = "An unexpected error occurred";
				}
			})

			// Edit Blog
			.addCase(actionEditBlog.pending, (state) => {
				state.loading = "pending";
				state.error = null;
			})
			.addCase(actionEditBlog.fulfilled, (state, action) => {
				state.loading = "succeeded";
				const updatedBlog = action.payload;
				const blogIndex = state.blogs.findIndex(
					(blog) => blog._id === updatedBlog._id
				);
				if (blogIndex !== -1) {
					state.blogs[blogIndex] = updatedBlog;
				}
			})
			.addCase(actionEditBlog.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload && typeof action.payload === "string") {
					state.error = action.payload;
				} else {
					state.error = "An unexpected error occurred";
				}
			})

			// Delete Blog
			.addCase(actionDeleteBlog.pending, (state) => {
				state.loading = "pending";
				state.error = null;
			})
			.addCase(actionDeleteBlog.fulfilled, (state, action) => {
				state.loading = "succeeded";
				const blogId = action.payload;
				state.blogs = state.blogs.filter(
					(project) => project._id !== blogId
				);
			})
			.addCase(actionDeleteBlog.rejected, (state, action) => {
				state.loading = "failed";
				if (action.payload && typeof action.payload === "string") {
					state.error = action.payload;
				} else {
					state.error = "An unexpected error occurred";
				}
			});
	},
});

export const { addBlog, editBlog, deleteBlog } = blogsSlice.actions;
export default blogsSlice.reducer;
