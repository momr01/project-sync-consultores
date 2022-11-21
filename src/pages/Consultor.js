import { Link } from "react-router-dom";
import { useAuth } from "../auth/authProvider";
import { ConsultorBio, ConsultorTable, Loading, withRole } from "../components";
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
    <div className="overflow-auto mx-5 ss:mx-0">
      <section className="flex flex-col font-poppins container mx-auto page-height">
        <div className="ss:flex ss:justify-around">
          {consultor?.name ? (
            <div className="flex ss:justify-center ss:my-10 my-3">
              <h2 className="ss:text-2xl text-xl my-auto">{`${consultor.name} ${consultor.surname}`}</h2>
              <span className="text-lg my-auto mx-5">-</span>
              <p className="text-lg my-auto">{consultor.division}</p>
            </div>
          ) : (
            <Loading />
          )}

          <div className="ss:my-auto mb-5">
            <Link to={`/consultor/cons/edit/${consultor._id}`}>
              Editar datos
            </Link>
          </div>
        </div>

        <div className="ss:flex ss:justify-center">
          {consultor?.name ? (
            <div className="ss:w-[30%] mx-auto ss:mx-0">
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

          {consultor?.name ? (
            <ConsultorBio consultor={consultor} />
          ) : (
            <Loading />
          )}
        </div>

        <hr className="my-10" />

        {consultor?.name ? (
          <div className="overflow-auto">
            <ConsultorTable consultor={consultor} />
          </div>
        ) : (
          <Loading />
        )}
      </section>
    </div>
  );
};

export default withRole(User, "cliente");
