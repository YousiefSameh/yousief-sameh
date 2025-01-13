import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import MainLayout from "../layout/main.layout";

// pages
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import Error from "../pages/Error";
import BlogContent from "../pages/BlogContent";
import HomePageAdmin from "../pages/admin/HomePage.admin";
import ProjectsPageAdmin from "../pages/admin/ProjectsPage.admin";
import AddProjectAdmin from "../pages/admin/AddOrEditProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "blogs/blog/:id",
        element: <BlogContent />,
        loader: ({ params }) => {
          if (
            typeof params.id !== "string"
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 404,
            });
          }
          return true;
        },
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "admin/home",
        element: <HomePageAdmin />
      },
      {
        path: "admin/projects",
        element: <ProjectsPageAdmin />
      },
      {
        path: "admin/projects/add",
        element: <AddProjectAdmin />
      },
      {
        path: "admin/projects/edit/:projectId",
        element: <AddProjectAdmin />
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;