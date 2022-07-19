import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { draw, generate } from 'patternomaly'
import React from 'react';
import { Bar, Chart } from 'react-chartjs-2';
// import Chart from './Chart';

import ChartTitle from './ChartTitle';
import { ChartView } from './ChartView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface SingleBarInterface{
  title: string,
  subtitle: string,
  dataProps: any,
  label: Array<string>,
  dataset: string,
  barLabel?: boolean | undefined,
  year?: boolean | undefined,
  month?: boolean | undefined,
  dataset1?: string,
}

export function DiscretizedConsumptionChart({ title, subtitle, dataProps, label, dataset, barLabel, year, month }: SingleBarInterface) {

  const labels = label

  const options: any = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          display: false
        }
      },
    },
    plugins: {
      datalabels: {
        display: false,
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

  const data: any = {
    labels: dataProps.map(value => value.day_formatted),
    datasets: [
      {
        type: 'line' as const,
        label: 'reativa',
        borderColor: '#F00' ,
        fill: false,
        borderDash: [5, 5],
        backgroundColor: 'rgba(255, 145, 0, 0)' ,
        pointBorderColor: 'rgba(255, 145, 0, 0)',
        data: dataProps.map(value => value.reativa),
      },
      {
        type: 'bar' as const,
        label: 'consumo',
        backgroundColor: '#74acec',
        data: dataProps.map(value => value.consumo),
      },
      // {
      //   type: 'line' as const,
      //   label: 'Livre',
      //   // backgroundColor: '#255488',
      //   backgroundColor: (value, ctx) => {
      //     return '#255488'
      //   },
      //   data: dataProps.map(value => {
      //     return parseInt(value.custo_livre)
      //   }),
      // },
    ],
  }

  return (
    <ChartView>
      {/* <ChartTitle title={title} subtitle={subtitle}/> */}
      <div>
        <Chart type='bar' options={options} data={data} />
      </div>
    </ChartView>
  )
}
