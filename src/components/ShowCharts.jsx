import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllEmployees,
  selectEmpItems,
  selectModalState,
} from "../app/EmployeesSlice";

const ShowCharts = () => {
  const dispatch = useDispatch();

  const modalState = useSelector(selectModalState);
  /**
   * obtener desde la DB todos los empleados
   */
  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch, modalState]);

  const employees = useSelector(selectEmpItems).filter(
    (emp) => emp.role !== "admin"
  );

  /**
   * filtrado y asignacion de divisiones
   */
  const divisiones = [];
  const totalSAP = employees.filter((emp) => emp.division === "SAP").length;
  const totalSF = employees.filter(
    (emp) => emp.division === "Software Factory"
  ).length;
  divisiones.push(totalSAP);
  divisiones.push(totalSF);

  /**
   * filtrado y asignacion de subdivision SAP
   */
  const subdSAP = [];
  const totalMM = employees.filter((emp) => emp.subdivision === "MM").length;
  const totalSAP2 = employees.filter((emp) => emp.subdivision === "SD").length;
  const totalSAP3 = employees.filter(
    (emp) => emp.subdivision === "ABAP"
  ).length;
  subdSAP.push(totalMM);
  subdSAP.push(totalSAP2);
  subdSAP.push(totalSAP3);

  /**
   * filtrado y asignacion de subdivision SF
   */
  const subdSF = [];
  const totalFrontend = employees.filter(
    (emp) => emp.subdivision === "Frontend"
  ).length;
  const totalBackend = employees.filter(
    (emp) => emp.subdivision === "Backend"
  ).length;
  const totalDB = employees.filter(
    (emp) => emp.subdivision === "Database"
  ).length;
  const totalDevops = employees.filter(
    (emp) => emp.subdivision === "Devops"
  ).length;
  subdSF.push(totalFrontend);
  subdSF.push(totalBackend);
  subdSF.push(totalDB);
  subdSF.push(totalDevops);

  return (
    <>
      <div className="mt-10">
        <h2 className="text-3xl font-poppins text-center font-bold text-primary">
          Gráficos
        </h2>
      </div>
      <div className="md:flex md:justify-around">
        <div className="md:w-[50%] md:p-10 ss:w-[70%] mx-auto mb-10">
          <Chart
            type="pie"
            series={divisiones}
            options={{
              title: { text: "Divisiones" },
              noData: { text: "Empty Data" },
              labels: ["SAP", "SF"],
            }}
          ></Chart>
        </div>
        <div className="md:flex md:flex-col md:w-[35%] ss:w-[70%] mx-auto">
          <div className="mb-10 md:mb-0 ss:w-[80%]">
            <Chart
              type="pie"
              series={subdSAP}
              options={{
                title: { text: "Sub-división SAP" },
                noData: { text: "Empty Data" },
                labels: ["MM", "SD", "ABAP"],
              }}
            ></Chart>
          </div>

          <div className="ss:w-[80%]">
            <Chart
              type="pie"
              series={subdSF}
              options={{
                title: { text: "Sub-división SF" },
                noData: { text: "Empty Data" },
                labels: ["Frontend", "Backend", "Database", "Devops"],
              }}
            ></Chart>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowCharts;
