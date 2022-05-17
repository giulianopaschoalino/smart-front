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
  data2: any,
  data3: any,
  red: any
  label: any
}

export function LineBarChart({ title, subtitle, data1, data2, data3, label, red }: LineBarChartInterface) {
  const chartRef = useRef<ChartJS>(null);

  const labels = label

  const data = {
    labels,
    datasets: [
      {
        type: 'line' as const,
        label: 'Dataset 1',
        borderColor: red? '#f00' : '#0c9200',
        borderWidth: 2,
        fill: false,
        data: data1.map(value => value),
      },
      // {
      //   type: 'line' as const,
      //   label: 'Dataset 1',
      //   borderColor: '#f00',
      //   borderWidth: 2,
      //   fill: false,
      //   data: data4.map(value => value),
      // },
      {
        type: 'bar' as const,
        label: 'Dataset 2',
        backgroundColor: '#255488',
        data: data2.map(value => value),
      },
      {
        type: 'bar' as const,
        label: 'Dataset 2',
        backgroundColor: '#C2D5FB',
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
      <Chart ref={chartRef} type='bar' data={data} />
    </ChartView>
  )
}
