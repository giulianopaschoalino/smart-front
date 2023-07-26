import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ButtonGroupView } from './ButtonGroupView';
import { useState } from 'react';

export default function ButtonGroup() {
  const [timeCourse, setTimeCourse] = useState<string | null>('Mensal');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newTimeCourse: string | null,
  ) => {
    setTimeCourse(newTimeCourse);
  };
  return (
    <ButtonGroupView timeCourse={timeCourse} >
      <ToggleButtonGroup
        value={timeCourse}
        exclusive
        onChange={handleAlignment}
        aria-label="time course"
        className='groupButton'
        style={{backgroundColor: 'transparent'}}
      >
        <div className='switch' />
        <ToggleButton value="Mensal" aria-label="Mensal" style={{backgroundColor: 'transparent', minWidth: '90px', border: 'none'}}>
          Mensal
        </ToggleButton>
        <ToggleButton value="Semanal" aria-label="Semanal" style={{backgroundColor: 'transparent', minWidth: '90px', border: 'none'}}>
          Semanal
        </ToggleButton>
        <ToggleButton value="Hoje" aria-label="Hoje" style={{backgroundColor: 'transparent', minWidth: '90px', border: 'none'}}>
          Hoje
        </ToggleButton>
      </ToggleButtonGroup>
    </ButtonGroupView>
  )
}
