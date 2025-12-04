import { useState, useEffect } from 'react'

import { Bar, Line } from 'react-chartjs-2';

import { ChartView } from './ChartView';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ScatterDataPoint,
} from 'chart.js';
import ChartTitle from './ChartTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface ChartInterface {
  title: string,
  subtitle: string,
  data1: any,
  data2?: any,
  data3?: any,
  data4?: any,
  label: any,
  dataset1?: string,
  dataset2?: string,
  dataset3?: string,
  dataset4?: string,
  barLabel?: boolean | undefined
}

export default function FatorPotenciaChart({ title, subtitle, data1, data2, label, dataset1, dataset2, dataset3, dataset4, barLabel }: ChartInterface) {
  const referenceValue = 0.92;

  // Gera cores dos pontos: amarelo se abaixo da referência, cor padrão caso contrário
  const getPointColors = (dataArray: any[], fieldName: string) => {
    return dataArray.map((value) => {
      const fpValue = value[fieldName];
      return (fpValue !== null && fpValue !== undefined && fpValue < referenceValue) ? 'rgba(255, 193, 7, 1)' : 'rgba(0, 0, 0, 0)';
    });
  };

  const inducivePointColors = getPointColors(data1, 'fp_indutivo');
  const capacitivePointColors = getPointColors(data1, 'fp_capacitivo');

  const options: any = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: window.innerWidth/80
          }
        },
      },
      y: {
        max: 1,
        min: 0,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: window.innerWidth/80
          }
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        formatter: Math.round,
        anchor: "end",
        offset: -20,
        align: "start",
        font: {
          size: 12
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

  const labels = label;

  const data = {
    labels,
    datasets: [
      {
        label: 'FP Indutivo',
        data: data1.map(value => value.fp_indutivo),
        borderColor: '#254f7f',
        backgroundColor: 'rgba(231, 153, 47, 0)',
        pointBackgroundColor: inducivePointColors,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'FP Capacitivo',
        data: data1.map(value => value.fp_capacitivo),
        borderColor: '#e7992f',
        backgroundColor: 'rgba(37, 79, 127, 0)',
        pointBackgroundColor: capacitivePointColors,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: dataset2? dataset2 : 'Fator ref',
        data: data2.map(value => value.f_ref),
        borderColor: 'rgb(0, 0, 0)' ,
        fill: false,
        borderDash: [5, 5],
        backgroundColor: 'rgba(255, 145, 0, 0)' ,
        pointBorderColor: 'rgba(255, 145, 0, 0)',
        pointRadius: 0,
      },
    ],
  }

  return (
    <ChartView>
      {/* <ChartTitle title={title} subtitle={subtitle} /> */}
      <div style={{width: '90%'}}>
        <Line options={options} data={data} />
      </div>
    </ChartView>
  )
}
