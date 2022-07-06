import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { draw, generate } from 'patternomaly'
import React from 'react';
import { Bar } from 'react-chartjs-2';

import { GrossAnualChartView } from './GrossAnualChartView';
import ChartTitle from '../ChartTitle';

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
  miniature?: boolean | undefined,
  bruta?: boolean | undefined
}

export function GrossAnulChart({ title, subtitle, dataProps, label, dataset, barLabel, miniature, bruta }: SingleBarInterface) {
  function spacement(string) {
    let spaces = '⠀'
    let i=Math.abs(string)

    while (i <= 1) {
      i--
      spaces = spaces + `⠀`
    }

    return spaces
  }
  const options: object = {
    responsive: true,
    is3D: true,
    scales: {
      x: {
        font: {
          size: 20
        },
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
    series: {
      downsample: {
        threshold: 1000
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const percentage = (dataProps[ctx.dataIndex].econ_percentual*100).toFixed(0)+"%";
          const result = `${spacement(parseInt(value).toLocaleString('pt-br'))}${percentage}\n${parseInt(value).toLocaleString('pt-br')}`

          return value==null? null : result
        },
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        anchor: "end",
        offset: -60,
        align: "start",
        font: {
          size: !miniature? 22 : 10
        }
      },
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            size: 16
          }
        }
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  let labels: string[];
  if (bruta) {
    labels = label.map(value => value.replace('2021', 'até 2021'))
  } else {
    labels = label
  }

  const data: any = {
    labels,
    datasets: [
      {
        label: 'Estimado',
        data: [],
        backgroundColor: '#C2d5fb',
      },
      {
        label: dataset,
        data: dataProps.map((value, index) => {
          return parseFloat(value.economia_acumulada).toFixed(2)
        }),
        backgroundColor: (value, ctx) => {
          return dataProps[value.dataIndex]?.dad_estimado == false ? '#255488' : draw('diagonal-right-left', '#C2d5fb');
        },
      },
      {
        label: '',
        data: [dataProps[0]?.economia_acumulada?dataProps[0].economia_acumulada*1.1 : 1],
        backgroundColor: 'transparent',
        datalabels: {
          display: false
        }
      },
    ],
  }

  return (
    <GrossAnualChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar options={options} data={data} />
    </GrossAnualChartView>
  )
}
