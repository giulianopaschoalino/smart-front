import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';
import { ChartView } from './ChartView';
import ChartTitle from './ChartTitle';
import pattern from 'patternomaly'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

// function triggerTooltip(chart: ChartJS | null) {
//   const tooltip = chart?.tooltip;

//   if (!tooltip) {
//     return;
//   }

//   if (tooltip.getActiveElements().length > 0) {
//     tooltip.setActiveElements([], { x: 0, y: 0 });
//   } else {
//     const { chartArea } = chart;

//     tooltip.setActiveElements(
//       [
//         {
//           datasetIndex: 0,
//           index: 2,
//         },
//         {
//           datasetIndex: 1,
//           index: 2,
//         },
//       ],
//       {
//         x: (chartArea.left + chartArea.right) / 2,
//         y: (chartArea.top + chartArea.bottom) / 2,
//       }
//     );
//   }

//   chart.update();
// }

interface LineBarChartInterface {
  title: string,
  subtitle: string,
  data1: any,
  data2?: any,
  red?: any,
  label: any,
  dataset1?: string,
  dataset2?: string,
  dataset3?: string,
  barLabel?: boolean | undefined,
  hashurado?: boolean | undefined,
  reais?: boolean | undefined
}

export function DemRegXDemConChart({
    title,
    subtitle,
    data1,
    data2,
    label,
    red,
    barLabel
  }: LineBarChartInterface) {
  const chartRef = useRef<ChartJS>(null);

  const labels = label

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
        // backgroundColor: '#255488',
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

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Demanda Contratada',
        borderColor: red?
        '#f00' : '#0c9200',
        borderWidth: 2,
        fill: false,
        borderDash: [5, 5],
        data: data1?.map(value => value.dem_cont),
        pointBorderColor: 'rgba(255, 145, 0, 0)',
      },
      {
        type: 'bar' as const,
        label: 'Demanda Registrada',
        data: data2?.map(value => value.dem_reg),
        borderRadius: 8,
        backgroundColor: '#255488',
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    // triggerTooltip(chart);
  }, []);

  return (
    <ChartView>
      <div style={{width: '90%'}}>
        <Chart ref={chartRef} type='bar' options={options} data={data} />
      </div>
    </ChartView>
  )
}
