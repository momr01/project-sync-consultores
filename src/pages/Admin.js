import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Layout } from "antd";
import {
  HeaderAdmin,
  Modales,
  ShowCharts,
  SiderAdmin,
  TableAdmin,
  withRole,
} from "../components";
import {
  fetchAllEmployees,
  fetchOneEmployee,
  revertChangesSaved,
  revertModalState,
  revertSearch,
} from "../app/EmployeesSlice";
import { useAuth } from "../auth/authProvider";

const Admin = () => {
  const dispatch = useDispatch();

  const { id } = useAuth();

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

  const { Content } = Layout;

  const [expandir, setExpandir] = useState(false);

  return (
    <>
      <Layout>
        <SiderAdmin
          expandir={expandir}
          setExpandir={setExpandir}
          setIsOpen={setIsOpen}
          setShowCharts={setShowCharts}
        />

        <Layout
          className={`site-layout ${
            expandir ? "ml-[160px]" : "ml-[60px]"
          } transition-all duration-1000`}
        >
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
