import { Navigate, Outlet } from "react-router";
import useAuth from "../../config/useAuth";

export default function GuestRoute() {
  const { accessToken } = useAuth();
  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
