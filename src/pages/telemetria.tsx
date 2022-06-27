import React, { useState } from 'react';
import router, { useRouter } from 'next/router'

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
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function Telemetria({userName}: any) {
  const [unity, setUnity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discretization, setDiscretization] = useState('');

  const [date, setDate] = useState('');

  const [showChart, setShowChart] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value);
  };

  return(
    <TelemetriaView>
      <Head>
        <title>Smart Energia - Telemetria</title>
      </Head>
      <Header name={userName} />
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
          <input type="date" data-date="" data-date-format="DD MMMM YYYY" value={startDate} onChange={(value) => setStartDate(value.target.value)}/>
        </div>

        <div className='select'>
        <p className='title' >Data final</p>

          <input type="date" data-date="" data-date-format="DD MMMM YYYY" value={endDate} onChange={(value) => setEndDate(value.target.value)}/>
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
            </Select>
          </FormControl>
        </div>
      </section>

      <RenderIf isTrue={showChart}>
        <LineChart title='Fator de Potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data2} dataset1='Fator de Potencia' dataset2='Fator ref.' label={FatorPotencia.label1} />
      </RenderIf>

      <Buttons>
        <Link href={{
          pathname: '/chartTelemetry',
          query: {
            startDate,
            endDate,
            discretization
          },
        }} >
          {/* <GradientButton title='GRÁFICO' description='Gerar gráficos com os dados selecionados' orange/> */}
          <button>
            <p>GRÁFICO</p>
            <p>Gerar gráficos com os dados selecionados</p>
          </button>
        </Link>
        {/* <GradientButton title='GRÁFICO' description='Gerar gráficos com os dados selecionados' orange onClick={() => router.replace('/chartTelemetry')}/> */}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      userName
    }
  }
}

