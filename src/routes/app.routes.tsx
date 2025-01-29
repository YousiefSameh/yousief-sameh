import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
const MainLayout = lazy(() => import("@layout/main.layout"));
// components
const AdminRoute = lazy(() => import("@components/AdminRoute"));

// pages
const Home = lazy(() => import("@pages/Home"));
const Projects = lazy(() => import("@pages/Projects"));
const Blogs = lazy(() => import("@pages/Blogs"));
const Contact = lazy(() => import("@pages/Contact"));
const Error = lazy(() => import("@pages/Error"));
const BlogContent = lazy(() => import("@pages/BlogContent"));
const HomePageAdmin = lazy(() => import("@pages/admin/HomePage.admin"));
const ProjectsPageAdmin = lazy(() => import("@pages/admin/ProjectsPage.admin"));
const AddProjectAdmin = lazy(() => import("@pages/admin/AddOrEditProject"));
const BlogsPageAdmin = lazy(() => import("@pages/admin/BlogsPage.admin"));
const AddOrEditBlog = lazy(() => import("@pages/admin/AddOrEditBlog"));
const LoginPageAdmin = lazy(() => import("@pages/admin/LoginPage.admin"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <Error />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: "blogs",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: "blogs/blog/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <BlogContent />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "admin/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LoginPageAdmin />
          </Suspense>
        ),
      },
      {
        path: "admin/home",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <HomePageAdmin />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/projects",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <ProjectsPageAdmin />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/projects/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <AddProjectAdmin />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/projects/edit/:projectId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <AddProjectAdmin />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/blogs",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <BlogsPageAdmin />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/blogs/add",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <AddOrEditBlog />
            </AdminRoute>
          </Suspense>
        ),
      },
      {
        path: "admin/blogs/edit/:blogId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AdminRoute>
              <AddOrEditBlog />
            </AdminRoute>
          </Suspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
