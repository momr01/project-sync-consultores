import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setAddEmployee } from "../../app/EmployeesSlice";
import { formCrud } from "../../style";

const ManageConsForm = ({ add, data }) => {
  const { register, handleSubmit, reset } = useForm();
  const [section, setSection] = useState("Software Factory");
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    //console.log(data);
    dispatch(setAddEmployee(data));
    reset();
  };

  const onChange = (data) => {
    setSection(data.target.value);
    //console.log(data.target.value);
  };
  return (
    <>
      <div className="flex py-4 justify-center m-5">
        <h2 className="font-poppins text-2xl my-auto mr-5">
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
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre del consultor"
            {...register("name")}
            className={formCrud.input}
            defaultValue={data?.name ? `${data.name}` : ""}
          />
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido del consultor"
            {...register("lastname")}
            className={formCrud.input}
            defaultValue={data?.surname ? `${data.surname}` : ""}
          />
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono del consultor"
            {...register("phone")}
            className={formCrud.input}
            defaultValue={data?.phone ? `${data.phone}` : ""}
          />
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>División:</label>
          <select
            {...register("section")}
            onChange={onChange}
            className={formCrud.input}
            defaultValue={data?.section ? `${data.section}` : ""}
          >
            <option>Software Factory</option>
            <option>SAP</option>
          </select>
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Sub-división:</label>
          {section === "SAP" ? (
            <select
              //{...register("position")}
              className={formCrud.input}
            >
              <option>MM</option>
              <option>SAP2</option>
              <option>SAP3</option>
            </select>
          ) : (
            <select
              //{...register("position")}
              className={formCrud.input}
            >
              <option>Front-end</option>
              <option>Back-end</option>
            </select>
          )}
        </div>
        <div className={formCrud.divInput}>
          <label className={formCrud.label}>Email:</label>
          <input
            type="email"
            placeholder="Correo electrónico del consultor"
            {...register("email")}
            className={formCrud.input}
            defaultValue={data?.email ? `${data.email}` : ""}
          />
        </div>
        <div className={formCrud.divBtn}>
          <button type="submit" className={formCrud.button}>
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default ManageConsForm;
