import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserAuth } from "../contexts/AuthProvider";

const ProtectedRoute = () => {
  const { session } = UserAuth();

  const location = useLocation();

  return session ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} replace state={{ path: location.pathname }} />
  );
};

export default ProtectedRoute;
