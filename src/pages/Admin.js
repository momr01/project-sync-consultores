import { useState } from "react";
import { Space, Table, Layout, Menu, Modal } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Form } from "../components";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState({ state: false, add: null });

  const abrirModal = () => {
    setOpen({state: true, add: true})
  }
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
    getItem(
      "Listar todos",
      "1",
      <Link to="/admin">
        <TeamOutlined />
      </Link>
    ),
    getItem("Agregar nuevo", "2", <button onClick={()=>abrirModal()}><UserOutlined /></button>),
    //getItem("Agregar nuevo", "2", <UserOutlined />),
    getItem("Gráfico", "3", <PieChartOutlined />)
    
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
          {/* <Modal
        centered
        open={open.state}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <Form add={open.add} />
      </Modal> */}
        </Layout>
      </Layout>
      <Modal
        centered
        open={open.state}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <Form add={open.add} />
      </Modal>
    </>
  );
};

const HeaderAdmin = ({ open, setOpen }) => (
  <div className="flex justify-between mt-10">
    <div>
      <h1 className="text-2xl font-poppins">Lista de consultores</h1>
    </div>

    <div>
      <input
        type="text"
        placeholder="Buscar..."
        className="border-2 p-3 mr-2 focus:outline-primary"
      />
      <button
        onClick={() => setOpen({ state: true, add: true })}
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
      title: "División",
      dataIndex: "division",
      key: "division",
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
          <button
            onClick={() => setOpen({ state: true, add: false })}
            className="btn bg-green-200 text-green-800 p-1 rounded-md hover:bg-green-800 hover:text-green-200"
          >
            Editar
          </button>
          <button className="btn bg-red-200 text-red-800 p-1 rounded-md hover:bg-red-800 hover:text-red-200">
            Eliminar
          </button>
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
      division: "Software Factory",
      //tags: ["nice", "developer", "loser", "cool", "teacher"],
      email: "1@1.com",
    },
    {
      key: "2",
      nombre: "Jim",
      apellido: "Green",
      telefono: 155677789,
      division: "Software Factory",
      //tags: ["nice", "developer"],
      email: "1@1.com",
    },
    {
      key: "3",
      nombre: "John",
      apellido: "Brown",
      telefono: 155677789,
      division: "SAP",
      //tags: ["nice", "developer"],
      email: "1@1.com",
    },
    {
      key: "4",
      nombre: "Joe",
      apellido: "Black",
      telefono: 155677789,
      division: "SAP",
      //tags: ["nice", "developer"],
      email: "1@1.com",
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        className="mt-20 font-poppins"
        pagination={{ pageSize: 2 }}
      />

      <Modal
        centered
        open={open.state}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1000}
      >
        <Form add={open.add} />
      </Modal>
    </>
  );
};

export default Admin;
