import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const user = localStorage.getItem("token");

  return <>{user ? <Outlet /> : <Navigate to={"/"} replace />}</>;
};

export default ProtectedLayout;
