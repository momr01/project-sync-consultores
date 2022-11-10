import {useState} from 'react'
import { useForm } from "react-hook-form";
import { formCrud } from '../style';

const Form = ({ add }) => {
  const { register, handleSubmit } = useForm();
  const [section, setSection] = useState("Software Factory")

  const onSubmit = (data) => {
    console.log(data);
  };

  const onChange = data => {
    setSection(data.target.value)
    console.log(data.target.value)
  }
  return (
    <>
    <div className='flex py-4'>
      <h2 className='mx-auto font-poppins text-2xl mb-10'>{add ? "Agregar un nuevo consultor" : "Editar el consultor"}</h2>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className={formCrud.form}>
      <div className={formCrud.divInput}>
        <label className={formCrud.label}>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre del consultor"
          {...register("name")}
          className={formCrud.input}
        />
      </div>
      <div className={formCrud.divInput}>
        <label className={formCrud.label}>Apellido:</label>
        <input
          type="text"
          placeholder="Apellido del consultor"
          {...register("lastname")}
          className={formCrud.input}
        />
      </div>
      <div className={formCrud.divInput}>
        <label className={formCrud.label}>Teléfono:</label>
        <input
          type="tel"
          placeholder="Teléfono del consultor"
          {...register("tel")}
          className={formCrud.input}
        />
      </div>
      <div className={formCrud.divInput}>
        <label className={formCrud.label}>División:</label>
        <select {...register("section")} onChange={onChange} className={formCrud.input}>
          <option>Software Factory</option>
          <option>SAP</option>
        </select>
      </div>
      <div className={formCrud.divInput}>
        <label className={formCrud.label}>Sub-división:</label>
        {section === "SAP" ? (
          <select {...register("position")} className={formCrud.input}>
          <option>MM</option>
          <option>SAP2</option>
          <option>SAP3</option>
        </select>
        ) : (
          <select {...register("position")} className={formCrud.input}>
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
        />
      </div>
      <div className={formCrud.divBtn}>
        <button type="submit" className={formCrud.button}>Enviar</button>
      </div>
    </form>
    </>
    
  );
};

export default Form;
