import React, { useState, useEffect } from 'react'

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

  const options: any = {
    responsive: true,
    scales: {
      x: {
        // stacked: false,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature? window.innerWidth/90 : window.innerWidth/110
          }
        },
      },
      y: {
        stacked: false,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature? window.innerWidth/90 : window.innerWidth/110
          }
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: '#255488',
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const result = `${parseFloat((parseFloat(value)).toLocaleString('pt-br'))}`

          return value==null? null : result
        },
        anchor: "end",
        align: "end",
        font: {
          weight: 'bold',
          size: !miniature? window.innerWidth/80 : window.innerWidth/105
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

  const data = {
    labels,
    datasets: [
      {
        label: '2021',
        data: data1?.map(value => value.custo_unit>0? value.custo_unit : null),
        borderRadius: 8,
        datalabels: {
          backgroundColor: 'white',
          borderRadius: 8,
          opacity: .8,
          offset: -5
        },
        backgroundColor: (value, ctx) => {
          if (value.dad_estimado)
            return draw('diagonal-right-left', '#C2d5fb');
          else
            return '#C2d5fb'
        },
        stack: '0'
      },
      {
        label: '2022',
        data: data2?.map(value => value.custo_unit>0? value.custo_unit : null),
        borderRadius: 8,
        backgroundColor: (value, ctx) => {
          if (value.dad_estimado)
            return draw('diagonal-right-left', '#255488');
          else
            return '#255488'
        },
        stack: '0'
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
