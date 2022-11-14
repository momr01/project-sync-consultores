import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../auth/authProvider";
import { users } from "../../helpers/variables";


const LoginForm = () => {
  const { login } = useAuth();
  
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    //console.log(data);
    //const response = await axios.get('http://localhost:3034/api/users');
    
    //console.log(response.data)

    const itemIndex = users.findIndex(
      (user) =>
        user.password === data.password &&
        user.email === data.email
    );

    if(itemIndex!==-1){
      login(users[itemIndex].role, users[itemIndex].id)
    }
   
    
    
  };

  return (
    <>
      <form
        className="flex flex-col w-[50%] mx-auto mt-20 font-poppins"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-2 mb-4 flex justify-between">
          <label className="block text-sm font-normal my-auto">
            Correo electrónico:
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-[60%] border-2 border-slate-300 py-1.5 rounded-md focus:outline-secondary pl-3"
          />
        </div>

        <div className="space-y-2 mb-4 flex justify-between">
          <label className="block text-sm font-normal my-auto">
            Contraseña:
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-[60%] border-2 border-slate-300 py-1.5 rounded-md focus:outline-secondary pl-3"
          />
        </div>

        <div className="flex mt-6 justify-center">
          <button
            type="submit"
            className="btn bg-secondary w-full hover:bg-primary hover:text-white text-primary p-2 rounded-md"
          >
            Iniciar Sesión
          </button>
        </div>
        <hr className="my-20 border-1" />
      </form>
    </>
  );
};

export default LoginForm;
