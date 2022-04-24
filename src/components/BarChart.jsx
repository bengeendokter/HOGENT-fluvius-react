import React, { useEffect } from "react";
import { Bar, Chart } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import { useData } from "../contexts/DataProvider";

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

//max y meer dan hoogste waarde
//even of oneven verschillende kleuren geven
//datasets mappen voor alle jaren

const BarChart = ({naam, id}) => {
  console.log("doelstelling met id", id);
  console.log("doelstelling met naam", naam);
  const {data: x} = useData();


  /*useEffect(() =>
  {
    veranderID(id);
    getAllDataByDoelstellingId();
  }, [veranderID,getAllDataByDoelstellingId, id]);*/

  //const {doelstellingenData, doelstellingId } = useData();
  //console.log("--doelstelling met id", doelstellingId);




  const labels = [""];
  const doelwaarde = id;

  //neem alle data van een doelstelling
  const dataD = x.filter(d => d.name === naam);

  console.log("met id", id)
  console.log("data is", dataD);

  const datas = dataD.map(d =>  {
    
    let teller = 1;
    const kleur = `red`;
    return {
      label: `${d.name}${teller++}`,
      data: labels.map(() => d.value),
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
      },
    },
    plugins: {
      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "y-axis-0",
            yMin: doelwaarde,
            yMax: doelwaarde,
            borderColor: "black",
            borderWidth: 1,
            label: {
              enabled: true,
              content: `${doelwaarde}`,
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
  
  return (
    <div className="verBar">
      <Bar data={data} options={options}/>
    </div>
  );
};

export default BarChart;