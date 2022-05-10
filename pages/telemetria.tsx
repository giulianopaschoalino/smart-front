import React from 'react';

import Banner from '../src/components/banner/Banner';

 import { TelemetriaView, Buttons} from '../styles/layouts/Telemetria/TelemetriaView';



import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';




export default function Telemetria() {

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };



  return(

    <TelemetriaView>

      <Banner title ='Telemetria' subtitle='Dados Coletados do Sistema de Coleta de Dados de Energia -
              SCDE da Câmara de Comercialização de Energia Elétrica - CCEE,
              sendo que as quantidades aqui informadas são de responsabilidade do agente de medição
              - Distribuidora.' imgSource='/assets/graphical.png' />


      <FormControl sx={{  width: 250,  mt:10 , pl:8}} style={{}}>
      <FormHelperText   style={{}}>Unidade</FormHelperText>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>Filial 3</em>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

      </FormControl>

      <FormControl sx={{ width: 240, mt:10 , pl:8}} >
        <FormHelperText>Data Final</FormHelperText>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
         >
          <MenuItem value="">
            <em>07/09/2021</em>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 240, mt:10 , pl:8}} >
        <FormHelperText>Data Final</FormHelperText>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
         >
          <MenuItem value="">
            <em>07/09/2021</em>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ width: 240, mt:10 , pl:8}} >
        <FormHelperText  >Discretização</FormHelperText>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
         >
          <MenuItem value="">
            <em>60 min</em>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

        <Buttons>
           <button className='btnGrafico'> <p>GRÁFICOS</p> <br /> GERAR GRÁFICOS COM OS DADOS SELECIONADOS</button>
           <button className='btndownload'> <p>DOWNLOADS</p> <br /> DADOS BRUTOS SELECIONADOS</button>
            <button className='btnDados'> <p>DADOS</p> <br /> HORÁRIOS DO MÊS ATUAL</button>
        </Buttons>
    </TelemetriaView>
  )
}
