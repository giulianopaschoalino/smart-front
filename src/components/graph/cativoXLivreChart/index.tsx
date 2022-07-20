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
import { CativoXLivreChartView } from './CativoXLivreChartView';
import ChartTitle from '../ChartTitle';
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
  chartData: any,
  red?: any,
  label: any,
  dataset1?: string,
  dataset2?: string,
  dataset3?: string,
  miniature?: boolean | undefined,
  barLabel?: boolean | undefined,
  hashurado?: boolean | undefined
}

export function CativoXLivreChart({ title, subtitle, chartData, label, dataset1, dataset2, dataset3, barLabel, hashurado, miniature }: LineBarChartInterface) {
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
      y: {
        grid: {
          display: false
        }
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: '#255488',
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
          const result = `${(parseInt(value)).toLocaleString('pt-br')}`

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

  const data: any = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: dataset1? dataset1 : 'Dataset 1',
        borderColor: '#0c9200',
        datalabels: {
          backgroundColor: 'white',
          borderRadius: 8,
          opacity: .8
        },
        borderWidth: 2,
        fill: false,
        data: chartData?.map(value => parseInt(value.economia_mensal)),
      },
      {
        type: 'bar' as const,
        label: 'Cativo',
        backgroundColor: '#C2D5FB',
        data: chartData?.map(value => {
          if (!value.dad_estimado)
          return parseInt(value.custo_cativo)
        }),
      },
      {
        type: 'bar' as const,
        label: 'Livre',
        backgroundColor: '#255488',
        data: chartData?.filter(value => !value.dad_estimad? true : false).map(value => {
          if (!value.dad_estimado)
          return parseInt(value.custo_livre)
        }),
      },
      {
        type: 'bar',
        label: 'Est. Cativo',
        backgroundColor: pattern.draw('diagonal', '#C2D5FB'),
        data: chartData?.map(value => {
          if (value.dad_estimado)
          return parseInt(value.custo_cativo)
        }),
      },
      {
        type: 'bar',
        label: 'Est. Livre',
        backgroundColor: pattern.draw('diagonal', '#255488'),
        data: chartData?.map(value => {
          if (value.dad_estimado)
          return parseInt(value.custo_livre)
        }),
      }
    ],
  }

  useEffect(() => {
    const chart = chartRef.current;

    // triggerTooltip(chart);
  }, []);

  return (
    <CativoXLivreChartView>
      <ChartTitle title={title} subtitle={subtitle}/>
      <div>
        <Chart ref={chartRef} type='bar' options={options} data={data} />
      </div>
    </CativoXLivreChartView>
  )
}
