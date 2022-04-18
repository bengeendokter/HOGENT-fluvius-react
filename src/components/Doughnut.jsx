import React from "react";
import { Doughnut } from "react-chartjs-2";
/*import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
*/

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

const DoughnutChart = () => {
  return (
    <div className="pie">
      <h3>Doughnut Chart</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;