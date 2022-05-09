import React, { useState, useEffect } from 'react'

import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import faker from 'faker'
import { ChartView } from './ChartView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ChartInterface {
  title: string,
}

export default function Chart({ title }: ChartInterface) {
  const [ graphData, setGraphData ] = useState({
    labels: [],
    datasets: [],
  })
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'ago', 'set', 'out', 'nov', 'dez'];

  useEffect(() => {
    setGraphData({
      labels,
      datasets: [
        {
          label: '2020',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1200 })),
          backgroundColor: 'rgba(53, 162, 235, 5)',
        },
        {
          label: '2021',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1200 })),
          backgroundColor: 'rgba(0, 81, 255, 1)',
        },
      ],
    })
  }, [])


  return (
    <ChartView>
      <Bar
        options={options}
        data={graphData}
      />
    </ChartView>
  )
}
