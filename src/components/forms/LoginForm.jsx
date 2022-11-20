import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../auth/authProvider";
import { formLogin } from "../../style";
import { formLoginData } from "../../helpers/static";
import { fetchAllEmployees, selectEmpItems } from "../../app/EmployeesSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();

  const [errorLogin, setErrorLogin] = useState(false);

  /**
   * se onbtienen de la DB todos los empleados
   */
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  const allEmployees = useSelector(selectEmpItems);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const itemIndex = allEmployees.findIndex(
      (emp) => emp.password === data.password && emp.email === data.email
    );

    if (itemIndex !== -1) {
      login(allEmployees[itemIndex].role, allEmployees[itemIndex]._id);
    } else {
      setErrorLogin(true);
    }
  };

  return (
    <>
      <form
        className="flex flex-col md:w-[50%] w-[90%] mx-auto mt-20 font-poppins"
        onSubmit={handleSubmit(onSubmit)}
      >
        {formLoginData.map((input) => (
          <div className="mb-12" key={input.key}>
            <div className="space-y-2 flex justify-between">
              <label className={formLogin.label}>{input.label}</label>
              <input
                type={`${input.type}`}
                {...register(`${input.regist}`, {
                  required: input.isRequired,
                  pattern: input.isPattern,
                  maxLength: input.isMaxLength,
                  minLength: input.isMinLength,
                })}
                className={`${
                  errors?.[input.regist] && "border-[3px] border-red-500"
                } w-[60%] py-1.5 rounded-md focus:outline-none pl-3`}
              />
            </div>
            <div className="relative">
              {errors[input.regist]?.type === "required" && (
                <span className={formLogin.errorInputs}>
                  Este campo es requerido.
                </span>
              )}
              {errors[input.regist]?.type === "pattern" && (
                <span className={formLogin.errorInputs}>
                  Debe ingresar un email válido.
                </span>
              )}
              {(errors[input.regist]?.type === "minLength" ||
                errors[input.regist]?.type === "maxLength") && (
                <span className={formLogin.errorInputs}>
                  La contraseña debe tener 8 caracteres.
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn bg-secondary w-full py-3 text-lg font-semibold hover:bg-primary hover:text-secondary text-primary p-2 rounded-lg"
          >
            Iniciar Sesión
          </button>
        </div>
        <div className="relative">
          {errorLogin && (
            <div className="xl:absolute border-2 mt-8 bg-red-200 text-red-500 rounded-lg md:text-lg font-bold text-center py-[4px]">
              Error al intentar ingresar. Por favor verifique los datos.
            </div>
          )}
        </div>

        <hr className="my-10 border-1" />
      </form>
    </>
  );
};

export default LoginForm;
