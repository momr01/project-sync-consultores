import { LoginForm } from "../components";

const Login = () => {
  return (
    <>
      <section className="container mx-auto my-10">
        <div>
          <h1 className="text-slate-800 font-bold mb-6 text-3xl font-poppins text-center">
            Iniciar Sesión
          </h1>
        </div>

        <LoginForm />
      </section>
    </>
  );
};

export default Login;
