import React, { useState, useEffect } from 'react'

import { Bar, Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
//   registerables
// } from 'chart.js'

// import Chart from 'chart.js/auto'

// import faker from 'faker'
import { ChartView } from './ChartView';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
// )

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
// import { Line } from 'react-chartjs-2';
import faker from 'faker';
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
  dataset1: string,
  dataset2: string,
  dataset3: string,
  dataset4: string
}

export default function LineChart({ title, subtitle, data1, data2, data3, data4, label, dataset1, dataset2, dataset3, dataset4 }: ChartInterface) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
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
        label: dataset1? dataset1 : 'Dataset 1',
        data: data1.map(value => value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: dataset2? dataset2 : 'Dataset 2',
        data: data2.map(value => value),
        borderColor: 'rgb(255, 114, 32)',
        backgroundColor: 'rgba(255, 145, 0, 0.5)',
      },
      {
        label: dataset3? dataset3 : 'Dataset 3',
        data: data3.map(value => value),
        borderColor: 'rgb(109, 109, 109)',
        backgroundColor: 'rgba(90, 90, 90, 0.5)',
      },
      {
        label: dataset4? dataset4 : 'Dataset4',
        data: data4.map(value => value),
        borderColor: 'rgb(255, 166, 0)',
        backgroundColor: 'rgba(255, 187, 0, 0.5)',
      },
    ],
  };

  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Line options={options} data={data} />
    </ChartView>
  )
}
