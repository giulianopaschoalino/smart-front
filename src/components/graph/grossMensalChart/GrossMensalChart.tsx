import React, { useEffect, useState } from 'react'

import { Bar, Line, Chart as ChartJs } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import document from 'next/document'

import { draw, generate } from 'patternomaly'

import { GrossMensalChartView } from './GrossMensalChartView'
import ChartTitle from '../ChartTitle'
import { config } from '../config'
// import { data } from './LineBarChart';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartInterface {
  title: string
  subtitle: string

  data1: any
  data2: any

  single?: any
  label: any

  miniature?: boolean | undefined
}

export default function GrossMensalChart({
  title,
  data1,
  data2,
  label,
  subtitle,
  miniature
}: ChartInterface) {
  function spacement(string) {
    const spaces =
      string.length === 1
        ? ''
        : string.length === 2
        ? ''
        : string.length === 3
        ? ' '
        : string.length === 4
        ? '  '
        : string.length === 5
        ? '   '
        : ''
    return spaces
  }

  const [lastDataS, setLastData] = useState('')
  useEffect(() => {
    let lastData = '0'
    let index = 0
    while (index < data1.length) {
      data1[index].dad_estimado
        ? (lastData = data1[index].economia_acumulada)
        : null
      index++
      setLastData(
        `economia acumulada: R$ ${parseFloat(lastData).toLocaleString('pt-br', {
          minimumFractionDigits: 2
        })}`
      )
    }
  }, [data1])

  const options: any = {
    responsive: true,
    scales: {
      x: {
        stacked: false,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature ? window.innerWidth / 90 : window.innerWidth / 125
          }
        }
      },
      y: {
        stacked: false,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature ? window.innerWidth / 90 : window.innerWidth / 125
          }
        }
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: '#255488',
        formatter: (value, ctx) => {
          let sum = 0
          const dataArr = ctx.chart.data.datasets[0].data
          const percentage =
            (data1[ctx?.dataIndex]?.econ_percentual * 100).toFixed(0) + '%'

          console.log(percentage)
          dataArr.map((data) => {
            sum += data
          })
          const result = `${percentage}\n${parseFloat(
            parseFloat(value).toLocaleString('pt-br')
          )}`

          return value == null ? null : result
        },
        anchor: 'end',
        align: 'end',
        font: {
          weight: 'bold',
          size: !miniature ? window.innerWidth / 80 : window.innerWidth / 125
        }
      },
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: ''
      }
    }
  }

  const data: any = {
    labels: label,
    datasets: [
      {
        type: 'bar',
        label: 'Consolidado',
        data: data1.map((value) =>
          !value.dad_estimado ? value?.economia_acumulada : null
        ),
        skipNull: true,
        borderRadius: 8,
        backgroundColor: '#255488',
        stack: '0'
      },
      {
        type: 'bar',
        label: 'Estimado',
        data: data2.map((value) =>
          value.dad_estimado ? value?.economia_acumulada : null
        ),
        skipNull: true,
        borderRadius: 8,
        backgroundColor: draw('diagonal-right-left', '#C2d5fb'),
        stack: '0'
      }
    ]
  }

  return (
    <GrossMensalChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <ChartJs options={options} data={data} type={'bar'} height={'156'} />
    </GrossMensalChartView>
  )
}
