import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout, Menu, Modal } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  HeaderAdmin,
  ManageConsForm,
  Modales,
  ShowCharts,
  TableAdmin,
  withRole,
} from "../components";
import { revertAll, revertChangesSaved } from "../app/EmployeesSlice";

const Admin = () => {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(revertChangesSaved());
  }, [dispatch]);

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
      <Layout
        style={{
          //minHeight: "calc(100vh - 65px)",
          maxHeight: "100vh",
          display: "flex",
          maxWidth: "100%",
        }}
      >
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
        <Layout className="site-layout ml-5">
          <Content className="overflow-auto page-height">
            <div className="container mx-auto">
              {showCharts ? (
                <ShowCharts />
              ) : (
                <>
                  <HeaderAdmin />
                  <TableAdmin />
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
