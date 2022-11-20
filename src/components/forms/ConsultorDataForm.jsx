import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  fetchAllEmployees,
  fetchOneEmployee,
  selectChangesSaved,
  selectOneEmp,
  setEditEmployee,
} from "../../app/EmployeesSlice";
import { useAuth } from "../../auth/authProvider";
import { editConsultor } from "../../helpers/static";
import { formCrud } from "../../style";

const ConsultorDataForm = () => {
  const dispatch = useDispatch();

  const { id } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * se obtiene el total de empleados guardados en DB y se obtiene
   * aquel que inició sesión mediante el guardado del id en
   * localstorage
   */
  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchOneEmployee({ id }));
  }, [dispatch, id]);

  const changesSaved = useSelector(selectChangesSaved);
  const consultor = useSelector(selectOneEmp);

  /**
   * se establecen los valores por defecto del formulario
   */
  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = consultor.name;
    defaultValues.surname = consultor.surname;
    defaultValues.division = consultor.division;
    defaultValues.subdivision = consultor.subdivision;
    defaultValues.url_photo = consultor?.url_photo
      ? `${consultor?.url_photo}`
      : "./img/";
    defaultValues.biography = consultor?.biography
      ? `${consultor?.biography}`
      : "";
    defaultValues.phone = consultor?.phone ? `${consultor?.phone}` : "";
    defaultValues.email = consultor?.email ? `${consultor?.email}` : "";
    defaultValues.password = consultor?.password
      ? `${consultor?.password}`
      : "";
    reset({ ...defaultValues });
  }, [reset, consultor]);

  const onSubmit = (dataForm) => {
    const dataCompleted = {
      role: consultor.role,
      phone: dataForm.phone,
      url_photo:
        dataForm.url_photo.length === 1
          ? `./img/${dataForm.url_photo[0].name}`
          : consultor.url_photo,
      biography: dataForm.biography,
      name: consultor.name,
      surname: consultor.surname,
      division: consultor.division,
      subdivision: consultor.subdivision,
      email: dataForm.email,
      password: dataForm.password,
    };

    dispatch(setEditEmployee({ id: consultor._id, data: dataCompleted }));
  };

  return (
    <>
      <section className="pt-10 font-poppins page-height fondo_gradient_grey overflow-auto">
        <div className="mb-10 flex justify-center">
          <h2 className="text-[30px] my-auto mr-10">Actualizar datos</h2>
          <Link className="my-auto" to="/">
            Volver
          </Link>
        </div>
        <form className="w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex md:flex-row flex-col md:justify-between">
            <div className="md:w-[50%] sm:w-[80%] w-[100%] md:border-r-2 sm:px-10 md:order-1 order-2 mx-auto">
              <div className="flex justify-between md:mb-10 my-2">
                <label className={formCrud.label}>Seleccione una imagen:</label>
                <input
                  type="file"
                  className={formCrud.input}
                  {...register("url_photo")}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
              <div className="flex justify-between my-4">
                <label className={formCrud.label}>Biografía:</label>
                <textarea
                  maxLength={500}
                  {...register("biography")}
                  className="border-2 sm:w-[60%] w-[74%] resize-none focus:outline-secondary h-[200px] rounded-lg"
                ></textarea>
              </div>
            </div>

            <div className="md:w-[50%] sm:w-[80%] w-[100%] md:border-l-2 sm:px-10 md:order-2 order-1 mx-auto">
              {editConsultor.map((input) => (
                <div key={input.key}>
                  <div className={formCrud.divInput}>
                    <label className={formCrud.label}>{input.label}</label>
                    <input
                      type={`${input.type}`}
                      placeholder={`${input.placeholder}`}
                      {...register(`${input.regist}`, { required: true })}
                      className={`${formCrud.input} ${
                        errors?.[input.regist] &&
                        "rounded-md border-red-500 focus:outline-red-500"
                      }`}
                      disabled={input.isDisabled}
                    />
                  </div>
                  <div className="relative">
                    {errors?.[input.regist] && (
                      <span className="absolute mt-[-10px] right-0 text-xs text-red-500 font-bold">
                        Este campo es requerido.
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bottom-3 bg-secondary py-2 w-[40%] rounded-md text-primary hover:bg-primary hover:text-white mt-5 mb-5"
            >
              Actualizar
            </button>
          </div>
        </form>
      </section>
      {changesSaved && <Navigate to="/" replace={true} />}
    </>
  );
};

export default ConsultorDataForm;
