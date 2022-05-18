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
import { ChartView } from './ChartView';
import ChartTitle from './ChartTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SingleBarInterface{
  title: string,
  subtitle: string,
  dataProps: any,
  label: any,
  dataset: string
}

export function SingleBar({ title, subtitle, dataProps, label, dataset }: SingleBarInterface) {
  const options = {
    responsive: true,
    plugins: {
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
    </ChartView>
  )
}
