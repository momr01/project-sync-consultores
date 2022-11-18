import { DownOutlined, SettingFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOneEmp, setOneEmployee } from "../app/EmployeesSlice";

const Navbar = () => {
  const { logout, isAuthenticated, id } = useAuth();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(!open);
  };

  console.log(id)

  useEffect(() => {
    if (id) {
      dispatch(setOneEmployee({ id }));
    }
  }, [dispatch, id]);
  // console.log(id)

  const consultor = useSelector(selectOneEmp);
  console.log(consultor);

  // useEffect(()=> {
  //   if(id)
  // })
  return (
    <nav className="bg-primary">
      <ul className="mx-10 flex flex-1 justify-between text-white py-4 mb-0">
        <li className="my-auto">
          <Link
            to="/"
            className="text-white hover:text-secondary text-xl font-bold"
          >
            Syncronik
          </Link>
        </li>
        <div className="flex">
          <li className="flex mr-5">
            <SettingFilled className="my-auto cursor-pointer hover:text-secondary text-lg" />
          </li>
          {isAuthenticated && (
            <li className="flex cursor-pointer" onClick={handleOpen}>
              {consultor?.id && (
                <p className="my-auto mr-1 hover:text-secondary text-base">{`${consultor.name} ${consultor.surname}`}</p>
              )}

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
