import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { selectChangesSaved, setEditConsultor } from "../../app/EmployeesSlice";
import { editConsultor } from "../../helpers/static";
import { formCrud } from "../../style";

const ConsultorDataForm = ({ consultor }) => {
  const dispatch = useDispatch();
  const changesSaved = useSelector(selectChangesSaved);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    //console.log(data);

    const dataCompleted = {
      id: consultor.id,
      role: consultor.role,
      phone: dataForm.phone,
      url_photo:
        dataForm.url_photo.length === 1
          ? `./img/${dataForm.url_photo[0].name}`
          : consultor.url_photo,
      biography: dataForm.biography,
      //biography:
      //  dataForm.biography !== "" ? dataForm.biography : consultor.biography,
      name: consultor.name,
      last_name: consultor.surname,
      division: consultor.division,
      subdivision: consultor.subdivision,
      email: dataForm.email,
      password: dataForm.password,
    };

    console.log(dataCompleted);
    dispatch(setEditConsultor({ id: consultor.id, data: dataCompleted }));
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
          <div className="flex md:flex-row flex-col justify-between">
            <div className="md:w-[45%] w-[100%] h-[60vh]">
              <div className="flex justify-between mb-20">
                <label className={formCrud.label}>Seleccione una imagen:</label>
                <input
                  type="file"
                  className={formCrud.input}
                  {...register("url_photo")}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
              <div className="flex justify-between mb-10">
                <label className={formCrud.label}>Biografía:</label>
                <textarea
                  maxLength={500}
                  autoFocus={true}
                  {...register("biography")}
                  className="border-2 w-[80%] resize-none focus:outline-secondary h-[200px]"
                ></textarea>
              </div>
            </div>

            <div className="md:w-[45%] w-[100%] h-[60vh] relative">
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
                      <span className="absolute mt-[-15px] right-0 text-xs text-red-500 font-bold">
                        Este campo es requerido.
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="submit"
                className="lg:absolute bottom-3 bg-secondary py-2 w-full rounded-md text-primary hover:bg-primary hover:text-white mt-10 mb-5"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </section>
      {changesSaved && <Navigate to="/" replace={true} />}
    </>
  );
};

export default ConsultorDataForm;
