import React from 'react'

import { DashboardView } from '../../styles/layouts/dashboard/DashboardView'

import MapCard from '../../components/mapCard/MapCard'
import GraphCard from '../../components/graph/graphCard/ChartCard'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import Link from 'next/link'
import LineChart from '../../components/graph/LineChart'
import { SingleBar } from '../../components/graph/SingleBar'

import { dataEconomiaBruta } from '../../services/economiaBruta'
import { dataEconomiaIndicador } from '../../services/economiaIndicador'
import { EconomiaAcumulada } from '../../services/economiaAcumulada'
import Chart from '../../components/graph/Chart'
import { LineBarChart } from '../../components/graph/LineBarChart'
import { LineBarChart2 } from '../../components/graph/LineBarChart2'
import { ConsumoEstimado } from '../../services/consumoEstimado'
import Head from 'next/head'
import recoverUserInformation from '../../services/auth'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import getAPIClient from '../../services/ssrApi'
import Chart2 from '../../components/graph/Chart2'

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

  return (
    <DashboardView>
      <Head>
        <title>Smart Energia - Dashboard</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      </Header>

      <Link href='pld'>
        <section className="cardsSection" >
          <MapCard title='R$/MWh' subtitle='' date='período' statistic='' imgSource='/moneyIcon.svg' />
          {
            mapsInfo.map(value => {
              return <MapCard key={value.submarket} title='S' subtitle={value.submarket} statistic={parseFloat(value.value).toFixed(2)} imgSource='/SUL.svg' />
            })
          }
        </section>
      </Link>

      <section className='dashboard'>
        <GraphCard title='Economia Bruta Anual' subtitle='Economia Bruta Estimada e Acumulada Anual - (Valores em R$ mil)'>
          <SingleBar title='' subtitle=''
          dataset='Consolidada'
          dataProps={grossAnualGraph}
          label={grossAnualYears} barLabel miniature/>
        </GraphCard>

        <GraphCard title='Economia Bruta Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - (Valores em R$)' singleBar>
          <Chart2 title='' subtitle=''
          data1={grossMensalGraph.filter((value, index) => value.mes.slice(3, 8).includes('2021'))}
          data2={grossMensalGraph.filter((value, index) => value.mes.slice(3, 8).includes('2022'))}
          label={months} miniature/>
        </GraphCard>

        <GraphCard title='Cativo x Livre Mensal' subtitle='Comparativo de Custo Estimado - (Valores em R$/MWh)' singleBar>
          <LineBarChart2 data1={acumulatedGraph} data2={acumulatedGraph} data3={acumulatedGraph}
          label={ConsumoEstimado.label} dataset1='Custo' dataset2='Cativo' dataset3='Livre'
          title='' subtitle='' barLabel hashurado miniature/>
        </GraphCard>

        <GraphCard title='Indicador de Custo' subtitle='Valores em R$/ MWh'>
          <Chart title='' subtitle=''
          data1={costIndicator.filter((value, index) => value.mes.slice(4, 8).includes('2021'))}
          // data1={graphData}
          data2={costIndicator.filter((value, index) => value.mes.slice(4, 8).includes('2022'))}
          label={costIndicator.map(value => value.mes.slice(0, 3))} miniature/>
        </GraphCard>
      </section>
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
