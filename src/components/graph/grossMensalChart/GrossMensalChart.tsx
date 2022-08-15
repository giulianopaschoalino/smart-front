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
import { config } from '../config';
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

  const options: any = config(miniature)

  const data: any = {
    labels: label,
    datasets: [
      {
        type: 'bar',
        label: 'Consolidado',
        data: data1.map(value => !value.dad_estimado? value?.economia_acumulada : null),
        skipNull: true,
        borderRadius: 8,
        backgroundColor: '#255488',
        stack: '0'
      },
      {
        type: 'bar',
        label: 'Estimado',
        data: data2.map(value => value.dad_estimado? value?.economia_acumulada : null),
        skipNull: true,
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
