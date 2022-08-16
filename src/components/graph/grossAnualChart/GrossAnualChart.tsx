import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { draw } from 'patternomaly'
import React, { useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-plugin-style';

import { GrossAnualChartView } from './GrossAnualChartView';
import ChartTitle from '../ChartTitle';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
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

export function GrossAnualChart({ title, subtitle, dataProps, label, dataset, barLabel, miniature, bruta }: SingleBarInterface) {
  function spacement(string) {
    const spaces = string.length===1?'' : string.length===2? '' : string.length===3? ' ' : string.length===4? '  ' : string.length===5? '   ' : ''

    return spaces
  }

  const options: any = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature? window.innerWidth/90 : window.innerWidth/125
          }
        },
      },
      y: {
        stacked: false,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature? window.innerWidth/90 : window.innerWidth/125
          }
        },
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
          const result = `${spacement(parseInt(value).toLocaleString('pt-br'))}${percentage}\n${parseInt(value).toLocaleString('pt-br')}${spacement(parseInt(value).toLocaleString('pt-br'))}`

          return value==null? null : result
        },
        display: true,
        anchor: "end",
        offset: !miniature? 0 : -5,
        align: "start",
        font: {
          weight: 'bold',
          size: !miniature? window.innerWidth/80 : window.innerWidth/125,
        },
        color: (value) => {
          return value.dataset.label==='Consolidada'? '#fff' : '#255488'
        },
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

  const labels: string[] = label.filter(function(item, pos) {
      return label.indexOf(item) == pos;
  });
  //if (bruta) {
  //  labels = [`Até ${new Date().getFullYear()-1}`, `${new Date().getFullYear()}`]
  //} else {
  //  labels = label;
  //}

  const data: any = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: dataset,
        stacked: true,
        data: dataProps.filter(value => value.dad_estimado === false).map((value, index) => {
          return parseFloat(value.economia_acumulada)
        }),
        borderRadius: 10,
        backgroundColor: '#255488',
      },
      {
        type: 'bar',
        stacked: true,
        label: 'Estimado',
        spanGaps: true,
        data: [null].concat(dataProps.filter(value => value.dad_estimado === true).map((value, index) => {
          if (value.dad_estimado)
            return parseFloat(value.economia_acumulada)
          else 
            return 0
        })),
        borderRadius: 10,
        backgroundColor: draw('diagonal-right-left', '#C2d5fb'),
      },
    ],
  }

  return (
    <GrossAnualChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Chart options={options} data={data} type='bar' height={150}/>
    </GrossAnualChartView>
  )
}
