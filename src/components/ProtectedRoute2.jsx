import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserAuth } from "../contexts/AuthProvider";

const ProtectedRoute2 = () => {
  const { session } = UserAuth();

  const location = useLocation();

  return session ? (
    <Navigate to={"/"} replace state={{ path: location.pathname }} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute2;
