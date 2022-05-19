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
import { draw } from 'patternomaly'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

function triggerTooltip(chart: ChartJS | null) {
  const tooltip = chart?.tooltip;

  if (!tooltip) {
    return;
  }

  if (tooltip.getActiveElements().length > 0) {
    tooltip.setActiveElements([], { x: 0, y: 0 });
  } else {
    const { chartArea } = chart;

    tooltip.setActiveElements(
      [
        {
          datasetIndex: 0,
          index: 2,
        },
        {
          datasetIndex: 1,
          index: 2,
        },
      ],
      {
        x: (chartArea.left + chartArea.right) / 2,
        y: (chartArea.top + chartArea.bottom) / 2,
      }
    );
  }

  chart.update();
}

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
}

export function LineBarChart({ title, subtitle, data1, data2, data3, label, red, dataset1, dataset2, dataset3, barLabel, hashurado }: LineBarChartInterface) {
  const chartRef = useRef<ChartJS>(null);

  const currentTime = new Date();


  const labels = label

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

  const data = data2? {
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
        label: dataset2? dataset2 : 'Dataset 2',
        backgroundColor: (value, ctx) => {
          return hashurado? parseInt(value.dataIndex+1) <= currentTime.getMonth()? '#C2D5FB' : draw('diagonal', '#C2D5FB') : '#C2D5FB'
        },
        data: data3.map(value => value),
      },
      {
        type: 'bar' as const,
        label: dataset3? dataset3 : 'Dataset 2',
        // backgroundColor: '#255488',
        backgroundColor: (value, ctx) => {
          return hashurado? parseInt(value.dataIndex+1) <= currentTime.getMonth()? '#255488' : draw('diagonal', '#255488') : '#255488'
        },
        data: data2.map(value => value),
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

    triggerTooltip(chart);
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
