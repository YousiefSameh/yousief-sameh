import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import MainLayout from "@layout/main.layout";
// components
import AdminRoute from "@components/AdminRoute";

// pages
import Home from "@pages/Home";
import Projects from "@pages/Projects";
import Blogs from "@pages/Blogs";
import Contact from "@pages/Contact";
import Error from "@pages/Error";
import BlogContent from "@pages/BlogContent";
import HomePageAdmin from "@pages/admin/HomePage.admin";
import ProjectsPageAdmin from "@pages/admin/ProjectsPage.admin";
import AddProjectAdmin from "@pages/admin/AddOrEditProject";
import BlogsPageAdmin from "@pages/admin/BlogsPage.admin";
import AddOrEditBlog from "@pages/admin/AddOrEditBlog";
import LoginPageAdmin from "@pages/admin/LoginPage.admin";

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
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "admin/login",
        element: <LoginPageAdmin />,
      },
      {
        path: "admin/home",
        element: (
          <AdminRoute>
            <HomePageAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/projects",
        element: (
          <AdminRoute>
            <ProjectsPageAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/projects/add",
        element: (
          <AdminRoute>
            <AddProjectAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/projects/edit/:projectId",
        element: (
          <AdminRoute>
            <AddProjectAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/blogs",
        element: (
          <AdminRoute>
            <BlogsPageAdmin />
          </AdminRoute>
        ),
      },
      {
        path: "admin/blogs/add",
        element: (
          <AdminRoute>
            <AddOrEditBlog />
          </AdminRoute>
        ),
      },
      {
        path: "admin/blogs/edit/:blogId",
        element: (
          <AdminRoute>
            <AddOrEditBlog />
          </AdminRoute>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
