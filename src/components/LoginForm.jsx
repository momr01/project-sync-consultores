const LoginForm = () => {
  return (
    <>
    <form className="flex flex-col w-[50%] mx-auto mt-20">
      <div className="space-y-2 mb-4 flex justify-between">
        <label className="block text-sm font-normal my-auto">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          className="w-[60%] border-2 border-slate-300 py-1.5 rounded-md focus:outline-secondary pl-3"
        />
      </div>

      <div className="space-y-2 mb-4 flex justify-between">
        <label className="block text-sm font-normal my-auto">
          Contraseña
        </label>
        <input
          type="password"
          name="password"
          className="w-[60%] border-2 border-slate-300 py-1.5 rounded-md focus:outline-secondary pl-3"
          // className="w-full border-2 border-slate-300 py-1.5 rounded-md"
        />
        
      </div>

      <div className="flex mt-6 justify-center">
        <button
          type="button"
          className="btn bg-secondary w-[115px] hover:bg-primary hover:text-white text-primary p-2 rounded-md"
        >
          Inicia sesión
        </button>
      </div>
      <hr className="my-7" />
      {/* <div className='flex justify-center'>
        <span className="">
          No tienes cuenta?
          <Link to="" className="text-primary ml-1">
            Regístrate
          </Link>
        </span>
      </div> */}
    </form>
  </>
  )
}

export default LoginForm