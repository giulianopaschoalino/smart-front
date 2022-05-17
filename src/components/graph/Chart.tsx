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
import ChartTitle from './ChartTitle';
import { data } from './LineBarChart';

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
  subtitle: string,
  data1: any,
  data2: any,
  single?: any
  label: any
}

export default function Chart({ title, data1, data2, label, subtitle }: ChartInterface) {

  const labels = label;

  const data = {
    labels,
    datasets: [
      {
        label: '2020',
        data: data1.map(value => value),
        backgroundColor: '#C2D5FB',
      },
      {
        label: '2021',
        data: data2.map(value => value),
        backgroundColor: '#255488',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };


  return (
    <ChartView>
      {/* <RenderIf isTrue={single? true : false} >
        <Bar
          options={options}
          data={graphData}
        />
      </RenderIf> */}
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar
        options={options}
        data={data}
      />
    </ChartView>
  )
}
