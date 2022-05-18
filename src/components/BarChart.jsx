import React, {useContext, useEffect, useState} from "react";
import {Bar, Chart} from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
//import {useData, getAllDataByDoelstellingId, alldata} from "../contexts/DataProvider";
import styles from "./BarChart/BarChart.module.css"
import {BloodtypeOutlined} from "@mui/icons-material";
import { DataContext } from '../contexts/DataProvider';
import { useParams } from "react-router-dom";

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

const BarChart = ({naam, id}) =>
{
  const { id: ID} = useParams();

  //const {data: x} = useData();
  const {data: x, getAllDataByDoelstellingId, alldata} = useContext(DataContext);

  useEffect(() => {
    if(x.length >= 1) {
      getAllDataByDoelstellingId(ID);
    }
  }, []);

  let dataLabels = [];  //jaar
  let dataWaarden = []; //data.value
  let dataKleuren = []; //willekeurig kleur

  const dataD = x.filter(d => d.naam === naam);
  //const doelwaardes = dataD[0]['doelwaarde'];
  const eenheid = dataD[0]['eenheid'];
  //const kleuren = ["#055063", "#05635f", "#056348", "#053963", "#0b7ad3"];
  const kleuren = ["#d30b7a", "#d3640b", "#0bd364", "#0bd364", "#640bd3"];
  const gebruikt = [];

  let doels = [];

  //alldata.sort((a,b) => a.jaar - b.jaar);
  alldata.reverse().map(d =>
    {
      let kleur = kleuren[Math.floor(Math.random()*kleuren.length)];
      let voorwaarde = gebruikt.includes(kleur);
      while (voorwaarde) {
        kleur = kleuren[Math.floor(Math.random()*kleuren.length)];
        voorwaarde = gebruikt.includes(kleur);
      }
      gebruikt.push(kleur);

      doels.push(d.doelwaarde);

      dataLabels.push(d.jaar);
      dataWaarden.push(d.data[0].value);
      dataKleuren.push(kleur);
    }
  ); 

  let data = {
    labels: dataLabels,
    datasets: [{
      order: 1,
      type: 'bar',
      label: ['Waarden'],
      data: dataWaarden,
      borderColor: dataKleuren,
      backgroundColor: dataKleuren,
      borderWidth: 2
    }]
  }

  if (alldata.length !== 1) {
    data.datasets.push({
      order: 0,
      type: 'line',
      label: 'Doel/Drempel',
      data: doels,
      fill: false,
      borderColor: "orange",
      lineTension: 0.5
    });
  } 

  let op = {};

  if (alldata.length === 1) { 
    op = {
      type: "line",
      mode: "horizontal",
      scaleID: "y-axis-0",
      yMin: doels[0],
      yMax: doels[0],
      borderColor: "orange",
      borderWidth: 5,
      label: {
        enabled: true,
        content: `${doels[0]}`,
        font: {
          size: 25,
        }
      },
    }
  } else {
    op = {};
  }

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
          op
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
      /*zoom: {
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
      },*/
    },
  };
  
  return (
    x && alldata && dataD && <>
    <div className={styles["barchart"]}>
      {<Bar data={data} options={options}/> }
    </div>
    </>
    
  );
};

export default BarChart;