import { useState } from "react";
import {Modales} from "./index";

const HeaderAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onModalAddConsToggle = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex justify-between mt-10">
        <div>
          <h1 className="text-2xl font-poppins">Lista de consultores</h1>
        </div>

        <div>
          <input
            type="text"
            placeholder="Buscar..."
            className="border-2 p-3 mr-2 focus:outline-primary"
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
