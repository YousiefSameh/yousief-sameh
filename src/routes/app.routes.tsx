import { createBrowserRouter, RouterProvider } from "react-router-dom";
// layouts
import MainLayout from "../layout/main.layout";

// pages
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Blogs from "../pages/Blogs";
import Contact from "../pages/Contact";
import Error from "../pages/Error";

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
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;