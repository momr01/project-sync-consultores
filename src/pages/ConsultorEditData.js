import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectEmpItems, selectOneEmp, setOneEmployee } from "../app/EmployeesSlice";
import { ConsultorDataForm } from "../components";

const ConsultorEditData = () => {
  const dispatch = useDispatch();
  // const consultores = useSelector(selectEmpItems);
  const history = useLocation();

  const getId = () => {
    const pathname = history.pathname;
    const array = pathname.split("/");
    const id = array[3];
    return id;
  };
  const id = getId();
  console.log(id)

  // useEffect(() => {
  //   const getConsultor = async () => {
  //     const itemIndex = consultores.findIndex((cons) => cons.id === id);
  //     if (itemIndex !== -1) {
  //       setConsultor(consultores[itemIndex]);
  //     }
  //   };

  //   getConsultor();
  // }, [id, consultores]);

  useEffect(() => {
    dispatch(setOneEmployee({ id }));
  }, [dispatch, id]);
  // console.log(id)

  const consultor = useSelector(selectOneEmp);
  console.log(consultor);
  return (
    <>
        <ConsultorDataForm consultor={consultor} />
    </>
  );
};

export default ConsultorEditData;
