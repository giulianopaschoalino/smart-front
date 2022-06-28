import React, { useEffect, useState } from 'react';

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
import { api } from '../services/api';
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import getAPIClient from '../services/ssrApi';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Telemetria({userName, clients}: any) {
  const [unity, setUnity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [discretization, setDiscretization] = useState('');

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)
  const [openSnackError, setOpenSnackError] = useState<boolean>(false)
  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackError(false)
    setOpenSnackSuccess(false)
  }

  function downloadCSVFile(csv, filename) {
    const csv_file = new Blob([csv], {type: "text/csv"});

    const download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  function htmlToCSV(html, filename) {
    const data = [];
    const rows = document.querySelectorAll("table tr");

    for (let i = 0; i < rows.length; i++) {
      const row = [], cols: any = rows[i].querySelectorAll("td, th");

      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(","));
    }

    downloadCSVFile(data.join("\n"), filename);
  }

  const [tableData, setTableData] = useState(null)

  const [date, setDate] = useState('');

  const [showChart, setShowChart] = useState(false);

  const [exception, setException] = useState(false);
  const [send, setSend] = useState(false);

  const [open, setOpen] = useState(false);

  async function getTableData() {
    if (startDate!=='' && endDate!=='' && send)
      setOpen(true)
      await api.post('/telemetry/powerFactor', {
        "type": "15_min",
        "filters": [
            {"type" : "=", "field": "med_5min.ponto", "value": "RSZFNAENTR101P"},
            {"type" : "between", "field": "dia_num", "value": ["2022-01-03", "2022-01-03"]}
          ]
      }).then(res => {
        setTableData(res.data.data)
        setOpenSnackError(false)
        setOpenSnackSuccess(true)
        setOpen(false)
      }).catch(res => {
        setException(true)
        setSend(false)
        setOpenSnackError(true)
        setOpenSnackSuccess(false)
        console.log(res)
      })
  }

  useEffect(() => {
    setSend(false)
  }, [startDate, endDate])


  return(
    <TelemetriaView>
      <Head>
        <title>Smart Energia - Telemetria</title>
      </Head>
      <Snackbar
        open={openSnackSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: '100%' }}
        >
          Dados coletados com sucesso com Sucesso!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackError}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: '100%' }}
        >
          Não foi possivel pegar os dados!
        </Alert>
      </Snackbar>

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
              <MenuItem value="RSZFNAENTR101P">RSZFNAENTR101P</MenuItem>

              {
                clients.map((value) => {
                  return <MenuItem key={1} value={value.codigo_scde}>{value.codigo_scde}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>

        <div className='select'>
          <p className='title' >Data inicial</p>
          <input type="date" data-date="" data-date-format="DD MMMM YYYY" value={startDate} onChange={(value) => setStartDate(value.target.value)} onSelect={value => console.log(value)}/>
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
              <MenuItem value="5_min">5 minutos</MenuItem>
              <MenuItem value="15_min">15 minutos</MenuItem>
              <MenuItem value="1_hora">1 hora</MenuItem>
              <MenuItem value="1_dia">1 dia</MenuItem>
            </Select>
          </FormControl>
        </div>
      <button className='sendButton' onClick={() => {
        setSend(true)
        getTableData()
      }}>Enviar!</button>
      </section>

      <RenderIf isTrue={startDate!=='' && endDate!=='' && tableData===null && exception === false && send}>
        <div className='modal'>
          <div id="preloader_1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </RenderIf>
      <RenderIf isTrue={startDate!=='' && endDate!=='' && tableData!==null}>
        <table className="tg">
          <thead>
            <tr>
              <th className='tg-8oo6'>Ponto</th>
              <th className='tg-8oo6'>Numero do dia</th>
              <th className='tg-8oo6'>Dia formatado</th>
              <th className='tg-8oo6'>Hora</th>
              <th className='tg-8oo6'>Minuto</th>
              <th className='tg-8oo6'>Consumo</th>
              <th className='tg-8oo6'>Reativa</th>
            </tr>
          </thead>
          <tbody>
            {
              tableData!==null?
              tableData?.map((value, index) => {
                return <>
                  <tr>
                    <td key={index} className='tg-gceh'>{value.ponto}</td>
                    <td key={index} className='tg-gceh'>{parseFloat(value.dia_num)}</td>
                    <td key={index} className='tg-uulg'>{value.day_formatted}</td>
                    <td key={index} className='tg-gceh'>{value.hora}</td>
                    <td key={index} className='tg-gceh'>{value.minut}</td>
                    <td key={index} className='tg-uulg'>{parseFloat(value.consumo).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                    <td key={index} className='tg-gceh'>{parseFloat(value.reativa).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                  </tr>
                </>
              })
              :
              null
            }
          </tbody>
        </table>
      </RenderIf>

      <RenderIf isTrue={showChart}>
        <LineChart title='Fator de Potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data2} dataset1='Fator de Potencia' dataset2='Fator ref.' label={FatorPotencia.label1} />
      </RenderIf>

      <Buttons>
        <Link href={{
          pathname: '/chartTelemetry',
          query: {
            startDate,
            endDate,
            discretization: discretization==='5_min'? 'med_5min.ponto' : discretization==='15_min'? '15min.ponto' : discretization==='1_hora'? 'med_1hora.ponto' : discretization==='1_dia'? 'med_1dia.ponto' : 'med_5min.ponto',
            unity
          },
        }} >
          <button>
            <p>GRÁFICO</p>
            <p>Gerar gráficos com os dados selecionados</p>
          </button>
        </Link>
        <GradientButton title='DOWNLOADS' description='DADOS BRUTOS SELECIONADOS' purple onClick={() => {
          const html = document.querySelector("table").outerHTML;
          htmlToCSV(html, "telemetria.csv");
          console.log('clicando')
        }}/>
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
  const { ['user-client_id']: id } = parseCookies(ctx)
  const apiClient = getAPIClient(ctx)

  let clients = []

  await apiClient.post('/units', {
		"filters": [
			{"type" : "=", "field": "dados_cadastrais.cod_smart_cliente", "value": id}
		],
		"fields": ["cod_smart_unidade", "codigo_scde"],
		"distinct": true
  }).then(res => {
    clients = res.data.data
  }).catch(res => {
    console.log(res)
  })

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
      userName,
      clients
    }
  }
}

