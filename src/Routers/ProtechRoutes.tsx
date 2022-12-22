import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtechRoutes = () => {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const login = localStorage.getItem("login")
  return login === "true" ? <Outlet /> : <Navigate to="/login" />;
};
