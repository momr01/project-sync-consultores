import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { Loading, withRole } from "../components";
import { colConsultorPage } from "../helpers/static";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  fetchAllEmployees,
  fetchOneEmployee,
  fetchOneEmployeeToEdit,
  revertChangesSaved,
  revertModalState,
  selectOneEmpToEdit,
} from "../app/EmployeesSlice";

const User = () => {
  const dispatch = useDispatch();

  const { id } = useAuth();

  /**
   * se obtiene los datos del empleado que ha iniciado sesión
   * se revierten los cambios que ocasiona el editar un empleado
   */
  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchOneEmployee({ id }));
    dispatch(fetchOneEmployeeToEdit({ id }));
    dispatch(revertChangesSaved());
    dispatch(revertModalState());
  }, [dispatch, id]);

  const consultor = useSelector(selectOneEmpToEdit);

  return (
    <div className="fondo_gradient_grey overflow-auto">
      <section className="flex flex-col font-poppins container mx-auto page-height">
        <div className="flex justify-around">
          {consultor?.name ? (
            <div className="flex justify-center my-10">
              <h2 className="text-2xl my-auto">{`${consultor.name} ${consultor.surname}`}</h2>
              <span className="text-lg my-auto mx-5">-</span>
              <p className="text-lg my-auto">{consultor.division}</p>
            </div>
          ) : (
            <Loading />
          )}

          <div className="my-auto">
            <Link to={`/consultor/cons/edit/${consultor._id}`}>
              Editar datos
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          {consultor?.name ? (
            <div className="w-[30%]">
              <img
                src={`${consultor.url_photo}`}
                alt="profile"
                className="w-[50%] rounded-full mx-auto"
              />

              <p className="text-center mt-3 text-lg">
                {consultor.subdivision}
              </p>
            </div>
          ) : (
            <Loading />
          )}

          {consultor?.name ? <Biography consultor={consultor} /> : <Loading />}
        </div>

        <hr className="my-10" />

        {consultor?.name ? (
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
        ) : (
          <Loading />
        )}
      </section>
    </div>
  );
};

const Biography = ({ consultor }) => {
  return (
    <div className="w-[50%]">
      <div className="flex">
        <h2 className="text-lg font-bold my-auto mr-5">Biografía</h2>
      </div>

      <div className="leading-7 text-justify italic text-[12px]">
        {consultor?.biography}
      </div>
    </div>
  );
};

export default withRole(User, "cliente");
