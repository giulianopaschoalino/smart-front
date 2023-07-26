import { useRef, useEffect } from 'react';
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
  data3: any,
  red?: any,
  label: any,
  dataset1?: string,
  dataset2?: string,
  dataset3?: string,
  barLabel?: boolean | undefined,
  hashurado?: boolean | undefined,
  reais?: boolean | undefined
}

export function LineBarChart({ title, subtitle, data1, data2, data3, label, red, dataset1, dataset2, dataset3, barLabel, hashurado, reais }: LineBarChartInterface) {
  const chartRef = useRef<ChartJS>(null);

  const currentTime = new Date();


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
            size: 16
          }
        },
      },
      y: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 16
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

  const data = data2? {
    labels: label.length < 28? ['1', '2', '3', '4', '5', '6', '7', '8', '8', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'] : label,
    datasets: [
      {
        type: 'line' as const,
        label: dataset1&&reais==false? parseFloat(dataset1).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2}) : dataset1,
        borderColor: red?
        '#f00' : '#0c9200',
        datalabels: {
          backgroundColor: 'white'
        },
        borderWidth: 2,
        fill: false,
        data: data1.map(value => value.value),
      },
      {
        type: 'bar' as const,
        label: dataset2? dataset2 : 'Dataset 2',
        backgroundColor: (value, ctx) => {
          return hashurado? parseInt(value.dataIndex+1) <= currentTime.getMonth()? '#C2D5FB' : pattern.draw('diagonal', '#C2D5FB') : '#C2D5FB'
        },
        data: data3.map(value => value.value),
      },
      {
        type: 'bar' as const,
        label: dataset3? dataset3 : 'Dataset 2',
        // backgroundColor: '#255488',
        backgroundColor: (value, ctx) => {
          return hashurado? parseInt(value.dataIndex+1) <= currentTime.getMonth()? '#255488' : pattern.draw('diagonal', '#255488') : '#255488'
        },
        data: data3.map(value => value.value),
      },
    ],
  } : {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: dataset1? dataset1 : 'Dataset 1',
        borderColor: red?
        '#f00' : '#0c9200',
        borderWidth: 2,
        fill: true,
        data: data1.map(value => value),
      },
      {
        type: 'bar' as const,
        label: dataset3? dataset3 : 'Dataset 2',
        backgroundColor: '#255488',
        data: data3.map(value => value.value),
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    // triggerTooltip(chart);
  }, []);

  return (
    <ChartView>
      <ChartTitle title={title} subtitle={subtitle}/>
      <Chart ref={chartRef} type='bar' options={options} data={data} />
    </ChartView>
  )
}
