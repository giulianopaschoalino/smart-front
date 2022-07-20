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
import { GrossAnualChart } from '../../components/graph/grossAnualChart/GrossAnualChart'
import CostIndicatorChart from '../../components/graph/costIndicatorChart'
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart'
import GrossMensalChart from '../../components/graph/grossMensalChart/GrossMensalChart'

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
        <title>Smart Energia - Visão Geral</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      </Header>

      <Link href='pld'>
        <section className="cardsSection" >
          <MapCard title='R$/MWh' subtitle='' date={`${new Date().getUTCMonth()+1}/${new Date().getUTCFullYear()}`} statistic='' imgSource='/moneyIcon.svg' />
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
            <GraphCard title='Economia Bruta Anual' subtitle='Economia Bruta Estimada e Acumulada Anual - Valores em R$ x mil'>
              <GrossAnualChart title='' subtitle=''
                dataset='Consolidada'
                dataProps={grossAnualGraph}
                label={grossAnualYears} barLabel bruta miniature/>
            </GraphCard>

            <GraphCard title='Economia Bruta Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - Valores em R$ x mil' singleBar>
            <GrossMensalChart title='' subtitle=''
              data1={grossMensalGraph}
              data2={grossMensalGraph}
              label={grossMensalGraph.map((value) => value.mes)}
              miniature
            />
            </GraphCard>

            <GraphCard title='Cativo x Livre Mensal' subtitle='Comparativo de Custo Estimado - Valores em R$ x mil' singleBar>
              <CativoXLivreChart chartData={acumulatedGraph}
                dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
                label={ConsumoEstimado.label} title='' subtitle='' barLabel hashurado miniature/>
            </GraphCard>

            <GraphCard title='Indicador de Custo' subtitle='Indicador de Custo - Valores em R$/MWh'>
              <CostIndicatorChart title='' subtitle=''
                data1={costIndicator.filter((value, index) => value.mes.slice(4, 8).includes('2021'))}
                // data1={graphData}
                data2={costIndicator.filter((value, index) => value.mes.slice(4, 8).includes('2022'))}
                label={months}
                miniature
              />
            </GraphCard>
          </section>
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
