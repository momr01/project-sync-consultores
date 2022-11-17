import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectOneEmp, setOneEmployee } from "../../app/EmployeesSlice";
import { formCrud } from "../../style";

const ConsultorDataForm = ({ consultor }) => {
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    let defaultValues = {};
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
  };
  return (
    <section className="pt-10 font-poppins page-height fondo_gradient_grey overflow-auto">
      <div className="mb-10 flex justify-center">
        <h2 className="text-[30px] my-auto mr-10">Actualizar datos</h2>
        <Link className="my-auto" to="/">
          Volver
        </Link>
      </div>
      <form className="w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="w-[45%] h-[60vh]">
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

          <div className="w-[45%] h-[60vh] relative">
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Nombre:</label>
              <input
                type="text"
                defaultValue={`${consultor.name}`}
                disabled={true}
                className={formCrud.input}
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Apellido:</label>
              <input
                type="text"
                className={formCrud.input}
                disabled={true}
                defaultValue={`${consultor.surname}`}
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Teléfono:</label>
              <input
                type="tel"
                placeholder="Ingrese su teléfono"
                {...register("phone", { required: true })}
                className={formCrud.input}
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>División:</label>
              <input
                type="text"
                placeholder="Ingrese su división"
                className={formCrud.input}
                disabled={true}
                defaultValue={`${consultor.division}`}
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Sub-división:</label>
              <input
                type="text"
                placeholder="Ingrese su sub-división"
                className={formCrud.input}
                disabled={true}
                defaultValue={`${consultor.subdivision}`}
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Email:</label>
              <input
                type="email"
                placeholder="Correo electrónico del consultor"
                {...register("email", { required: true })}
                className={formCrud.input}
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Password:</label>
              <input
                type="password"
                placeholder="Contraseña del consultor"
                {...register("password", { required: true })}
                className={formCrud.input}
              />
            </div>
            <button
              type="submit"
              className="absolute bottom-3 bg-secondary py-2 w-full rounded-md text-primary hover:bg-primary hover:text-white mt-10"
            >
              Actualizar
            </button>
          </div>
        </div>

        {/* <button
          type="submit"
          className="bg-secondary py-2 w-full rounded-md text-primary hover:bg-primary hover:text-white mt-10"
        >
          Actualizar
        </button> */}
      </form>
    </section>
  );
};

export default ConsultorDataForm;
