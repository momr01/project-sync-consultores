import { useState } from "react";
import { Modales } from "./index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectEmpItems } from "../app/EmployeesSlice";

const HeaderAdmin = () => {
  const { register } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const empleados = useSelector(selectEmpItems)

  const onModalAddConsToggle = () => {
    setIsOpen(true);
  };

  const handleChange = (data) => {
    console.log(data.target.value);
    console.log(empleados)


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
            placeholder="Buscar..."
            className="border-2 p-3 mr-2 focus:outline-primary"
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
