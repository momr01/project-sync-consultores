import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneEmployee, selectOneEmp } from "../app/EmployeesSlice";
import routes from "../helpers/routes";

const Navbar = () => {
  const dispatch = useDispatch();

  const { logout, isAuthenticated, id } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  /**
   * obtener desde la DB el empleado que ha iniciado sesión
   */
  useEffect(() => {
    dispatch(fetchOneEmployee({ id }));
  }, [dispatch, id]);

  const consultor = useSelector(selectOneEmp);

  return (
    <nav className="bg-primary">
      <ul className="md:mx-10 mx-5 flex flex-1 justify-between text-white py-4 mb-0">
        <li className="my-auto">
          <Link
            to="/"
            className="text-white hover:text-secondary text-xl font-bold"
          >
            Syncronik
          </Link>
        </li>
        <div className="flex">
          {isAuthenticated && (
            <li className="flex cursor-pointer" onClick={handleOpen}>
              {consultor?._id && (
                <div className="my-auto flex hover:text-secondary">
                  <div className="ss:flex ss:mr-2 mr-1 text-end ss:text-start ss:text-base">
                    <p className="my-auto ss:mr-2">{`${consultor.name} `}</p>
                    <p className="my-auto">{`${consultor.surname}`}</p>
                  </div>
                  <img
                    src={`${consultor.url_photo}`}
                    alt={`${consultor.surname}`}
                    className="w-10 rounded-full mr-2"
                  />
                </div>
              )}

              <DownOutlined className="my-auto hover:text-secondary" />

              {open && (
                <div className="absolute top-16 bg-primary w-[170px] right-[30px] rounded-md pt-3">
                  <ul>
                    <Link
                      to={
                        consultor?.role === "user"
                          ? routes.consultorEditOwn(consultor._id)
                          : routes.adminEditOwn(consultor._id)
                      }
                      className="text-white"
                    >
                      <li className=" py-3 text-center cursor-pointer border-b-2 border-secondary hover:bg-secondary hover:text-primary">
                        Editar perfil
                      </li>
                    </Link>
                    <li
                      onClick={logout}
                      className="rounded-b-md py-3 text-center cursor-pointer border-secondary hover:bg-secondary hover:text-primary"
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
