import { DownOutlined, SettingFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { useState } from "react";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <nav className="bg-primary">
      <ul className="mx-10 flex flex-1 justify-between text-white py-5 mb-0">
        <li className="my-auto">
          <Link to="/" className="text-white hover:text-secondary">
            Syncronik
          </Link>
        </li>
        <div className="flex">
          <li className="flex mr-5">
            <SettingFilled className="my-auto cursor-pointer hover:text-secondary" />
          </li>
          {isAuthenticated && (
            <li className="flex cursor-pointer" onClick={handleOpen}>
              <p className="my-auto mr-1 hover:text-secondary">Usuario</p>
              <DownOutlined className="my-auto hover:text-secondary" />

              {open && (
                <div className="absolute top-10 bg-primary w-[170px] right-[30px] rounded-md pt-3">
                  <ul>
                    <li className="rounded-md py-3 text-center cursor-pointer border-b-2 border-secondary hover:bg-secondary hover:text-primary">
                      Editar perfil
                    </li>
                    <li
                      onClick={logout}
                      className="rounded-md py-3 text-center cursor-pointer border-secondary hover:bg-secondary hover:text-primary"
                    >
                      Cerrar Sesión
                    </li>
                  </ul>
                </div>
              )}
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
