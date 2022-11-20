import { useSelector, useDispatch } from "react-redux";
import {
  deleteOneEmployee,
  fetchAllEmployees,
  selectEmpItems,
  selectSearchItems,
} from "../app/EmployeesSlice";
import { colAdminPage } from "../helpers/static";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const TableAdmin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  /**
   * filtrar empleados que son user o consultores
   * para que el admin o personal de RRHH sólo vea en su gestión a aquellos
   * empleados cuyos datos si puede modificar
   */
  const empleados = useSelector(selectEmpItems).filter(
    (emp) => emp.role !== "admin"
  );

  /**
   * filtrar empleados que son user o consultores y que a su vez el admin
   * o personal de RRHH desea buscar específicamente
   */
  const empleadosSearch = useSelector(selectSearchItems).filter(
    (emp) => emp.role !== "admin"
  );

  /**
   *
   * @param {*} data
   * funcion para borrar un consultor de la DB
   */
  const deleteConsultor = (data) => {
    dispatch(deleteOneEmployee({ id: data }));
  };

  return (
    <>
      <table className="w-full mt-10 rounded-md">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            {colAdminPage.map((col) => (
              <th
                className="p-3 text-sm font-semibold tracking-wide text-left"
                key={col.key}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {empleadosSearch.length > 0
            ? empleadosSearch.map((cons, index) => (
                <TrTable
                  key={index}
                  empleado={cons}
                  index={index}
                  deleteFunc={deleteConsultor}
                />
              ))
            : empleados.map((cons, index) => (
                <TrTable
                  key={index}
                  empleado={cons}
                  index={index}
                  deleteFunc={deleteConsultor}
                />
              ))}
        </tbody>
      </table>
    </>
  );
};

const TrTable = ({ empleado, index, deleteFunc }) => (
  <tr key={index} className="odd:bg-white even:bg-slate-200">
    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      {empleado.name}
    </td>
    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      {empleado.surname}
    </td>
    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      {empleado.phone}
    </td>
    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      {empleado.division}
    </td>
    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      {empleado.email}
    </td>
    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
      <Link
        className="btn bg-green-200 text-green-800 p-1 rounded-md hover:bg-green-800 hover:text-green-200 mr-5"
        to={`/admin/cons/edit/${empleado._id}`}
      >
        Editar
      </Link>
      <button
        onClick={() => deleteFunc(empleado._id)}
        className="btn bg-red-200 text-red-800 p-1 rounded-md hover:bg-red-800 hover:text-red-200"
      >
        Eliminar
      </button>
    </td>
  </tr>
);

export default TableAdmin;
