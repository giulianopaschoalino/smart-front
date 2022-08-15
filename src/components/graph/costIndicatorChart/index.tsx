import React from 'react'

import { draw } from 'patternomaly'

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { CostIndicatorChartView } from './CostIndicatorChartView';
import ChartTitle from '../ChartTitle';
import { config } from '../config';

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
  label: any,
  miniature?: boolean | undefined
}

export default function CostIndicatorChart({ title, data1, data2, label, subtitle, miniature }: ChartInterface) {

  const labels = label;

  const options: any = config(miniature)

  console.log(data1)
  console.log(data2)

  const data = {
    labels,
    datasets: [
      {
        label: '2021',
        data: data1?.map(value => value),
        skipNull: data2?.map(value => value)?.includes(null),
        borderRadius: 8,
        datalabels: {
          backgroundColor: 'white',
          borderRadius: 8,
          opacity: .8,
          offset: -5
        },
        backgroundColor: (value, ctx) => {
          if (value?.dad_estimado)
            return draw('diagonal-right-left', '#C2d5fb');
          else
            return '#C2d5fb'
        },
      },
      {
        label: '2022',
        data: data2?.map(value => value),
        skipNull: data1?.map(value => value)?.includes(null),
        borderRadius: 8,
        backgroundColor: (value, ctx) => {
          if (value?.dad_estimado)
            return draw('diagonal-right-left', '#255488');
          else
            return '#255488'
        },
      }
    ],
  }

  return (
    <CostIndicatorChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar
        options={options}
        data={data}
      />
    </CostIndicatorChartView>
  )
}
