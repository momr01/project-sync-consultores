import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { formCrud } from "../../style";

const ConsultorDataForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="my-10 font-poppins">
      <div className="mb-10 flex justify-center">
        <h2 className="text-[30px] my-auto mr-10">Actualizar datos</h2>
        <Link className="my-auto" to="/">
          Volver
        </Link>
      </div>
      <form className="w-[90%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <div className="w-[45%]">
            <div className="flex justify-between mb-20">
              <label>Seleccione una imagen:</label>
              <input type="file" {...register("photo")} />
            </div>
            <div className="flex justify-between mb-10">
              <label>Biografía:</label>
              <textarea
                maxLength={500}
                autoFocus={true}
                {...register("bio")}
                className="border-2 w-[80%] resize-none focus:outline-secondary h-[200px]"
              ></textarea>
            </div>
          </div>

          <div className="w-[45%]">
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Nombre:</label>
              <input
                type="text"
                defaultValue="Maximiliano"
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
                defaultValue="Montaña"
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Teléfono:</label>
              <input
                type="tel"
                placeholder="Ingrese su teléfono"
                {...register("phone")}
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
                defaultValue="Software Factory"
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Sub-división:</label>
              <input
                type="text"
                placeholder="Ingrese su sub-división"
                className={formCrud.input}
                disabled={true}
                defaultValue="Desarrollador de Software"
              />
            </div>
            <div className={formCrud.divInput}>
              <label className={formCrud.label}>Email:</label>
              <input
                type="email"
                placeholder="Correo electrónico del consultor"
                {...register("email")}
                className={formCrud.input}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-secondary py-2 w-full rounded-md text-primary hover:bg-primary hover:text-white mt-10"
        >
          Actualizar
        </button>
      </form>
    </section>
  );
};

export default ConsultorDataForm;
