import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
