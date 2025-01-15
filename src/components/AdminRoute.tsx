// components/AdminRoute.tsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
