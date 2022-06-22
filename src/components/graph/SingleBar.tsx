import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { draw, generate } from 'patternomaly'
import React from 'react';
import { Bar } from 'react-chartjs-2';

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

export function SingleBar({ title, subtitle, dataProps, label, dataset, dataset1, barLabel, year, month }: SingleBarInterface) {
  const currentTime = new Date();

  const options: object = {
    responsive: true,
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
          const result = `${parseFloat(value).toFixed(0)}\n    ${percentage}`

          return value==null? null : result
        },
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        anchor: "end",
        offset: -40,
        align: "start",
        font: {
          size: 10
        }
      },
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
        text: '',
      },
    },
  };

  const labels = label;

  const data: any = {
    labels,
    datasets: [
      {
        label: dataset,
        data: dataProps.map((value, index) => {
          return parseFloat(value.economia_acumulada).toFixed(2)
        }),
        backgroundColor: (value, ctx) => {
          return dataProps[value.dataIndex].dad_estimado == false ? '#255488' : '#C2d5fb'
        },
      },

    ],
  }

  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar options={options} data={data} />
    </ChartView>
  )
}
