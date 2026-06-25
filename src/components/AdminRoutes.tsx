import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore.";

const AdminRoutes = () => {
  const { authUser } = useAuthStore();

  if (!authUser || authUser.role.toUpperCase() !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoutes;
