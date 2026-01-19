import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-style';
import { draw } from 'patternomaly';
import { Chart } from 'react-chartjs-2';

import { GrossAnualChartView } from './GrossAnualChartView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

interface SingleBarInterface {
  title: string,
  subtitle: string,
  dataProps: any,
  label: Array<string>,
  dataset: string,
  barLabel?: boolean | undefined,
  miniature?: boolean | undefined,
  bruta?: boolean | undefined
}

export function GrossAnualChart({ title, subtitle, dataProps = [], label, dataset, barLabel, miniature, bruta }: SingleBarInterface) {
  function spacement(string) {
    const spaces = string.length === 1 ? '' : string.length === 2 ? '' : string.length === 3 ? ' ' : string.length === 4 ? '  ' : string.length === 5 ? '   ' : ''

    return spaces
  }

  const options: any = {
    responsive: true,
    // maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature ? window.innerWidth / 90 : window.innerWidth / 125
          }
        },
      },
      y: {
        stacked: true,
        //max: Number.parseInt(dataProps.reduce((prev, current) => prev.economia_acumulada < current.economia_acumulada ? prev.economia_acumulada : current.economia_acumulada, 0)) + 350,
        min: 0,
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: !miniature ? window.innerWidth / 90 : window.innerWidth / 125
          }
        },
      },
    },
    axisY: {

    },
    series: {
      downsample: {
        threshold: 1000
      }
    },
    plugins: {
      datalabels: {
        display: true,
        color: '#255488',
        clip: false,
        formatter: (value, ctx) => {
          const percentage = (dataProps[ctx.dataIndex]?.econ_percentual * 100).toFixed(0) + "%";
          const result = `${spacement(parseInt(value).toLocaleString('pt-br'))}${percentage}\n${parseInt(value).toLocaleString('pt-br')}${spacement(parseInt(value).toLocaleString('pt-br'))}`

          return value == null ? null : result
        },
        anchor: 'end',
        align: 'end',
        offset: 5,
        font: {
          weight: 'bold',
          size: !miniature ? window.innerWidth / 80 : window.innerWidth / 125,
        },
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

  const labels: string[] = label.filter((item, pos) => {
    return label.indexOf(item) == pos;
  });

  // Build dataset arrays aligned to `labels` (years). This avoids index misalignment
  // when `dataProps` is not in the same order or has missing/extra items
  const consolidatedData = labels.map((lbl) => {
    const match = dataProps.find((d) => String(d.ano) === String(lbl) && d.dad_estimado === false)
    return match ? parseFloat(match.economia_acumulada) : null
  })

  const estimatedData = labels.map((lbl) => {
    const match = dataProps.find((d) => String(d.ano) === String(lbl) && d.dad_estimado === true)
    return match ? parseFloat(match.economia_acumulada) : null
  })

  const data: any = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: dataset,
        // stacked: true,
        data: consolidatedData,
        datalabels: {
          // backgroundColor: '#255488',
          // borderRadius: 8,
          // opacity: .8,
          display: (ctx) => ctx.dataIndex === 0, // Exibe apenas o primeiro
        },
        skipNull: true,
        borderRadius: 8,
        backgroundColor: '#255488',
      },
      {
        type: 'bar',
        label: 'Estimado',
        datalabels: {
          // keep the previous behaviour of offsetting the second estimated bar if needed
        },
        data: estimatedData,
        skipNull: true,
        borderRadius: 8,
        backgroundColor: draw('diagonal-right-left', '#C2d5fb'),
      },
    ],
  }

  return (
    <GrossAnualChartView>
      <Chart options={options} data={data} type='bar' height={'156'} />
    </GrossAnualChartView>
  )
}
