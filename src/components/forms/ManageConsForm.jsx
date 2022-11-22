import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  fetchAllEmployees,
  fetchOneEmployeeToEdit,
  selectChangesSaved,
  selectOneEmpToEdit,
  setAddEmployee,
  setEditEmployee,
} from "../../app/EmployeesSlice";
import routes from "../../helpers/routes";
import { formData } from "../../helpers/static";
import { formCrud } from "../../style";
import { Loading, FormBase } from "../index";

const ManageConsForm = ({ add, setIsOpen }) => {
  const dispatch = useDispatch();
  const history = useLocation();

  const [division, setDivision] = useState();

  /**
   *
   * @returns
   * se obtiene id desde path o ruta
   */
  const getId = () => {
    const pathname = history.pathname;
    const array = pathname.split("/");
    const id = array[4];
    return id;
  };
  const id = getId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * se obtienen desde DB todos los empleados
   * y si el formulario se abre con la intención de editar un
   * empleado, más NO AGREGAR UNO NUEVO
   * entonces se hace consulta a DB para obtener los datos de dicho empleado
   * y así guardar en el store esos datos y así consumirlos más fácilmente
   */
  useEffect(() => {
    dispatch(fetchAllEmployees());
    if (!add) {
      dispatch(fetchOneEmployeeToEdit({ id }));
    }
  }, [dispatch, id, add]);

  const changesSaved = useSelector(selectChangesSaved);
  const data = useSelector(selectOneEmpToEdit);

  useEffect(() => {
    setDivision(add ? "" : data.division);
  }, [add, data]);

  /**
   * se definen los valores por defecto del formulario
   */
  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = !add
      ? data?.name
        ? `${data?.name}`
        : "Cargando..."
      : "";
    defaultValues.surname = !add
      ? data?.surname
        ? `${data?.surname}`
        : "Cargando..."
      : "";
    defaultValues.phone = !add
      ? data?.phone
        ? `${data?.phone}`
        : "Cargando..."
      : "";
    defaultValues.division = !add ? `${data?.division}` : "Software Factory";
    defaultValues.subdivision = !add ? `${data?.subdivision}` : "Frontend";
    defaultValues.email = !add
      ? data?.email
        ? `${data?.email}`
        : "Cargando..."
      : "";
    defaultValues.password = !add
      ? data?.password
        ? `${data?.password}`
        : "Cargando..."
      : "";
    reset({ ...defaultValues });
  }, [reset, data, add]);

  const handleDivision = (data) => {
    setDivision(data.target.value);
  };

  const onSubmit = (dataForm) => {
    const dataCompleted = {
      role: "consultor",
      phone: dataForm.phone,
      url_photo: add ? "/img/profile_default.jpg" : data?.url_photo,
      biography: add ? "" : data?.biography,
      name: dataForm.name,
      surname: dataForm.surname,
      division: dataForm.division,
      subdivision: dataForm.subdivision,
      email: dataForm.email,
      password: dataForm.password,
    };

    if (add) {
      dispatch(setAddEmployee(dataCompleted));
      dispatch(fetchAllEmployees());
      reset();
      setIsOpen();
    } else {
      dispatch(setEditEmployee({ id: data._id, data: dataCompleted }));
    }
  };

  return (
    <>
      <div className="flex py-4 justify-center ss:pt-10 ss:flex-row flex-col">
        <h2 className="font-poppins text-3xl ss:my-auto mb-5 mr-5 font-bold text-primary text-center ss:order-1 order-2">
          {add ? (
            "Agregar un nuevo consultor"
          ) : data?.name ? (
            `Editar el consultor: ${data?.surname}, ${data?.name}`
          ) : (
            <Loading />
          )}
        </h2>
        {!add && (
          <Link
            className="ss:my-auto mb-5 hover:underline ss:order-2 order-1 ml-3 ss:ml-0"
            to={routes.home}
          >
            Volver
          </Link>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formCrud.form}>
        {formData.map((input, index) => (
          <FormBase
            key={index}
            data={input}
            styles={formCrud}
            register={register}
            errors={errors}
          />
        ))}

        <div className={formCrud.divInput}>
          <label className={formCrud.label}>División:</label>
          <select
            {...register("division", { required: true })}
            className={formCrud.input}
            onChange={handleDivision}
          >
            <option>Software Factory</option>
            <option>SAP</option>
          </select>
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Sub-división:</label>

          <select
            className={formCrud.input}
            {...register("subdivision", { required: true })}
          >
            {division === "SAP" ? (
              <>
                <option value="MM">MM</option>
                <option value="SD">SD</option>
                <option value="ABAP">ABAP</option>
              </>
            ) : (
              <>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Devops">Devops</option>
              </>
            )}
          </select>
        </div>
        <div className={formCrud.divBtn}>
          <button type="submit" className={formCrud.button}>
            {add ? "Agregar" : "Editar"}
          </button>
        </div>
      </form>
      {changesSaved && <Navigate to={routes.admin} replace={true} />}
    </>
  );
};

export default ManageConsForm;
