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
// import { data } from './LineBarChart';

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
  dataset1?: string,
  dataset2?: string,
  miniature?: boolean | undefined
}

export default function Chart({ title, data1, data2, label, subtitle, dataset1, dataset2, miniature }: ChartInterface) {

  const labels = label;

  const options: any = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: (value, ctx) => {
          return 'black'
        },
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const percentage = (data1[ctx.dataIndex].econ_percentual*100).toFixed(0)+"%";
          const result = `  ${parseInt(value)!=0? parseInt(value).toLocaleString('pt-br') : ''}\n    ${parseInt(value)!=0? percentage : ''}`

          return value==null? null : result
        },
        anchor: "end",
        offset: 0,
        align: "end",
        font: {
          size: !miniature? 15 : 10,
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
        label: dataset1? dataset1 : '2021',
        data: data1.map(value => value.economia_acumulada? value.economia_acumulada : 0),
        backgroundColor: '#255488',
      },
      data2?
      {
        label: dataset2? dataset2 : '2022',
        data: data2.map(value => value.economia_acumulada? value.economia_acumulada : 0),
        backgroundColor: '#C2D5FB',
      } : null
    ],
  }

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
