import { Routes, Route } from "react-router-dom";

//pages
import { Login, Admin, User } from "../pages";

const AppRouter = () => (
  <>
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="*" element={<h1>404</h1>}></Route>
    </Routes>
  </>
);

export default AppRouter;
