import { useState } from "react";
import { Space, Table, Tag, Breadcrumb, Layout, Menu, Modal } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState({ state: false, type: "" });

  const { Header, Content, Footer, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Gráfico", "1", <PieChartOutlined />),
    //getItem("Option 2", "2", <DesktopOutlined />),
    // getItem("User", "sub1", <UserOutlined />, [
    //   getItem("Tom", "3"),
    //   getItem("Bill", "4"),
    //   getItem("Alex", "5"),
    // ]),
    // getItem("Team", "sub2", <TeamOutlined />, [
    //   getItem("Team 1", "6"),
    //   getItem("Team 2", "8"),
    // ]),
    // getItem("Files", "9", <FileOutlined />),
    getItem("Listar todos", "2", <Link to="/login"><TeamOutlined /></Link>),
    getItem("Agregar nuevo", "3", <UserOutlined />),
  ];
  return (
    <>
      <Layout
        style={{
          minHeight: "calc(100vh - 65px)",
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
        <Layout className="site-layout">
          <Content className="container mx-auto">
            <div>
              <HeaderAdmin open={open} setOpen={setOpen} />
              <TableAdmin open={open} setOpen={setOpen} />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

const HeaderAdmin = ({ open, setOpen }) => (
  <div className="flex justify-between mt-10">
    <div>
      <h1 className="text-2xl">Lista de consultores</h1>
    </div>

    <div>
      <input
        type="text"
        placeholder="Buscar..."
        className="border-2 p-3 mr-2 focus:outline-primary"
      />
      <button
        onClick={() => setOpen({ state: true, type: "add" })}
        className="btn bg-secondary p-3 rounded-md text-primary hover:text-secondary hover:bg-primary "
      >
        Añadir consultor
      </button>
    </div>
  </div>
);

const TableAdmin = ({ open, setOpen }) => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      //render: (text) => <a>{text}</a>,
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Teléfono",
      dataIndex: "telefono",
      key: "telefono",
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Acción",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => setOpen({ state: true, type: "edit" })} className="btn bg-green-200 text-green-800 p-1 rounded-md hover:bg-green-800 hover:text-green-200">
            Editar
          </button>
          <button className="btn bg-red-200 text-red-800 p-1 rounded-md hover:bg-red-800 hover:text-red-200">Eliminar</button>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      nombre: "John",
      apellido: "Brown",
      telefono: 155677789,
      sector: "Software Factory",
      //tags: ["nice", "developer", "loser", "cool", "teacher"],
      email: "1@1.com",
    },
    {
      key: "2",
      nombre: "Jim",
      apellido: "Green",
      telefono: 155677789,
      sector: "Software Factory",
      //tags: ["nice", "developer"],
      email: "1@1.com",
    },
    {
      key: "3",
      nombre: "John",
      apellido: "Brown",
      telefono: 155677789,
      sector: "SAP",
      //tags: ["nice", "developer"],
      email: "1@1.com",
    },
    {
      key: "4",
      nombre: "Joe",
      apellido: "Black",
      telefono: 155677789,
      sector: "SAP",
      //tags: ["nice", "developer"],
      email: "1@1.com",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-20"
        pagination={{ pageSize: 2 }}
      />

      <Modal
        title="Modal 1000px width"
        centered
        open={open.state}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        {open.type === "edit" ? <h1>EDITAR</h1> : <h2>Nuevo</h2>}
      </Modal>
    </>
  );
};

export default Admin;
