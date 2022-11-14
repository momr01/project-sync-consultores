import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/authProvider";

export default function PrivateRoute() {
  //consumimos el contexto, nos quedamos solo con isAuthenticated
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  //con outlet se pintara el componente mas cercano, dentro del mismo grupo
  return (
    <div>
      <Outlet />
    </div>
  );
}
