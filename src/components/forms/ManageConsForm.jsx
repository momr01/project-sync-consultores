import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  selectChangesSaved,
  setAddEmployee,
  setEditEmployee,
} from "../../app/EmployeesSlice";
import { formData } from "../../helpers/static";
import { formCrud } from "../../style";

const ManageConsForm = ({ add, data, setIsOpen }) => {
  const dispatch = useDispatch();
  const changesSaved = useSelector(selectChangesSaved);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [division, setDivision] = useState(
    !add ? data?.division : "Software Factory"
  );
  // const [subdivision, setSubdivision] = useState(
  //   data.subdivision
  // );

  console.log(data?.subdivision);

  useEffect(() => {
    let defaultValues = {};
    defaultValues.name = data?.name ? `${data?.name}` : "";
    defaultValues.surname = data?.surname ? `${data?.surname}` : "";
    defaultValues.phone = data?.phone ? `${data?.phone}` : "";
    // defaultValues.division = data?.division ? `${data?.division}` : division;
    // defaultValues.subdivision = data?.subdivision
    //   ? `${data?.subdivision}`
    //   : subdivision;
    defaultValues.division = data?.division
      ? `${data?.division}`
      : "Software Factory";
    defaultValues.subdivision = data?.subdivision
      ? `${data?.subdivision}`
      : "Front-end";
    defaultValues.email = data?.email ? `${data?.email}` : "";
    defaultValues.password = data?.password ? `${data?.password}` : "";
    //defaultValues.lastName = "Rado";
    reset({ ...defaultValues });
  }, [reset, data]);

  const onSubmit = (dataForm) => {
    //console.log(dataForm);
    const dataCompleted = {
      id: add ? "1" : data?.id,
      role: "consultor",
      phone: dataForm.phone,
      url_photo: add ? "" : data?.url_photo,
      biography: add ? "" : data?.biography,
      name: dataForm.name,
      last_name: dataForm.surname,
      division: dataForm.division,
      subdivision: dataForm.subdivision,
      email: dataForm.email,
      password: dataForm.password,
    };
    console.log(dataCompleted);

    if (add) {
      dispatch(setAddEmployee(dataForm));
      reset();
      setIsOpen(false);
    } else {
      dispatch(setEditEmployee({ id: data.id, data: dataForm }));
      //dispatch(revertAll());
    }
  };

  const onChangeDivision = (data) => {
    setDivision(data.target.value);
  };

  // const onChangeSubdivision = (data) => {
  //   setSubdivision(data.target.value);
  // };

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
                <span className="absolute mt-[-15px] right-0 text-xs text-red-500 font-bold">
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
            onChange={onChangeDivision}
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
            //onChange={onChangeSubdivision}
          >
            <option value="MM">MM</option>
            <option value="SAP2">SAP2</option>
            <option value="SAP3">SAP3</option>
            <option value="Front-end">Front-end</option>
            <option value="Back-end">Back-end</option>
          </select>
        </div>
        {/* <div className={formCrud.divInput}>
          <label className={formCrud.label}>Sub-división:</label>
          {division === "SAP" ? (
            <select
              className={formCrud.input}
              {...register("subdivision", { required: true })}
              onChange={onChangeSubdivision}
            >
              <option>MM</option>
              <option>SAP2</option>
              <option>SAP3</option>
            </select>
          ) : (
            <select
              className={formCrud.input}
              {...register("subdivision", { required: true })}
              onChange={onChangeSubdivision}
            >
              <option>Front-end</option>
              <option>Back-end</option>
            </select>
          )}
        </div> */}
        <div className={formCrud.divBtn}>
          <button type="submit" className={formCrud.button}>
            {add ? "Agregar" : "Editar"}
          </button>
        </div>
      </form>
      {changesSaved && <Navigate to="/" replace={true} />}
    </>
  );
};

export default ManageConsForm;
