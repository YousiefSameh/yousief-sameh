import { configureStore } from "@reduxjs/toolkit";
import projects from "./projects/projects.slice";
import blogs from "./blogs/blogs.slice";

const store = configureStore({
  reducer: {
    projects,
    blogs,
  },
});

export default store;