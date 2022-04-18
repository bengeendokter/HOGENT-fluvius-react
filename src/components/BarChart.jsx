import React from "react";
import { Bar, Chart } from "react-chartjs-2";

import { faker } from "@faker-js/faker";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

export const options = {
  scales: {
    y: {
      max: 800,
    },
  },
  plugins: {
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y-axis-0",
          yMin: 500,
          yMax: 500,
          borderColor: "black",
          borderWidth: 1,
          label: {
            enabled: true,
            content: "500",
          },
        },
      ],
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true, // SET SCROOL ZOOM TO TRUE
        },
        mode: "xy",
        speed: 100,
      },
      pan: {
        enabled: true,
        mode: "xy",
        speed: 100,
      },
    },
  },
};

//const labels = ["January", "February", "March", "April", "May", "June", "July"];
const labels = ["January"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: labels.map(() => faker.datatype.number({ min: 400, max: 400 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: labels.map(() => faker.datatype.number({ min: 600, max: 600 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const BarChart = () => {
  return (
    <div className="verBar">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;