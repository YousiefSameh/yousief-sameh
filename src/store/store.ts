import { configureStore } from "@reduxjs/toolkit";
import projects from "./projects/projects.slice";
import blogs from "./blogs/blogs.slice";

const store = configureStore({
  reducer: {
    projects,
    blogs,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;