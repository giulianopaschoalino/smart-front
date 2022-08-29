import React, { useEffect, useState } from 'react'

import { DashboardView } from '../../styles/layouts/dashboard/DashboardView'

import MapCard from '../../components/mapCard/MapCard'
import GraphCard from '../../components/graph/graphCard/ChartCard'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import Link from 'next/link'

import { parseCookies, setCookie } from 'nookies'
import { GetServerSideProps } from 'next'
import getAPIClient from '../../services/ssrApi'
import { GrossAnualChart } from '../../components/graph/grossAnualChart/GrossAnualChart'
import CostIndicatorChart from '../../components/graph/costIndicatorChart'
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart'
import GrossMensalChart from '../../components/graph/grossMensalChart/GrossMensalChart'
import Head from 'next/head'
import AccumulatedEconomyTitle from '../../components/accumulatedEconomyTitle/AccumulatedEconomyTitle'
import { format } from 'date-fns'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import RenderIf from '../../utils/renderIf'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Dashboard({grossAnualGraph, grossAnualYears, grossMensalGraph, grossMensalYears, acumulatedGraph, mapsInfo, userName, costIndicator} : any) {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ]

  const { ['terms']: terms } = parseCookies()

  const [lastDataBrutaMensalS, setLastDataBrutaMensal] = useState('')
  const [lastDataBrutaAnualS, setLastDataBrutaAnual] = useState('')

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let lastDataMensal = '0'
    let lastDataAnual = '0'
    let index=0

    while (index < grossMensalGraph.length) {
      if (!grossMensalGraph[index].dad_estimado && grossMensalGraph[index].economia_acumulada!==null)
        lastDataMensal=grossMensalGraph[index].economia_acumulada
      index++
    }
    setLastDataBrutaMensal(`${parseFloat(lastDataMensal).toFixed(3)}`)
    index=0
    while (index < grossAnualGraph.length) {
      if (!grossAnualGraph[index].dad_estimado)
        lastDataAnual=grossAnualGraph[index].economia_acumulada
      index++
    }
    setLastDataBrutaAnual(`${parseFloat(lastDataAnual).toFixed(3)}`)
  }, [])

  return (
    <DashboardView>
      <Head>
        <title>Smart Energia - Visão Geral</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      </Header>

      <Link href='pld'>
        <section className="cardsSection" >
          <MapCard title='R$/MWh' subtitle='' date={`${format(new Date(), 'MM/yyyy')}`} statistic='' imgSource='/moneyIcon2.png' />
          {
            mapsInfo.map(value => {
              return <MapCard key={value.submarket} title='S' subtitle={value.submarket} statistic={parseFloat(value.value).toFixed(2)} imgSource='/SUL.svg' />
            })
          }
        </section>
      </Link>

      {
        typeof window === 'undefined' || typeof window === undefined? null :
        <>
          <section className='dashboard'>
            <GraphCard title='Economia Anual' subtitle='Economia Bruta Estimada e Acumulada Anual - Valores em R$ x mil'>
              <AccumulatedEconomyTitle value={lastDataBrutaAnualS}/>
              <GrossAnualChart title='' subtitle=''
                dataset='Consolidada'
                dataProps={grossAnualGraph}
                label={grossAnualYears} barLabel bruta miniature/>
            </GraphCard>

            <GraphCard title='Economia Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - Valores em R$ x mil'>
              <AccumulatedEconomyTitle value={lastDataBrutaMensalS}/>
              <GrossMensalChart title='' subtitle=''
                data1={grossMensalGraph}
                data2={grossMensalGraph}
                label={months}
                miniature
              />
            </GraphCard>

            <GraphCard title='Custo Mensal Cativo x Livre' subtitle='Comparativo de Custo Estimado - Valores em R$ x mil'>
              <CativoXLivreChart chartData={acumulatedGraph}
                dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
                label={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} title='' subtitle='' barLabel hashurado miniature/>
            </GraphCard>

            <GraphCard title='Indicador de Custo' subtitle='Indicador de Custo - Valores em R$/MWh'>
              <CostIndicatorChart title='' subtitle=''
                data1={costIndicator?.filter((value, index) => value?.mes.slice(0, 4).includes('2021')).map(value => value?.custo_unit && !!parseInt(value?.custo_unit)? value.custo_unit : null)}
                data2={costIndicator?.filter((value, index) => value?.mes.slice(0, 4).includes('2022')).map(value => value?.custo_unit && !!parseInt(value?.custo_unit)? value.custo_unit : null)}
                label={months}
                miniature
              />
            </GraphCard>
          </section>
          <Modal
            open={terms=='false'}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Termos de uso
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p>
                  Bem-vindo a Plataforma Web – SMART ENERGIA!
                </p>
                <p>
                  Visualize os principais indicadores, dados de economia, resumo de operações, PLD, notícias além de acompanhar o consumo de energia em intervalos mínimos de 5 minutos.
                </p>
                <p>
                  Conforme nosso contrato de serviços vigente, todas as informações entregues são estritamente privadas, sendo seu sigilo protegido por lei, não podendo ser compartilhadas com terceiros.
                </p>
                <p>
                  A divulgação não autorizada das informações adquiridas nesta plataforma (ou seu uso), de forma integral ou parcial, é proibida, não sendo permitido o compartilhamento dos acessos e senhas ou qualquer informação que tiver acesso junto a esta plataforma, sendo que o acesso a esta plataforma é restrito e individual.
                </p>
                <p>
                  Ressaltamos que os resultados informados são meramente indicativos.
                </p>
                <button onClick={() => {
                  setCookie(undefined, 'terms', 'true')
                  setOpen(false)
                }}>Aceito os termos</button>
              </Typography>
            </Box>
          </Modal>
        </>
      }
    </DashboardView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let grossAnualGraph = [];
  let grossMensalGraph = [];
  let acumulatedGraph = [];
  let costIndicator = []
  let mapsInfo = [];

  await apiClient.post('/economy/grossAnnual').then(res => {
    grossAnualGraph = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/economy/grossMonthly').then(res => {
    grossMensalGraph = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/economy/estimates').then(res => {
    acumulatedGraph = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/economy/MWh').then(res => {
    costIndicator = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/pld/overview').then(res => {
    mapsInfo = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  const grossMensalYears = grossMensalGraph.map((value) => value.mes)
  const grossAnualYears = grossAnualGraph.map((value) => value.ano)

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
      grossAnualGraph,
      grossAnualYears,
      grossMensalYears,
      grossMensalGraph,
      acumulatedGraph,
      costIndicator,
      mapsInfo,

      userName
    }
  }
}
