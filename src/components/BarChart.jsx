import annotationPlugin from "chartjs-plugin-annotation";
import zoomPlugin from "chartjs-plugin-zoom";
import React, {useContext, useEffect} from "react";
import {Bar, Chart} from "react-chartjs-2";
import {useParams} from "react-router-dom";
import {DataContext} from '../contexts/DataProvider';
import styles from "./BarChart/BarChart.module.css";

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

const BarChart = ({naam, id}) =>
{
  const {id: ID} = useParams();

  const {data: x, getAllDataByDoelstellingId, alldata} = useContext(DataContext);
  useEffect(() =>
  {
    if(x.length >= 1)
    {
      getAllDataByDoelstellingId(ID);
    }
  }, [ID, getAllDataByDoelstellingId, x.length]);

  let dataLabels = [];  //jaar
  let dataWaarden = []; //data.value
  let dataKleuren = []; //willekeurig kleur

  const dataD = x.filter(d => d.naam === naam);

  const eenheid = dataD[0]['eenheid'];

  const kleuren = ["#d30b7a", "#d3640b", "#0bd364", "#0bd364", "#640bd3", "#c95df7", "#f75d8b", "#8bf75d", "#5df7c9", "#5d8bf7"];
  const gebruikt = [];

  let doels = [];


  alldata.reverse().map(d =>
  {
    let kleur = kleuren[Math.floor(Math.random() * kleuren.length)];
    let voorwaarde = gebruikt.includes(kleur);
    while(voorwaarde)
    {
      kleur = kleuren[Math.floor(Math.random() * kleuren.length)];
      voorwaarde = gebruikt.includes(kleur);
    }
    gebruikt.push(kleur);

    doels.push(d.doelwaarde);

    dataLabels.push(d.jaar);
    dataWaarden.push(d.data[0].value);
    dataKleuren.push(kleur);
    return true;
  }
  );

  let data = {
    labels: dataLabels,
    datasets: [{
      order: 1,
      type: 'bar',
      label: 'Waarden',
      data: dataWaarden,
      borderColor: dataKleuren,
      backgroundColor: dataKleuren,
    }],
  };

  if(alldata.length !== 1)
  {
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

  let optionAnnotations = [];

  if(alldata.length === 1)
  {
    optionAnnotations.push({
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
    });
  }

  const options = {
    scales: {
      y: {
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
        annotations: optionAnnotations
      },
      legend: {
        display: true,
        labels: {
          font: {
            size: 25,
            weight: 600,
          },
          filter: item =>
          {
            return item.text !== "Waarden"
          }
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
    x && alldata && dataD && <>
      <div className={styles["barchart"]}>
        {<Bar data={data} options={options} />}
      </div>
    </>

  );
};

export default BarChart;