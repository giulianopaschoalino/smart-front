import { useState, useEffect } from 'react'

import { Bar, Line } from 'react-chartjs-2';

import { ChartView } from './ChartView';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterDataPoint,
} from 'chart.js';
import ChartTitle from './ChartTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface ChartInterface {
  title: string,
  subtitle: string,
  data1: any,
  label: any,
  dataset1?: string,

  barLabel?: boolean | undefined
}

export default function DiscretizedConsumptionChartLine({ title, subtitle, data1, label, dataset1, barLabel }: ChartInterface) {
  const options: any = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        formatter: Math.round,
        anchor: "end",
        offset: -20,
        align: "start",
        font: {
          size: 12
        }
      },
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  const labels = label;

  const data = {
    labels: labels.map((value, index) => `${value} - ${data1[index].day_formatted}`),
    datasets: [
      {
        label: dataset1,
        borderRadius: 8,
        data: data1.map(value => value.reativa),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0)',
      },
      {
        label: 'base',
        data: data1.map(value => 500),
        borderRadius: 8,
        borderColor: 'rgb(0, 0, 0)',
        fill: false,
        backgroundColor: 'rgba(255, 145, 0, 0)' ,
        pointBorderColor: 'rgba(255, 145, 0, 0)',
      },
      {
        label: 'tolerância',
        data: data1.map(value => 525),
        borderRadius: 8,
        borderColor: 'rgb(255, 0, 0)',
        fill: false,
        backgroundColor: 'rgba(255, 145, 0, 0)' ,
        pointBorderColor: 'rgba(255, 145, 0, 0)',
      },
    ],
  }

  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Line options={options} data={data} />
    </ChartView>
  )
}
