import { ManageConsForm } from "../components";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEmpItems } from "../app/EmployeesSlice";

const ManageEditCons = () => {
  const [consultor, setConsultor] = useState([]);
  const empleados = useSelector(selectEmpItems);
  const history = useLocation();

  const getId = () => {
    const pathname = history.pathname;
    const array = pathname.split("/");
    const id = array[3];
    return id;
  };
  const id = getId();

  useEffect(() => {
    const getConsultor = async () => {
      const itemIndex = empleados.findIndex((cons) => cons.id === id);
      if (itemIndex !== -1) {
        setConsultor(empleados[itemIndex]);
      }
    };

    getConsultor();
  }, [id, empleados]);
  return (
    <>
      <section className="page-height overflow-auto">
        <ManageConsForm add={false} data={consultor} />
      </section>
    </>
  );
};

export default ManageEditCons;
