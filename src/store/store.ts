import { configureStore } from "@reduxjs/toolkit";
import projects from "./projects/projects.slice";
import Blogs from "../pages/Blogs";

const store = configureStore({
  reducer: {
    projects,
    Blogs,
  },
});

export default store;