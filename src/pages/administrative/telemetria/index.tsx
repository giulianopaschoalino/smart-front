import Button from '@material-ui/core/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { start } from 'nprogress';
import React from 'react';

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader';
import Banner from '../../../components/banner/Banner';
import GradientButton from '../../../components/buttons/gradientButton/GradientButton'
import LineChart from '../../../components/graph/LineChart';
import Header from '../../../components/header/Header';
import { FatorPotencia } from '../../../services/fatorPotencia';
import { Buttons, TelemetriaView, Uploads } from '../../../styles/layouts/Telemetria/TelemetriaView';
import RenderIf from '../../../utils/renderIf';

export default function index() {
  const [unity, setUnity] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [discretization, setDiscretization] = React.useState('');

  const [showChart, setShowChart] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    // setAge(event.target.value);
  };

  return(
    <>
      <AdministrativeHeader />
      <TelemetriaView>
        <Head>
          <title>Smart Energia - Telemetria</title>
        </Head>
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
                  <em>None</em>
                </MenuItem>
                <MenuItem value="">07/09/2021</MenuItem>
                <MenuItem value={10}>Filial 3</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                  <em>None</em>
                </MenuItem>
                <MenuItem value="">07/09/2021</MenuItem>
                <MenuItem value={10}>Filial 3</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                  <em>None</em>
                </MenuItem>
                <MenuItem value="">07/09/2021</MenuItem>
                <MenuItem value={10}>Filial 3</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
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
                  <em>None</em>
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
        <Uploads>
        <Button
            variant="contained"
            component="label"
            style={{width: '200px', margin: '30px'}}
          >
            Upload de dados
            <input
              type="file"
              hidden
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            style={{width: '200px', margin: '30px'}}
          >
            Upload de dados
            <input
              type="file"
              hidden
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            style={{width: '200px', margin: '30px'}}
          >
            Upload de dados
            <input
              type="file"
              hidden
            />
          </Button>
        </Uploads>
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
    </>
  )
}
