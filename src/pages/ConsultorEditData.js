import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectEmpItems } from "../app/EmployeesSlice";
import { ConsultorDataForm } from "../components";

const ConsultorEditData = () => {
  const [consultor, setConsultor] = useState([]);
  const consultores = useSelector(selectEmpItems);
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
      const itemIndex = consultores.findIndex((cons) => cons.id === id);
      if (itemIndex !== -1) {
        setConsultor(consultores[itemIndex]);
      }
    };

    getConsultor();
  }, [id, consultores]);
  return (
    <>
      <ConsultorDataForm />
    </>
  );
};

export default ConsultorEditData;
