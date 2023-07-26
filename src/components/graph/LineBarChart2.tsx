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
  miniature?: boolean | undefined,
}

export function LineBarChart2({ title, subtitle, data1, data2, data3, label, red, dataset1, dataset2, dataset3, barLabel, hashurado, miniature }: LineBarChartInterface) {
  const chartRef = useRef<ChartJS>(null);

  const labels = label

  const options: any = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: barLabel? 'black' : "rgba(255, 255, 255, 0)",
        // backgroundColor: '#255488',
        anchor: "end",
        offset: -20,
        align: "start",
        font: {
          size: !miniature? 15 : 10
        },
        formatter: (value, ctx) => {
          let sum = 0;
          const dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map(data => {
              sum += data;
          });
          const result = `${(parseInt(value)/1000).toLocaleString('pt-br')}`

          return value==null? null : result
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

  const data: any = data2? {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: dataset1? dataset1 : 'Dataset 1',
        borderColor: red?
        '#f00' : '#0c9200',
        datalabels: {
          backgroundColor: 'white',
          borderRadius: 8,
          opacity: .8
        },
        borderWidth: 2,
        fill: false,
        data: data1.map(value => value.economia_mensal/1000),
      },
      {
        type: 'bar' as const,
        label: dataset2? dataset2 : 'Dataset 2',
        backgroundColor: (value, ctx) => {
          return hashurado? data1[value.dataIndex]?.dad_estimado == false? '#C2D5FB' : pattern.draw('diagonal', '#C2D5FB') : '#C2D5FB'
        },
        data: data3.map(value => value.custo_cativo/1000),
      },
      {
        type: 'bar' as const,
        label: dataset3? dataset3 : 'Dataset 3',
        // backgroundColor: '#255488',
        backgroundColor: (value, ctx) => {
          return hashurado? data1[value.dataIndex]?.dad_estimado == false? '#255488' : pattern.draw('diagonal', '#255488') : '#255488'
        },
        data: data2.map(value => value.custo_livre/1000),
      },
      {
        type: 'line',
        label: 'Acumulado',
        backgroundColor: '#255488',
        data: [],
      },
      {
        type: 'line',
        label: 'Estimado',
        backgroundColor: '#C2d5fb',
        data: [],
      }
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
        fill: false,
        data: data1.map(value => value),
      },
      {
        type: 'bar' as const,
        label: dataset3? dataset3 : 'Dataset 2',
        backgroundColor: '#255488',
        data: data3.map(value => value),
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
      <div>
        <Chart ref={chartRef} type='bar' options={options} data={data} />
      </div>
    </ChartView>
  )
}
