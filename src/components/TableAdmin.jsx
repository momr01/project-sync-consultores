import { useSelector } from "react-redux";
import { selectEmpItems } from "../app/EmployeesSlice";
import { colAdminPage } from "../helpers/variables";
import { Link } from "react-router-dom";

const TableAdmin = () => {
  const empleados = useSelector(selectEmpItems);

  const deleteConsultor = (data) => {
    console.log(data);
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
          {empleados.map((cons, index) => (
            <tr key={index} className="odd:bg-white even:bg-slate-200">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {cons.name}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {cons.surname}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {cons.phone}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {cons.division}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {cons.email}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <Link
                  className="btn bg-green-200 text-green-800 p-1 rounded-md hover:bg-green-800 hover:text-green-200 mr-5"
                  to={`/admin/edit/${cons.id}`}
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteConsultor(cons.id)}
                  className="btn bg-red-200 text-red-800 p-1 rounded-md hover:bg-red-800 hover:text-red-200"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableAdmin;
