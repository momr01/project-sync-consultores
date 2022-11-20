import { useEffect } from "react";
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
import { formData } from "../../helpers/static";
import { formCrud } from "../../style";

const ManageConsForm = ({ add, setIsOpen }) => {
  const dispatch = useDispatch();
  const history = useLocation();

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

  /**
   * se definen los valores por defecto del formulario
   */
  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = !add ? `${data?.name}` : "";
    defaultValues.surname = !add ? `${data?.surname}` : "";
    defaultValues.phone = !add ? `${data?.phone}` : "";
    defaultValues.division = !add ? `${data?.division}` : "Software Factory";
    defaultValues.subdivision = !add ? `${data?.subdivision}` : "Front-end";
    defaultValues.email = !add ? `${data?.email}` : "";
    defaultValues.password = !add ? `${data?.password}` : "";
    reset({ ...defaultValues });
  }, [reset, data, add]);

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
      setIsOpen(false);
    } else {
      dispatch(setEditEmployee({ id: data._id, data: dataCompleted }));
    }
  };

  return (
    <>
      <div className="flex py-4 justify-center pt-10">
        <h2 className="font-poppins text-3xl my-auto mr-5 font-bold text-primary">
          {add
            ? "Agregar un nuevo consultor"
            : `Editar el consultor: ${data?.surname}, ${data?.name}`}
        </h2>
        {!add && (
          <Link className="my-auto hover:underline" to="/">
            Volver
          </Link>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={formCrud.form}>
        {formData.map(({ key, label, type, placeholder, regist }) => (
          <div key={key}>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>{label}</label>
              <input
                type={`${type}`}
                placeholder={`${placeholder}`}
                {...register(`${regist}`, { required: true })}
                className={`${formCrud.input} ${
                  errors?.[regist] &&
                  "rounded-md border-red-500 focus:outline-red-500"
                }`}
              />
            </div>
            <div className="relative">
              {errors?.[regist] && (
                <span className="absolute mt-[-10px] right-0 text-xs text-red-500 font-bold">
                  Este campo es requerido.
                </span>
              )}
            </div>
          </div>
        ))}

        <div className={formCrud.divInput}>
          <label className={formCrud.label}>División:</label>
          <select
            {...register("division", { required: true })}
            className={formCrud.input}
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
            <option value="MM">MM</option>
            <option value="SAP2">SAP2</option>
            <option value="SAP3">SAP3</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </div>
        <div className={formCrud.divBtn}>
          <button type="submit" className={formCrud.button}>
            {add ? "Agregar" : "Editar"}
          </button>
        </div>
      </form>
      {changesSaved && <Navigate to="/admin" replace={true} />}
     
    </>
  );
};

export default ManageConsForm;
