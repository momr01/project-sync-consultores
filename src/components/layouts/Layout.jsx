import { Navbar } from "../index";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <div>{children}</div>
      </div>
    </>
  );
};

export default Layout;
