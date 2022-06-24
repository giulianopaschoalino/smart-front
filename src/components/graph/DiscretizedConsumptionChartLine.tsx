import React, { useState, useEffect } from 'react'

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
  data2?: any,
  data3?: any,
  data4?: any,
  label: any,
  dataset1?: string,
  dataset2?: string,
  dataset3?: string,
  dataset4?: string,
  barLabel?: boolean | undefined
}

export default function DiscretizedConsumptionChartLine({ title, subtitle, data1, data2, data3, data4, label, dataset1, dataset2, dataset3, dataset4, barLabel }: ChartInterface) {
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
    labels,
    datasets: [
      {
        label: dataset1,
        data: data1.map(value => value.reativa),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0)',
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
