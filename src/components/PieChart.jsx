import React from "react";
import { Pie } from "react-chartjs-2";

export const data = {
  labels: ["Bereikt", "Niet Bereikt"],
  datasets: [
    {
      label: "# of Votes",
      data: [70, 30],
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  return (
    <div className="pie">
      <h3>Pie Chart</h3>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;