import { useState } from "react";
import { Modales } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  revertSearch,
  selectEmpItems,
  setSearchItems,
} from "../app/EmployeesSlice";

const HeaderAdmin = () => {
  const dispatch = useDispatch();

  const { register } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const empleados = useSelector(selectEmpItems);

  const onModalAddConsToggle = () => {
    setIsOpen(true);
  };

  /**
   *
   * @param {*} data
   * funcion para filtrar empleados que el usuario desea buscar y mostrarlos
   */
  const handleChange = (data) => {
    const result = [];

    if (data.target.value.length > 0) {
      empleados.forEach((emp) => {
        if (
          emp.name.toLowerCase().includes(data.target.value.toLowerCase()) ||
          emp.surname.toLowerCase().includes(data.target.value.toLowerCase())
        ) {
          result.push(emp);
        }
      });
      dispatch(setSearchItems({ data: result }));
    } else {
      dispatch(revertSearch());
    }
  };

  return (
    <>
      <div className="flex sm:justify-between flex-col sm:flex-row pt-10">
        <div className="my-auto">
          <h1 className="text-3xl font-poppins text-primary font-bold ss:mb-0">
            Lista de consultores
          </h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            className="border-2 p-3 mr-2 focus:outline-secondary w-60 rounded-lg ss:mb-0 mb-3"
            {...register("search")}
            onChange={handleChange}
          />
          <button
            onClick={onModalAddConsToggle}
            className="btn bg-secondary p-3 rounded-md text-primary hover:text-white hover:bg-primary mt-2"
          >
            Añadir consultor
          </button>
        </div>
      </div>
      <Modales isOpen={isOpen} setIsOpen={setIsOpen} add={true} />
    </>
  );
};

export default HeaderAdmin;
