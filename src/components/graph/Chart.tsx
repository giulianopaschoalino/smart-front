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
  barLabel?: boolean | undefined
}

export default function Chart({ title, data1, data2, label, subtitle, dataset1, dataset2, barLabel }: ChartInterface) {

  const labels = label;

  const options: any = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: (value, ctx) => {
          console.log(value)
          return value.dataset.label==='2021'? 'black' : 'white'
        },
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const result = `${parseFloat(value).toLocaleString('pt-br')}`

          return value==null? null : result
        },
        anchor: "start",
        offset: 20,
        align: "end",
        rotation: -90,
        font: {
          size: 14,
          weight: 800
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
        data: data1.map(value => value.custo_unit? value.custo_unit : 0),
        backgroundColor: '#C2D5FB',
      },
      data2?
      {
        label: dataset2? dataset2 : '2022',
        data: data2.map(value => value.custo_unit? value.custo_unit : 0),
        backgroundColor: '#255488',
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
