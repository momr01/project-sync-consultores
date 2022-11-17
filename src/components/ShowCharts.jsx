import Chart from "react-apexcharts";

const ShowCharts = () => {
  return (
    <>
      <div className="mt-10">
        <h2 className="text-3xl font-poppins text-center font-bold text-primary">Gráficos</h2>
      </div>
      <div className="md:flex md:justify-around mt-10">
        <div className="md:w-[60%]">
          <Chart
            type="pie"
            width={`80%`}
            //width={1349}
            //height={550}
            series={[60, 40]}
            options={{
              title: { text: "Divisiones" },
              noData: { text: "Empty Data" },
              labels: ["Software Factory", "SAP"],
            }}
          ></Chart>
        </div>
        <div className="md:flex md:flex-col md:w-[35%]">
          <Chart
            type="pie"
            width={`80%`}
            //width={1349}
            //height={550}
            series={[45, 20, 35]}
            options={{
              title: { text: "Sub-división SAP" },
              noData: { text: "Empty Data" },
              labels: ["SD", "MM", "ABAP"],
            }}
          ></Chart>

          <Chart
            type="pie"
            width={`80%`}
            //width={1349}
            //height={550}
            series={[23, 43, 50, 54, 65]}
            options={{
              title: { text: "Sub-división SF" },
              noData: { text: "Empty Data" },
              labels: ["Front-end", "Back-end", "DB", "Deploy", "MVC"],
            }}
          ></Chart>
        </div>
      </div>
    </>
  );
};

export default ShowCharts;
