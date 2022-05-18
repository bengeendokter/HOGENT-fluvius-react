import React, {useContext, useEffect} from "react";
import {Bar, Chart} from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
//import {useData, getAllDataByDoelstellingId, alldata} from "../contexts/DataProvider";
import styles from "./BarChart/BarChart.module.css"
import {BloodtypeOutlined} from "@mui/icons-material";
import { DataContext } from '../contexts/DataProvider';

Chart.register(zoomPlugin);
Chart.register(annotationPlugin);

const BarChart = ({naam, id}) =>
{
  //const {data: x} = useData();
  const {data: x, getAllDataByDoelstellingId, alldata} = useContext(DataContext);

  useEffect(() => {
    if(x.length >= 1) {
      getAllDataByDoelstellingId(id);
    }
  }, []);

  //const labels = [""];
  const dataD = x.filter(d => d.naam === naam);
  //const doelwaardes = dataD[0]['doelwaarde'];
  const eenheid = dataD[0]['eenheid'];
  //const kleuren = ["#055063", "#05635f", "#056348", "#053963", "#0b7ad3"];
  const kleuren = ["#d30b7a", "#d3640b", "#0bd364", "#0bd364", "#640bd3"];
  const gebruikt = [];

  //label n keer opvullen met '' als lege array
  //dataset = bars en line met array van doelwaarden 
  let doels = [];

  //let omgekeerd = alldata.reverse();

  let datas = alldata.reverse().map(d =>
    {
      //const kleur = `${ '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`;
      let kleur = kleuren[Math.floor(Math.random()*kleuren.length)];
      let voorwaarde = gebruikt.includes(kleur);
      while (voorwaarde) {
        kleur = kleuren[Math.floor(Math.random()*kleuren.length)];
        voorwaarde = gebruikt.includes(kleur);
      }
      gebruikt.push(kleur);

      doels.push(d.doelwaarde);
  
      return {
        label: d.jaar,
        data: d.data[0],
        backgroundColor: kleur,
        hoverBackgroundColor: kleur,
        borderColor: kleur,
        borderWidth: 2,
      }
    }
  );

  datas.push({
    type: 'line',
    label: 'Doelwaarden/Drempelwaarden',
    data: doels,
    fill: false,
    borderColor: 'rgb(54, 162, 235)',
    lineTension: 0.5
  });
  
  const data = {
    //labels: alldata.map(e => {return ""}),
    labels: ["", "", ""],
    datasets: datas
  };

  return (
    x && alldata && dataD && <>
    <div className={styles["barchart"]}>
      {/*<Bar data={data}  />*/}
      {<Bar type='bar' data={data} />}

    </div>
    </>
    
  );
};

export default BarChart;