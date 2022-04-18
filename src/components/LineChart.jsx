import React from "react";
import { Line } from "react-chartjs-2";

const top = "top";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: top,
    },
    title: {
      display: true,
    },
  },
};

const labels = ["January", "February"];
const data1 = [400, 600];
const data2 = [300, 500];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: data1.map((e) => e),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: data2.map((e) => e),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const LineChart = () => {
  return (
    <div className="line">
      <h3>Line Chart</h3>
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;