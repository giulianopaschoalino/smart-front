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

export default function LineChart({ title, subtitle, data1, data2, data3, data4, label, dataset1, dataset2, dataset3, dataset4, barLabel }: ChartInterface) {
  const options: any = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 16
          }
        },
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 16
          }
        },
      },
    },
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

  const data = dataset4? {
    labels,
    datasets: [
      {
        label: dataset1? dataset1 : 'Dataset 1',
        data: data1.map(value => value.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: dataset2? dataset2 : '',
        data: data2.map(value => value.value),
        borderColor: 'rgb(255, 114, 32)' ,
        backgroundColor: 'rgba(255, 145, 0, 0.5)' ,
      },
      {
        label: dataset3? dataset3 : '',
        data: data3.map(value => value.value),
        borderColor: 'rgb(109, 109, 109)' ,
        backgroundColor: 'rgba(90, 90, 90, 0.5)',
      },
      {
        label: dataset4? dataset4 : '',
        data: data4.map(value => value.value),
        borderColor: 'rgb(255, 166, 0)',
        backgroundColor: 'rgba(255, 187, 0, 0.5)',
      },
    ],
  } : dataset3? {
    labels,
    datasets: [
      {
        label: dataset1? dataset1 : 'Dataset 1',
        data: data1.map(value => value.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: dataset2? dataset2 : '',
        data: data2.map(value => value.value),
        borderColor: 'rgb(255, 114, 32)' ,
        backgroundColor: 'rgba(255, 145, 0, 0.5)' ,
      },
      {
        label: dataset3? dataset3 : '',
        data: data3.map(value => value.value),
        borderColor: 'rgb(109, 109, 109)' ,
        backgroundColor: 'rgba(90, 90, 90, 0)',
      },
    ],
  } : dataset2? {
    labels,
    datasets: [
      {
        label: dataset1? dataset1 : 'Dataset 1',
        data: data1.map(value => value.value),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0)',
      },
      {
        label: dataset2? dataset2 : '',
        data: data2.map(value => value.value),
        borderColor: 'rgb(255, 114, 32)' ,
        backgroundColor: 'rgba(255, 145, 0, 0)' ,
      },
    ],
  } : {
    labels,
    datasets: [
      {
        label: dataset1? dataset1 : 'Dataset 1',
        data: data1.map(value => value.value),
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
