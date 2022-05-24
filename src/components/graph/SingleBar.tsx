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
import { draw, generate } from 'patternomaly'

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
  month?: boolean | undefined,
  dataset1?: string,
}

export function SingleBar({ title, subtitle, dataProps, label, dataset, dataset1, barLabel, year, month }: SingleBarInterface) {
  const currentTime = new Date();

  const options: object = {
    responsive: true,
    series: {
      downsample: {
        threshold: 1000
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const percentage = (value*100 / sum).toFixed(0)+"%";
          const result = `${value}\n ${percentage}`

          console.log(value)

          return value==null? null : result
        },
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        anchor: "end",
        offset: -40,
        align: "start",
        font: {
          size: 16
        }
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
        data: dataProps.map((value, index) => {
          return year? label[index]<=currentTime.getFullYear().toString()? value : null : month? label.indexOf(label[index])>currentTime.getMonth()? null : value : null
        }),
        backgroundColor: (value, ctx) => {
          return year? label[value.dataIndex]<=currentTime.getFullYear().toString()? '#255488' : 'transparent' : month? label.indexOf(label[value.dataIndex])<=currentTime.getMonth()? '#255488' : 'transparent' : null// parseInt(label[value.dataIndex])<=currentTime.getMonth()? '#255488' : draw('diagonal', '#C2D5FB') : null
        },
      },
      {
        label: dataset1,
        data: dataProps.map((value, index) => {
          return year? label[index]>=currentTime.getFullYear().toString()? value : null : month? label.indexOf(label[index])<=currentTime.getMonth()? null : value : null
        }),
        backgroundColor: typeof window !== 'undefined'? draw('diagonal', '#C2D5FB') : null
      }
    ],
  }

  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar options={options} data={data} />
    </ChartView>
  )
}
