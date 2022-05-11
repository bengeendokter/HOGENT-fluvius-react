import React, {useEffect} from "react";
import {Bar, Chart} from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import {useData} from "../contexts/DataProvider";
import styles from "./BarChart/BarChart.module.css"
import {BloodtypeOutlined} from "@mui/icons-material";

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

const BarChart = ({naam, id}) =>
{
  const {data: x} = useData();

  if(x.length === 0)
  {
    return <></>
  }

  const labels = [""];
  const dataD = x.filter(d => d.naam === naam);
  const doelwaardes = dataD[0]['doelwaarde'];
  const eenheid = dataD[0]['eenheid'];

  const datas = dataD[0]['data'].map(d =>
  {
    //const kleur = `${ '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`;
    const kleur = "#055063";

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
        title: {display: true, text: `${eenheid}`, font: {size: 25, weight: 600, }},
        ticks: {
          font: {
            size: 25,
            family: 'vazir',
            weight: 600,
          }
        }

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
            borderColor: "orange",
            borderWidth: 5,
            label: {
              enabled: true,
              content: `${doelwaardes}`,
              font: {
                size: 25,
              }
            },
          },
        ],
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 25,
            weight: 600,
          },
        }
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
    x && dataD &&
    <div className={styles["barchart"]}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;