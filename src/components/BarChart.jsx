import React from "react";
import { Bar, Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import { useData } from "../contexts/DataProvider";

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

const BarChart = ({naam, id}) => {
  const {data: x} = useData();

  //initeel lege array
  if (x === undefined) {
    return <></>;
  }
    

  const labels = [""];
  const dataD = x.filter(d => d.naam === naam);
  const doelwaardes = dataD[0]['doelwaarde'];
  const eenheid = dataD[0]['eenheid'];

  const datas = dataD[0]['data'].map(d =>  {
    const kleur = `${ '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`;

    return {
      label: `${Object.entries(d)[0][0]}`,
      data: labels.map(() => Object.entries(d)[0][1][0]),
      backgroundColor: kleur,
      hoverBackgroundColor: kleur,
      borderColor: kleur,
      borderWidth: 2,
    }
  }
  );

  const data = {
    labels,
    datasets: datas,
  };
   const options = {
    scales: {
      y: {
        //max: 800,
        title: { display: true, text: `${eenheid}` }
      },
      
    },
    plugins: {
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            yMin: doelwaardes,
            yMax: doelwaardes,
            borderColor: "black",
            borderWidth: 1,
            label: {
              enabled: true,
              content: `${doelwaardes}`,
            },
          },
        ],
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: false, // SET SCROLL ZOOM TO TRUE
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
  
  return (
    x &&
    <div className="verBar">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default BarChart;