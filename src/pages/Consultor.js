import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { withRole } from "../components";
import { colConsultorPage } from "../helpers/static";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllEmployees,
  fetchOneEmployee,
  revertChangesSaved,
  selectOneEmp,
} from "../app/EmployeesSlice";

const User = () => {
  const dispatch = useDispatch();

  const { id } = useAuth();

  /**
   * se obtiene los datos del empleado que ha iniciado sesión
   * se revierten los cambios que ocasiona el editar un empleado
   */
  useEffect(() => {
    dispatch(fetchAllEmployees())
    dispatch(fetchOneEmployee({ id }));
    dispatch(revertChangesSaved());
  }, [dispatch, id]);

  const consultor = useSelector(selectOneEmp);

  return (
    <div className="fondo_gradient_grey overflow-auto">
      <section className="flex flex-col font-poppins container mx-auto page-height">
        <div className="flex justify-around">
          <div className="flex justify-center my-10">
            <h2 className="text-2xl my-auto">{`${consultor.name} ${consultor.surname}`}</h2>
            <span className="text-lg my-auto mx-5">-</span>
            <p className="text-lg my-auto">{consultor.division}</p>
          </div>
          <div className="my-auto">
            <Link to={`/consultor/cons/edit/${consultor._id}`}>
              Editar datos
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[30%]">
            <img
              src={`${consultor.url_photo}`}
              alt="profile"
              className="w-[50%] rounded-full mx-auto"
            />

            <p className="text-center mt-3 text-lg">{consultor.subdivision}</p>
          </div>
          <div className="w-[50%]">
            <div className="flex">
              <h2 className="text-lg font-bold my-auto mr-5">Biografía</h2>
            </div>

            <p className="leading-7 text-justify italic text-[12px]">
              {consultor.biography}
            </p>
          </div>
        </div>

        <hr className="my-10" />

        <div>
          <table className="w-full mt-10 rounded-md mb-10">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                {colConsultorPage.map((col) => (
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
              <tr className="odd:bg-white even:bg-slate-200">
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {consultor.name}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {consultor.surname}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {consultor.phone}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {consultor.division}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {consultor.email}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default withRole(User, "cliente");
