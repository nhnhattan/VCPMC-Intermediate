import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtechRoutes = () => {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  return usercurrentData ? <Outlet /> : <Navigate to="/login" />;
};
