import { Routes, Route } from "react-router-dom";

//pages
import { Login, Admin, User, NotFound } from "../pages";

const AppRouter = () => (
  <>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/admin" element={<Admin />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
);

export default AppRouter;
