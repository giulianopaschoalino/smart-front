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
import RenderIf from '../../utils/renderIf';

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
  data?: any,
  single?: any
}

export default function Chart({ title, single, data }: ChartInterface) {
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
          backgroundColor: '#C2D5FB',
        },
        {
          label: '2021',
          data: labels.map(() => faker.datatype.number({ min: 0, max: 1200 })),
          backgroundColor: '#255488',
        },
      ],
    })
  }, [])


  return (
    <ChartView>
      <RenderIf isTrue={single? true : false} >
        <Bar
          options={options}
          data={graphData}
        />
      </RenderIf>
      <Bar
        options={options}
        data={graphData}
      />
    </ChartView>
  )
}
