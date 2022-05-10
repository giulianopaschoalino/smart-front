import React from 'react';
import Banner from '../src/components/banner/Banner';
 import { TelemetriaView, Buttons} from '../styles/layouts/Telemetria/TelemetriaView';
import MenuItem from '@mui/material/MenuItem';
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


      <FormControl  size="small" sx={{  width: 240,  mt:10 , pl:4 }} style={{}}>
      <p className='title'>Unidade</p>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty

        >
          <MenuItem value="">
          <span className='titleMenuItem'>Filial 3</span>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>

      </FormControl>

      <FormControl size="small" sx={{ width: 260, mt:10 , pl:5}} >
      <p className='title'>Data Inicial</p>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty

        >
          <MenuItem value="">
          <span className='titleMenuItem'>07/09/2021</span>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ width: 260, mt:10 , pl:5, }} >
      <p className='title'>Data Final</p>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
          <span className='titleMenuItem'>30/06/2000</span>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl  size="small" sx={{ width: 270, mt:10 , pl:5}} >
      <p className='title'>Discretização</p>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
         >
          <MenuItem value="">
            <span className='titleMenuItem'>60 min</span>
          </MenuItem>
          <MenuItem value={10}>Filial 3</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

        <Buttons>
          <button className='btnGrafico'> <p className='btnTitle'>GRÁFICOS</p> <br /> GERAR GRÁFICOS COM OS DADOS SELECIONADOS</button>
          <button className='btndownload'> <p>DOWNLOADS</p> <br /> DADOS BRUTOS SELECIONADOS</button>
            <button className='btnDados'> <p>DADOS</p> <br /> HORÁRIOS DO MÊS ATUAL</button>
        </Buttons>
    </TelemetriaView>
  )
}
