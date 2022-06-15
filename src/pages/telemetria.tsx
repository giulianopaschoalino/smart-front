import React from 'react';
import { useRouter } from 'next/router'

import Banner from '../components/banner/Banner';
import { TelemetriaView, Buttons} from '../styles/layouts/Telemetria/TelemetriaView';
import GradientButton from '../components/buttons/gradientButton/GradientButton'
import Header from '../components/header/Header';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';
import Head from 'next/head';
import { start } from 'nprogress';
import LineChart from '../components/graph/LineChart';
import { FatorPotencia } from '../services/fatorPotencia';
import RenderIf from '../utils/renderIf';




export default function Telemetria() {
  const [unity, setUnity] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [discretization, setDiscretization] = React.useState('');

  const [showChart, setShowChart] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value);
  };

  return(
    <TelemetriaView>
      <Head>
        <title>Smart Energia - Telemetria</title>
      </Head>
      <Header name='' />
      <Banner title ='Telemetria' subtitle='Dados Coletados do Sistema de Coleta de Dados de Energia -
      SCDE da Câmara de Comercialização de Energia Elétrica - CCEE,
      sendo que as quantidades aqui informadas são de responsabilidade do agente de medição
      - Distribuidora.' imgSource='/assets/graphical.png' />

      <section>
        <div className='select'>
          <p className='title' >Unidade</p>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
            <InputLabel id="demo-select-small">Unidade</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={unity}
              label="Unidade"
              onChange={value => setUnity(value.target.value)}
              fullWidth
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>

              <MenuItem value={10}>Unidade 1</MenuItem>
              <MenuItem value={20}>Unidade 2</MenuItem>
              <MenuItem value={30}>Unidade 3</MenuItem>
              <MenuItem value={30}>Unidade 4</MenuItem>
              <MenuItem value={30}>Unidade 5</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='select'>
          <p className='title' >Data inicial</p>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
            <InputLabel id="demo-select-small">Data Inicial</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={startDate}
              label="Unidade"
              onChange={value => setStartDate(value.target.value)}
              fullWidth
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value={10}>20/05/2022</MenuItem>
              <MenuItem value={20}>10/06/2022</MenuItem>
              <MenuItem value={30}>05/06/2021</MenuItem>
              <MenuItem value={30}>05/06/2021</MenuItem>
              <MenuItem value={30}>05/06/2021</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='select'>
          <p className='title' >Data Final</p>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
            <InputLabel id="demo-select-small">Data Final</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={endDate}
              label="Unidade"
              onChange={value => setEndDate(value.target.value)}
              fullWidth
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value={10}>20/05/2022</MenuItem>
              <MenuItem value={20}>10/06/2022</MenuItem>
              <MenuItem value={30}>05/06/2021</MenuItem>
              <MenuItem value={30}>05/06/2021</MenuItem>
              <MenuItem value={30}>05/06/2021</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='select'>
          <p className='title' >Discretização</p>
          <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
            <InputLabel id="demo-select-small">Discretização</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={discretization}
              label="Unidade"
              onChange={value => setDiscretization(value.target.value)}
              fullWidth
            >
              <MenuItem value="">
                <em>Nenhum</em>
              </MenuItem>
              <MenuItem value="">07/09/2021</MenuItem>
              <MenuItem value={10}>Filial 3</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      </section>

      <RenderIf isTrue={showChart}>
        <LineChart title='Fator de Potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data2} dataset1='Fator de Potencia' dataset2='Fator ref.' label={FatorPotencia.label1} />
      </RenderIf>

      <Buttons>
        <GradientButton title='GRÁFICO' description='Gerar gráficos com os dados selecionados' orange link />
        <GradientButton title='DOWNLOADS' description='DADOS BRUTOS SELECIONADOS' purple />
        <GradientButton title='DADOS' description='hORÁRIOS DO MÊS ATUAL' onClick={() => setShowChart(!showChart)} green />
      </Buttons>
      <p className='paragraph'>
        <i>
          Fonte: Dados coletados do Sistema de Coleta de Dados
          de Energia - SCDE da Câmara de Comercialização <br/>
          Energia Elétrica – CCEE, sendo que as quantidades aqui
          informadas são de responsabilidade <br/>do agente de
          medição - Distribuidora.
        </i>
      </p>
    </TelemetriaView>
  )
}
