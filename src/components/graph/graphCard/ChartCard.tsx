import React from 'react'
import Link from 'next/link';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { ChartCardView } from './ChartCardView';
import Chart from '../Chart';
import ButtonGroup from '../../buttonGroup/ButtonGroup';

interface ChartCardInterface {
  title: string,
  subtitle: string,
  consumption?: number,
  className?: string
}

export default function ChartCard({ title, subtitle, consumption, className }: ChartCardInterface) {
  const [timeCourse, setTimeCourse] = React.useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setTimeCourse(newAlignment);
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
      <Chart title='' />
    </ChartCardView>
  )
}
