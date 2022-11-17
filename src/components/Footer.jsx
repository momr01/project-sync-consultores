import React from "react";

const Footer = () => {
  return (
    <footer className="h-14 bg-primary text-white ">
      <div className="flex container mx-auto justify-center h-full">
        <div className="my-auto text-base mr-5">Desarrollado por Syncronik Internships Group 2022</div>
        <div className="my-auto mr-5 text-lg">&copy;</div>
        <div className="my-auto text-base italic">Todos los derechos
          reservados</div>
        {/* <p className="py-auto mb-0 text-base mr-5">
          
          <span className="mb-0 text-base mr-5"></span>
        </p> */}
      </div>
    </footer>
  );
};

export default Footer;
