import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  HeaderAdmin,
  Modales,
  ShowCharts,
  TableAdmin,
  withRole,
} from "../components";
import {
  fetchAllEmployees,
  fetchOneEmployee,
  revertChangesSaved,
  revertModalState,
  revertSearch,
  selectModalState,
} from "../app/EmployeesSlice";
import { useAuth } from "../auth/authProvider";

const Admin = () => {
  const dispatch = useDispatch();

  const { id } = useAuth();

  const [collapsed, setCollapsed] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * se obtiene el total de empleados de la DB
   * se obtiene los datos del empleado que ha iniciado sesión
   * se revierten los cambios que genera el actualizar un empleado
   * se revierten los cambios que genera el buscar un empleado
   *
   */
  useEffect(() => {
    dispatch(fetchAllEmployees());
    dispatch(fetchOneEmployee({ id }));
    dispatch(revertChangesSaved());
    dispatch(revertSearch());
    dispatch(revertModalState());
  }, [dispatch, id]);

  const modalState = useSelector(selectModalState)
  console.log(modalState)

  const { Content, Sider } = Layout;
  function getItem(label, key, icon, items) {
    return {
      key,
      icon,
      items,
      label,
    };
  }
  const items = [
    getItem(
      "Listar todos",
      "1",
      <div className="w-full flex" onClick={() => setShowCharts(false)}>
        <TeamOutlined className="my-auto mr-3" />
        <h2 className="my-auto text-white">Listar todos</h2>
      </div>
    ),
    getItem(
      "Agregar nuevo",
      "2",
      <div className="w-full flex" onClick={() => setIsOpen(true)}>
        <UserOutlined className="my-auto mr-3" />
        <h2 className="my-auto text-white">Agregar nuevo</h2>
      </div>
    ),
    getItem(
      "Gráfico",
      "3",
      <div className="w-full flex" onClick={() => setShowCharts(true)}>
        <PieChartOutlined className="my-auto mr-3" />
        <h2 className="my-auto text-white">Gráficos</h2>
      </div>
    ),
  ];

  return (
    <>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout className="site-layout sm:mx-10">
          <Content className="overflow-auto page-height">
            <div className="container mx-auto">
              {showCharts ? (
                <ShowCharts />
              ) : (
                <>
                  <HeaderAdmin />
                  <div className="overflow-x-auto">
                    <TableAdmin />
                  </div>
                </>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
      <Modales isOpen={isOpen} setIsOpen={setIsOpen} add={true} />
    </>
  );
};

export default withRole(Admin, "admin");
