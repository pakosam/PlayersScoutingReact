import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const PublicOnlyRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to="/players" replace /> : <Outlet />;
};
