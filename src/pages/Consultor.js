import { Link } from "react-router-dom";
import { withRole } from "../components";
import { colConsultorPage } from "../helpers/variables";

const User = () => {
  const data = [
    {
      key: "1",
      name: "John",
      surname: "Brown",
      section: "Software Factory",
      phone: 155677789,
      email: "1@1.com",
    },
  ];

  return (
    <section className="flex flex-col container mx-auto font-poppins">
      <div className="flex justify-around">
        <div className="flex justify-center my-10">
          <h2 className="text-2xl my-auto">Maximiliano Montaña</h2>
          <span className="text-lg my-auto mx-5">-</span>
          <p className="text-lg my-auto">Software Factory</p>
        </div>
        <div className="my-auto">
          <Link to={`/consultor/edit/${data[0].key}`}>Editar datos</Link>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-[30%]">
          <img
            src="/img/foto_perfil.jpg"
            alt="profile"
            className="w-[50%] rounded-full mx-auto"
          />

          <p className="text-center mt-3 text-lg">Desarrollador de software</p>
        </div>
        <div className="w-[50%]">
          <div className="flex">
            <h2 className="text-lg font-bold my-auto mr-5">Biografía</h2>
          </div>

          <p className="leading-7 text-justify italic text-[12px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            finibus aliquam eros, ac cursus ex iaculis quis. Curabitur tincidunt
            in arcu in pulvinar. Nullam ultrices congue mattis. Mauris molestie
            quis velit sed gravida. Ut ut nisl eget nunc rutrum maximus sodales
            in ipsum. Pellentesque sed ornare mauris. In mi risus, varius a
            finibus eget, interdum sed neque. Nunc ac elit id lectus mollis
            rutrum ac sit amet libero. Vestibulum efficitur justo vel pulvinar
            commodo. Donec sit amet orci vel dui volutpat aliquet a euismod
            nunc. Cras hendrerit, libero id tempus ultricies, orci eros
            ultricies nibh, id pellentesque diam ex ac orci. Suspendisse a
            lobortis nisl.
          </p>
        </div>
      </div>

      <hr className="my-10" />

      <div>
        <table className="w-full mt-10 rounded-md mb-10">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              {colConsultorPage.map((col) => (
                <th
                  className="p-3 text-sm font-semibold tracking-wide text-left"
                  key={col.key}
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="odd:bg-white even:bg-slate-200">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {data[0].name}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {data[0].surname}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {data[0].phone}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {data[0].section}
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                {data[0].email}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default withRole(User, "cliente");
