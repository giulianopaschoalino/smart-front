import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartView } from './ChartView';
import ChartTitle from './ChartTitle';
import { draw } from 'patternomaly'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface SingleBarInterface{
  title: string,
  subtitle: string,
  dataProps: Array<number>,
  label: Array<string>,
  dataset: string,
  barLabel?: boolean | undefined,
  year?: boolean | undefined,
  day?: boolean | undefined,
  dataset1?: string,
}

export function SingleBar({ title, subtitle, dataProps, label, dataset, dataset1, barLabel, year, day }: SingleBarInterface) {

  const currentTime = new Date();

  const options: object = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const percentage = (value*100 / sum).toFixed(2)+"%";
          const result = `  ${value}\n ${percentage}`
          return result;
        },
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        anchor: "end",
        offset: -35,
        align: "start"
      },
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  const labels = label;

  const data: any = {
    labels,
    datasets: [
      {
        label: dataset,
        data: dataProps.map(value => value),
        backgroundColor: (value, ctx) => {
          return year? label[value.dataIndex]<=currentTime.getFullYear().toString()? '#255488' : '#C2D5FB' : day? parseInt(label[value.dataIndex])<=currentTime.getDay()? '#255488' : '#C2D5FB' : null
        },
      },
      {
        label: dataset1,
        backgroundColor: '#C2D5FB'
      }
    ],
  };
  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar options={options} data={data} />
      {/* <Bar options={options} data={data} /> */}
    </ChartView>
  )
}
