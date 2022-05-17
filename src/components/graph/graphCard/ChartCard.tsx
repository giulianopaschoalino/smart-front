import React from 'react'
import Link from 'next/link';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { ChartCardView } from './ChartCardView';
import Chart from '../Chart';
import ButtonGroup from '../../buttonGroup/ButtonGroup';
import RenderIf from '../../../utils/renderIf';
import LineChart from '../LineChart';
import { SingleBar } from '../SingleBar';

interface ChartCardInterface {
  title: string,
  subtitle: string,
  consumption?: number,
  className?: string,
  line?: boolean | undefined,
  singleBar?: any
}

export default function ChartCard({ title, subtitle, consumption, className, line, singleBar }: ChartCardInterface) {
  const [timeCourse, setTimeCourse] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setTimeCourse(newAlignment);
  };

  const labels = ['0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8', '0', '2', '4', '6', '8',];


  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3, 5, 7, 8, 9, 8, 9, 7, 8, 6, 4, 3, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 9, 10, 11, 12, 12, 14, 15, 17, 20, 21, 18, 15, 14, 12, 11, 10, 8, 6, 7, 8, 7, 9],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      // {
      //   label: 'Dataset 2',
      //   data: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
      //   borderColor: 'rgb(255, 114, 32)',
      //   backgroundColor: 'rgba(255, 145, 0, 0.5)',
      // },
      // {
      //   label: 'Dataset 3',
      //   data: [1, 2, 3, 5, 7, 8, 9, 8, 9, 7, 8, 6, 4, 3, 2, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 9, 10, 11, 12, 12, 14, 15, 17, 20, 21, 18, 15, 14, 12, 11, 10, 8, 6, 7, 8, 7, 9],
      //   borderColor: 'rgb(109, 109, 109)',
      //   backgroundColor: 'rgba(90, 90, 90, 0.5)',
      // },
      // {
      //   label: 'Dataset4',
      //   data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      //   borderColor: 'rgb(255, 166, 0)',
      //   backgroundColor: 'rgba(255, 187, 0, 0.5)',
      // },
    ],
  };

  return (
    <ChartCardView className={className} >
      <div className='content' >
        <div className='header'>
          <div>
            <h2>{title}</h2>
            <span>{subtitle}</span>
          </div>
          <ButtonGroup />
        </div>
        {
          consumption?
            <aside>
              <div>
                <div className='info'><p>{consumption}</p></div>
                <h4>Consumo</h4>
                <label className='statusDot' />
              </div>
              <Link href='#'>{'Visualizar >'}</Link>
            </aside>
              :
            <></>
        }
      </div>
      <RenderIf isTrue={line? true : false}>
        <LineChart title='' data={data}/>
      </RenderIf>
      <RenderIf isTrue={line? false : true}>
        <RenderIf isTrue={singleBar? true : false}>
          <SingleBar/>
        </RenderIf>

        <RenderIf isTrue={singleBar? false : true}>
          <Chart title='' />
        </RenderIf>
      </RenderIf>
    </ChartCardView>
  )
}
