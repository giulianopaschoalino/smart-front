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
import { CativoXLivreChartView } from './CativoXLivreChartView';
import ChartTitle from '../ChartTitle';
import pattern from 'patternomaly'
import { config } from '../config';
import { getLastConsolidatedYear } from '../../../utils/dataProcessing';

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

  // Filter data by last consolidated year
  const lastConsolidatedYear = getLastConsolidatedYear(chartData || [], true);
  
  // Helper function to extract year from mes field
  const extractYear = (mes: string): number => {
    if (!mes) return lastConsolidatedYear;
    const mesStr = mes.toString();
    if (mesStr.includes('-')) {
      return parseInt(mesStr.split('-')[0]);
    }
    if (mesStr.includes('/')) {
      return parseInt(mesStr.split('/')[1]);
    }
    return lastConsolidatedYear;
  };

  // Filter data and labels together to keep them in sync
  const filteredData: { chartData: any[], labels: any[] } = { chartData: [], labels: [] };
  
  chartData?.forEach((value, index) => {
    const year = extractYear(value.mes);
    if (year === lastConsolidatedYear) {
      filteredData.chartData.push(value);
      if (label && label[index]) {
        filteredData.labels.push(label[index]);
      }
    }
  });

  const filteredChartData = filteredData.chartData.length > 0 ? filteredData.chartData : chartData;
  const labels = filteredData.labels.length > 0 ? filteredData.labels : label;

  const options: any = config(miniature)

  const hasEstimated = filteredChartData?.some((value) => value.dad_estimado)

  const data: any = {
    labels,
    datasets: filteredChartData?.map(value => value.dad_estimado)?.includes(true) ? [
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
        data: filteredChartData?.map(value => parseInt(value.economia_mensal)),
      },
      {
        type: 'bar' as const,
        label: 'Cativo',
        data: filteredChartData?.map(value => {
          if (!value.dad_estimado)
          return parseInt(value.custo_cativo)
        }),
        // skipNull: true,
        borderRadius: 8,
        backgroundColor: '#C2D5FB',
        skipNull: filteredChartData?.map(value => value.dad_estimado)?.includes(true)
      },
      {
        type: 'bar' as const,
        label: 'Livre',
        data: filteredChartData?.filter(value => !value.dad_estimad? true : false).map(value => {
          if (!value.dad_estimado)
          return parseInt(value.custo_livre)
        }),
        // skipNull: true,
        borderRadius: 8,
        backgroundColor: '#255488',
        skipNull: filteredChartData?.map(value => value.dad_estimado)?.includes(true)
      },
      {
        type: 'bar',
        label: 'Est. Cativo',
        data: filteredChartData?.map(value => {
          if (value.dad_estimado)
          return parseInt(value.custo_cativo)
        }),
        borderRadius: 8,
        backgroundColor: pattern.draw('diagonal-right-left', '#C2D5FB'),
        skipNull: filteredChartData?.map(value => value.dad_estimado)?.includes(true)
      },
      {
        type: 'bar',
        label: 'Est. Livre',
        data: filteredChartData?.map(value => {
          if (value.dad_estimado)
          return parseInt(value.custo_livre)
        }),
        borderRadius: 8,
        backgroundColor: pattern.draw('diagonal-right-left', '#255488'),
        skipNull: filteredChartData?.map(value => value.dad_estimado)?.includes(true)
      }
    ] : [
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
        data: filteredChartData?.map(value => parseInt(value.economia_mensal)),
      },
      {
        type: 'bar' as const,
        label: 'Cativo',
        data: filteredChartData?.map(value => {
          if (!value.dad_estimado)
          return parseInt(value.custo_cativo)
        }),
        // skipNull: true,
        borderRadius: 8,
        backgroundColor: '#C2D5FB',
        skipNull: filteredChartData?.map(value => value.dad_estimado)?.includes(true)
      },
      {
        type: 'bar' as const,
        label: 'Livre',
        data: filteredChartData?.filter(value => !value.dad_estimad? true : false).map(value => {
          if (!value.dad_estimado)
          return parseInt(value.custo_livre)
        }),
        // skipNull: true,
        borderRadius: 8,
        backgroundColor: '#255488',
        skipNull: filteredChartData?.map(value => value.dad_estimado)?.includes(true)
      }
    ],
  }

  return (
    <CativoXLivreChartView>
      {/* <ChartTitle title={title} subtitle={subtitle}/> */}
      <div>
        <Chart ref={chartRef} type='bar' options={options} data={data} />
      </div>
    </CativoXLivreChartView>
  )
}
