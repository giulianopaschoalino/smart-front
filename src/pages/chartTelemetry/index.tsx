import React, { useEffect, useState } from 'react'
import { SingleBar } from '../../components/graph/SingleBar'
import { ChatTelemetryView } from '../../styles/layouts/ChatTelemetry/ChatTelemetryView'
// import router, { useRouter } from 'next/router'

import { FatorPotencia } from '../../services/fatorPotencia'
import { ConsumoDecretizadoBar } from '../../services/consumoDiscretizadoBar'
import { ConsumoDecretizadoLine } from '../../services/consumoDiscretizadoLine'
import LineChart from '../../components/graph/LineChart'
import { LineBarChart } from '../../components/graph/LineBarChart'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import Head from 'next/head'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import getAPIClient from '../../services/ssrApi'
import { api } from '../../services/api'
import FatorPotenciaChart from '../../components/graph/fatorPotenciaChart'
// import { DemRegXDemConChart } from '../components/graph/demRegXDemConChart'
import { DiscretizedConsumptionChart } from '../../components/graph/DiscretizedConsumptionChart'
import DiscretizedConsumptionChartLine from '../../components/graph/DiscretizedConsumptionChartLine'
import router, { useRouter } from 'next/router'
import { DemRegXDemConChart } from '../../components/graph/DemRegXDemConChart'

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'white',
  p: 5,
};

export default function chartTelemetry({userName}) {
  const [openFatorPotencia, setOpenFatorPotencia] = useState(false);
  const handleCloseFatorPotencia = () => setOpenFatorPotencia(false);

  const [openConsumoDiscretizado1, setOpenConsumoDiscretizado1] = useState(false);
  const handleCloseConsumoDiscretizado1 = () => setOpenConsumoDiscretizado1(false);

  const [openConsumoDiscretizado2, setOpenConsumoDiscretizado2] = useState(false);
  const handleCloseConsumoDiscretizado2 = () => setOpenConsumoDiscretizado2(false);

  const [openDemandaContratada, setOpenDemandaContratada] = useState(false);
  const handleCloseDemandaContratada = () => setOpenDemandaContratada(false);

  const [fatorPotenciaData, setFatorPotenciaData] = useState(null);
  const [demRegXDemCon, setDemRegXDemCon] = useState(null);
  const [discretizedConsumptionData, setDiscretizedConsumptionData] = useState(null);
  const [discretizedConsumptionDataReativa, setDiscretizedConsumptionDataReativa] = useState(null);

  const { ['user-cod_client']: cod_client } = parseCookies()

  const router = useRouter()

  const {startDate, endDate, unity, discretization} = router.query

  async function getChartsData() {
    console.log(router.query)
    await api.post('/telemetry/powerFactor', {
      "filters": [
        {"type" : "=", "field": "med_5min.ponto", "value": unity},
        {"type" : "between", "field": "dia_num", "value": [startDate, endDate]}
      ]
    }).then(res => {
      setFatorPotenciaData(res.data.data)
    }).catch(res => {
      console.log(res)
    })

    await api.post('/telemetry/discretization', {
      "type": discretization,
      "filters": [
          {"type" : "=", "field": "med_5min.ponto", "value": unity},
          {"type" : "between", "field": "dia_num", "value": [startDate, endDate]}
        ]
    }).then(res => {
      setDiscretizedConsumptionDataReativa(res.data.data)
    }).catch(res => {
      console.log(res)
    })

  await api.post('/telemetry/discretization', {
    "type": discretization,
    "filters": [
        {"type" : "=", "field": "med_5min.ponto", "value": unity},
        {"type" : "between", "field": "dia_num", "value": [startDate, endDate]}
      ]
    }).then(res => {
      setDiscretizedConsumptionData(res.data.data)
    }).catch(res => {
      console.log(res)
    })

  await api.post('/telemetry/demand', {
    "filters": [
      {"type" : "=", "field": 'med_5min.ponto', "value": unity},
      {"type" : "between", "field": "dia_num", "value": [startDate, endDate]}
    ]
    }).then(res => {
      setDemRegXDemCon(res.data.data)
    }).catch(res => {
      console.log(res)
    })
  }

  useEffect(() => {
    getChartsData()
    console.log(fatorPotenciaData)
  }, [])

  return (
    <ChatTelemetryView>
      <Head>
        <title>Smart Energia - Graficos Telemetria</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Telemetria - Graficos' subtitle='Gráficos' />
      <section className='chartContainer'>
        {
          demRegXDemCon==null?
          <div id="preloader_1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          :
          <>
            <div onClick={() => setOpenFatorPotencia(true)}>
            <FatorPotenciaChart title='Fator de Potencia' subtitle='' data1={fatorPotenciaData}
              data2={fatorPotenciaData} dataset1='Fator de Potencia' dataset2='Fator ref' label={FatorPotencia.label1} />
            </div>
            <Modal
              open={openFatorPotencia}
              onClose={handleCloseFatorPotencia}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <FatorPotenciaChart title='Fator de Potencia' subtitle='' data1={fatorPotenciaData}
                  data2={fatorPotenciaData} dataset1='Fator de Potencia' dataset2='Fator ref' label={FatorPotencia.label1} />
              </Box>
            </Modal>

            <div onClick={() => setOpenConsumoDiscretizado1(true)}>
              <DiscretizedConsumptionChartLine title={
                  discretization==='5_min'? 'Consumo discretizado em 5 minutos' :
                  discretization==='15_min'? 'Consumo discretizado em 15 minutos' : discretization==='1_hora'? 'Consumo discretizado em 1 hora' : 'Consumo discretizado em 1 dia'
                } subtitle='' data1={discretizedConsumptionDataReativa} dataset1='Demanda registrada' label={discretizedConsumptionDataReativa.map(data => parseFloat(data.reativa).toFixed(3))} />
            </div>
            <Modal
              open={openConsumoDiscretizado1}
              onClose={handleCloseConsumoDiscretizado1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <DiscretizedConsumptionChartLine title={
                  discretization==='5_min'? 'Consumo discretizado em 5 minutos' :
                  discretization==='15_min'? 'Consumo discretizado em 15 minutos' : discretization==='1_hora'? 'Consumo discretizado em 1 hora' : 'Consumo discretizado em 1 dia'
                } subtitle='' data1={discretizedConsumptionDataReativa} dataset1='Demanda registrada' label={discretizedConsumptionDataReativa.map(data => data.reativa)} />
              </Box>
            </Modal>

            <div onClick={() => setOpenConsumoDiscretizado2(true)}>
              <DiscretizedConsumptionChart title={
                  discretization==='5_min'? 'Consumo discretizado em 5 minutos' :
                  discretization==='15_min'? 'Consumo discretizado em 15 minutos' : discretization==='1_hora'? 'Consumo discretizado em 1 hora' : 'Consumo discretizado em 1 dia'
                } subtitle='' dataProps={discretizedConsumptionData} label={discretizedConsumptionData.map(value => value.minut)} dataset={'Consumo'} dataset1='Estimado' month/>
            </div>
            <Modal
              open={openConsumoDiscretizado2}
              onClose={handleCloseConsumoDiscretizado2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <DiscretizedConsumptionChart title={
                  discretization==='5_min'? 'Consumo discretizado em 5 minutos' :
                  discretization==='15_min'? 'Consumo discretizado em 15 minutos' : discretization==='1_hora'? 'Consumo discretizado em 1 hora' : 'Consumo discretizado em 1 dia'
                } subtitle='' dataProps={discretizedConsumptionData} label={discretizedConsumptionData.map(value => value.minut)} dataset={'Consumo'} dataset1='Estimado' month/>
              </Box>
            </Modal>

            <div onClick={() => setOpenDemandaContratada(true)}>
              <DemRegXDemConChart data1={demRegXDemCon} data2={demRegXDemCon} dataset1={'Demanda contratada + 5%'} dataset2={'barra1'} dataset3={'Demanda Registrada'} label={demRegXDemCon.map(value => value.hora)} title='Demanda Contratada X Registrada' subtitle='' red/>
            </div>
            <Modal
              open={openDemandaContratada}
              onClose={handleCloseDemandaContratada}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <DemRegXDemConChart data1={demRegXDemCon} data2={demRegXDemCon} dataset1={'Demanda contratada + 5%'} dataset2={'barra1'} dataset3={'Demanda Registrada'} label={demRegXDemCon.map(value => value.hora)} title='Demanda Contratada X Registrada' subtitle='' red/>
              </Box>
            </Modal>
            </>
        }
        </section>
    </ChatTelemetryView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-cod_client']: cod_client } = parseCookies(ctx)

  const fatorPotenciaChart = []

  console.log('olha os query ai', ctx.query)

  // await apiClient.post('/telemetry/powerFactor', {
	// 	"filters": [
	// 		{"type" : "=", "field": "med_5min.ponto", "value": cod_client},
	// 		{"type" : "between", "field": "dia_num", "value": ["2022-01-03", "2022-01-03"]}
	// 	]
  // }).then(res => {
  //   fatorPotenciaChart = res.data
  // }).catch(res => {
  //   console.log(res)
  // })

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
      fatorPotenciaChart
    }
  }
}
