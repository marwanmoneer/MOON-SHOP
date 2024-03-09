import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AuthDashbord = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const Admin = auth.admin === true;
  return (
    Admin
    ? <Outlet />
    : auth?.id
    ? <Navigate to="/404" state={{ from: location }} replace />
    : <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default AuthDashbord;