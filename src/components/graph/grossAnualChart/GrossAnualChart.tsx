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

  function getPreferredYearEntry(year: string) {
    return dataProps.find((d) => String(d.ano) === String(year) && d.dad_estimado === true)
      || dataProps.find((d) => String(d.ano) === String(year) && d.dad_estimado === false)
  }

  const options: any = {
    responsive: true,
    // maintainAspectRatio: false,
    layout: {
      padding: {
        top: 10,
        bottom: 0,
        left: 0,
        right: 0,
      }
    },
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
        },
      },
      y: {
        stacked: false,
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
          if (value == null) return null
          const year = labels[ctx.dataIndex]
          const topEntry = getPreferredYearEntry(year)
          if (!topEntry) return null
          const totalValue = parseFloat(topEntry.economia_acumulada)
          const percentage = (parseFloat(topEntry.econ_percentual) * 100).toFixed(0) + "%"
          const formatted = parseInt(String(totalValue)).toLocaleString('pt-br')
          return `${spacement(formatted)}${percentage}\n${formatted}${spacement(formatted)}`
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

  // Build dataset arrays aligned to `labels` (years). Both records can exist for the same
  // year so the estimated bar can render behind the consolidated one.
  const consolidatedData = labels.map((lbl) => {
    const match = dataProps.find((d) => String(d.ano) === String(lbl) && d.dad_estimado === false)
    return match ? parseFloat(match.economia_acumulada) : null
  })

  const estimatedData = labels.map((lbl) => {
    const estimated = dataProps.find((d) => String(d.ano) === String(lbl) && d.dad_estimado === true)
    return estimated ? parseFloat(estimated.economia_acumulada) : null
  })

  const data: any = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: 'Estimado',
        order: 1,
        datalabels: {
          display: (ctx) => {
            const year = labels[ctx.dataIndex]
            return dataProps.some((d) => String(d.ano) === String(year) && d.dad_estimado === true)
          },
        },
        data: estimatedData,
        skipNull: true,
        borderRadius: 8,
        backgroundColor: draw('diagonal-right-left', '#C2d5fb'),
        grouped: false,
      },
      {
        type: 'bar',
        label: dataset,
        order: 0,
        data: consolidatedData,
        datalabels: {
          display: (ctx) => {
            const year = labels[ctx.dataIndex]
            return !dataProps.some((d) => String(d.ano) === String(year) && d.dad_estimado === true)
          },
        },
        skipNull: true,
        borderRadius: 8,
        backgroundColor: '#255488',
        grouped: false,
      },
    ],
  }

  return (
    <GrossAnualChartView>
      <Chart options={options} data={data} type='bar' height={'156'} />
    </GrossAnualChartView>
  )
}
