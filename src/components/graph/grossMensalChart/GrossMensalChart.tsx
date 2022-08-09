import React, { useEffect, useState } from 'react'

import { Bar, Line, Chart as ChartJs } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import document from 'next/document';

import { draw, generate } from 'patternomaly'

import { GrossMensalChartView } from './GrossMensalChartView';
import ChartTitle from '../ChartTitle';
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

  miniature?: boolean | undefined
}

export default function GrossMensalChart({ title, data1, data2, label, subtitle, miniature }: ChartInterface) {
  function spacement(string) {
    const spaces = string.length===1?'' : string.length===2? '' : string.length===3? ' ' : string.length===4? '  ' : string.length===5? '   ' : ''
    return spaces
  }

  const [lastDataS, setLastData] = useState('')
  useEffect(() => {
    let lastData = '0'
    let index=0
    while (index < data1.length) {
      data1[index].dad_estimado? lastData=data1[index].economia_acumulada : null
      index++
      setLastData(`economia acumulada: R$ ${parseFloat(lastData).toFixed(3)}`)
    }
  }, [data1])

  const options: any = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature? window.innerWidth/80 : window.innerWidth/100
          }
        },
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature? window.innerWidth/80 : window.innerWidth/100
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
          const percentage = data1[ctx.dataIndex]?.econ_percentual? (data1[ctx.dataIndex].econ_percentual*100).toFixed(0)+"%" : '';
          const result = `${spacement(parseInt(value+3).toLocaleString('pt-br'))}${parseInt(value)!=0? percentage : ''}\n${parseInt(value)!=0? parseInt(value).toLocaleString('pt-br') : ''}`

          return value==null? null : result
        },
        anchor: "end",
        offset: 0,
        align: "end",
        font: {
          size: !miniature? 18 : 10,
        }
      },
      legend: {
        position: 'bottom' as const,

      },
      title: {
        display: true,
        text: ''
      },
    },
  };

  const data: any = {
    labels: data1.map(value => value.mes),
    datasets: [
      {
        type: 'bar',
        label: 'Consolidado',
        data: data1.map(value => !value.dad_estimado? value?.economia_acumulada : null),
        borderRadius: 8,
        backgroundColor: '#255488',
        stack: '0'
      },
      {
        type: 'bar',
        label: 'Estimado',
        data: data2.map(value => value.dad_estimado? value?.economia_acumulada : null),
        borderRadius: 8,
        backgroundColor: draw('diagonal-right-left', '#C2d5fb'),
        stack: '0'
      },
    ],
  }

  return (
    <GrossMensalChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <ChartJs
        options={options}
        data={data} type={'bar'} height={'156'}/>
    </GrossMensalChartView>
  )
}
