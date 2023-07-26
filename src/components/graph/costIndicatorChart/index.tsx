
import { draw } from 'patternomaly';

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import ChartTitle from '../ChartTitle';
import { config } from '../config';
import { CostIndicatorChartView } from './CostIndicatorChartView';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ChartInterface {
  title: string,
  subtitle: string,
  data1: any,
  data2: any,
  single?: any
  label: any,
  miniature?: boolean | undefined
  years?: string[]
}

export default function CostIndicatorChart({ title, data1, data2, label, subtitle, miniature, years }: ChartInterface) {

  const labels = label;

  const options: any = config(miniature)

  const data = {
    labels,
    datasets: [
      {
        label: years[0],
        data: data1?.map(value => value),
        skipNull: data2?.map(value => value)?.includes(null),
        borderRadius: 8,
        datalabels: {
          backgroundColor: 'white',
          borderRadius: 8,
          opacity: .8,
          offset: -5
        },
        backgroundColor: (value, ctx) => {
          if (value?.dad_estimado)
            return draw('diagonal-right-left', '#C2d5fb');
          else
            return '#C2d5fb'
        },
      },
      {
        label: years[1],
        data: data2?.map(value => value),
        skipNull: data1?.map(value => value)?.includes(null),
        borderRadius: 8,
        backgroundColor: (value, ctx) => {
          if (value?.dad_estimado)
            return draw('diagonal-right-left', '#255488');
          else
            return '#255488'
        },
      }
    ],
  }

  return (
    <CostIndicatorChartView>
      <ChartTitle title={title} subtitle={subtitle} />
      <Bar
        options={options}
        data={data}
      />
    </CostIndicatorChartView>
  )
}
