import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function PublicRoute() {
  //consumimos el contexto, nos quedamos solo con isAuthenticated
  const { isAuthenticated, admin, id } = useAuth();

  if (isAuthenticated) {
    if (admin) return <Navigate to="/admin" />;
    else return <Navigate to="/consultor" />;
  }

  //con outlet se pintara el componente mas cercano, dentro del mismo grupo
  return (
    <div>
      <Outlet />
    </div>
  );
}