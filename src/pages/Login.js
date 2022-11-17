import { LoginForm } from "../components";

const Login = () => {
  return (
    <>
    <div className="fondo_gradient_login page-height overflow-auto">
    <section className="container mx-auto py-10">
        <div>
          <h1 className="text-white font-bold mb-6 text-3xl font-poppins text-center">
            Iniciar Sesión
          </h1>
        </div>

        <LoginForm />
      </section>
    </div>
      
    </>
  );
};

export default Login;
