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
  data: any
}

export default function LineChart({ title, data }: ChartInterface) {
  // const [ graphData, setGraphData ] = useState({
  //   labels: [],
  //   datasets: [],
  // })
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'bottom' as const,
  //     },
  //     title: {
  //       display: true,
  //       text: title,
  //     },
  //   },
  // };

  // const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'ago', 'set', 'out', 'nov', 'dez'];

  // useEffect(() => {
  //   setGraphData({
  //     labels,
  //     datasets: [
  //       {
  //         label: '2020',
  //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1200 })),
  //         backgroundColor: '#C2D5FB',
  //       },
  //       {
  //         label: '2021',
  //         data: labels.map(() => faker.datatype.number({ min: 0, max: 1200 })),
  //         backgroundColor: '#255488',
  //       },
  //     ],
  //   })
  // }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8',];

  // const data = {
  //   labels,
  //   datasets: [
  //     // {
  //     //   label: 'Dataset 1',
  //     //   data: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  //     //   borderColor: 'rgb(53, 162, 235)',
  //     //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     // },
  //     // {
  //     //   label: 'Dataset 2',
  //     //   data: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  //     //   borderColor: 'rgb(255, 114, 32)',
  //     //   backgroundColor: 'rgba(255, 145, 0, 0.5)',
  //     // },
  //     {
  //       label: 'Dataset 3',
  //       data: [1, 2, 3, 5, 7, 8, 9, 8, 9, 7, 8, 6, 4, 3, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 9, 10, 11, 12, 12, 14, 15, 17, 20, 21, 18, 15, 14, 12, 11, 10, 8, 6, 7, 8, 7, 9],
  //       borderColor: 'rgb(109, 109, 109)',
  //       backgroundColor: 'rgba(90, 90, 90, 0.5)',
  //     },
  //     // {
  //     //   label: 'Dataset4',
  //     //   data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //     //   borderColor: 'rgb(255, 166, 0)',
  //     //   backgroundColor: 'rgba(255, 187, 0, 0.5)',
  //     // },
  //   ],
  // };

  return (
    <ChartView>
      <Line options={options} data={data} />
    </ChartView>
  )
}
