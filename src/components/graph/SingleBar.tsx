import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartView } from './ChartView';
import ChartTitle from './ChartTitle';

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
  label: any,
  dataset: string,
  barLabel?: boolean | undefined,
}

export function SingleBar({ title, subtitle, dataProps, label, dataset, barLabel }: SingleBarInterface) {

  const options: any = {
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        formatter: Math.round,
        anchor: "end",
        offset: -20,
        align: "start"
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
        label: dataset,
        data: dataProps.map(value => value),
        backgroundColor: '#255488',
      },
    ],
  };
  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar options={options} data={data} />
      {/* <Bar options={options} data={data} /> */}
    </ChartView>
  )
}
