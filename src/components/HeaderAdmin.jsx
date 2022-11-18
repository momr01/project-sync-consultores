import { useState } from "react";
import { Modales } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  revertSearch,
  selectEmpItems,
  selectSearchItems,
  setSearchItems,
} from "../app/EmployeesSlice";

const HeaderAdmin = () => {
  const { register } = useForm();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const empleados = useSelector(selectEmpItems);

  const onModalAddConsToggle = () => {
    setIsOpen(true);
  };

  const handleChange = (data) => {
    //console.log(data.target.value);
    //console.log(empleados)
    const result = [];

    // const result = empleados.filter(emp => !emp.name.includes(data.target.value))
    // console.log(result)
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

    //console.log(result);
    // const hola = useSelector(selectSearchItems)

  };

  return (
    <>
      <div className="flex justify-between pt-10">
        <div>
          <h1 className="text-3xl font-poppins text-primary font-bold">
            Lista de consultores
          </h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar por nombre o apellido..."
            className="border-2 p-3 mr-2 focus:outline-secondary w-60"
            {...register("search")}
            onChange={handleChange}
          />
          <button
            onClick={onModalAddConsToggle}
            className="btn bg-secondary p-3 rounded-md text-primary hover:text-white hover:bg-primary "
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
