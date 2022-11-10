import { Menu } from "antd";

const Navbar = () => (
  //   <nav className="bg-primary">
  //     <ul className="mx-10 flex flex-1 justify-between text-white py-5 mb-0">
  //       <li>Syncronik</li>
  //       <div className="flex">
  //         <li className="mr-3">!</li>
  //         <div>
  //         <Menu.SubMenu key="profile" title="Perfil">
  //             <Menu.Item key="two" icon={<AppstoreOutlined />}>
  //               Navigation Two
  //             </Menu.Item>
  //             <Menu.Item key="three" icon={<AppstoreOutlined />}>
  //               Navigation Three
  //             </Menu.Item>
  //             <Menu.ItemGroup title="Item Group">
  //               <Menu.Item key="four" icon={<AppstoreOutlined />}>
  //                 Navigation Four
  //               </Menu.Item>
  //               <Menu.Item key="five" icon={<AppstoreOutlined />}>
  //                 Navigation Five
  //               </Menu.Item>
  //             </Menu.ItemGroup>
  //           </Menu.SubMenu>
  //         </div>

  //       </div>
  //     </ul>
  //   </nav>
  <Menu mode="horizontal" style={{backgroundColor: "#002140", marginBottom: 0, paddingTop: "5px", paddingBottom: "5px"}}>
    <Menu.Item key="logo" className="text-white font-poppins text-md ">Syncronik</Menu.Item>

    <Menu.SubMenu key="profile" title="Perfil" className="ml-auto text-white font-poppins text-md">
      <Menu.Item key="edit" className="font-poppins">
        Editar perfil
      </Menu.Item>
      <Menu.Item key="out" className="font-poppins">
        Cerrar Sesión
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

export default Navbar;
