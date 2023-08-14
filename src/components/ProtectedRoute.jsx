import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserAuth } from "../contexts/AuthProvider";

const ProtectedRoute = () => {
  const { user } = UserAuth();

  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
