import { Routes, Route } from "react-router-dom";

//pages
import { Login, Admin, Consultor, NotFound } from "../pages";
import ConsultorEditData from "../pages/ConsultorEditData";
import ManageEditCons from "../pages/ManageEditCons";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const AppRouter = () => (
  <>
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route index element={<Login />}></Route>
      </Route>

      <Route path="/admin" element={<PrivateRoute />}>
        <Route index element={<Admin />}></Route>
        <Route path="/admin/edit/:id" element={<ManageEditCons />}></Route>
      </Route>

      <Route path="/consultor" element={<PrivateRoute />}>
        <Route index element={<Consultor />}></Route>
        <Route
          path="/consultor/edit/:id"
          element={<ConsultorEditData />}
        ></Route>
      </Route>

      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
);

export default AppRouter;
