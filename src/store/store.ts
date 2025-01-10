import { configureStore } from "@reduxjs/toolkit";
import projects from "./projects/projects.slice";

const store = configureStore({
  reducer: {
    projects,
  },
});

export default store;