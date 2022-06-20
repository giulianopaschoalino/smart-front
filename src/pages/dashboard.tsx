import React from 'react'

import { DashboardView } from '../styles/layouts/dashboard/DashboardView'

import MapCard from '../components/mapCard/MapCard'
import GraphCard from '../components/graph/graphCard/ChartCard'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import Link from 'next/link'
import LineChart from '../components/graph/LineChart'
import { SingleBar } from '../components/graph/SingleBar'

import { dataEconomiaBruta } from '../services/economiaBruta'
import { dataEconomiaIndicador } from '../services/economiaIndicador'
import { EconomiaAcumulada } from '../services/economiaAcumulada'
import Chart from '../components/graph/Chart'
import { LineBarChart } from '../components/graph/LineBarChart'
import { LineBarChart2 } from '../components/graph/LineBarChart2'
import { ConsumoEstimado } from '../services/consumoEstimado'
import Head from 'next/head'
import recoverUserInformation from '../services/auth'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import getAPIClient from '../services/ssrApi'

export default function Dashboard({grossAnualGraph, grossAnualYears, grossMensalGraph, grossMensalYears, acumulatedGraph, mapsInfo} : any) {
  return (
    <DashboardView>
      <Head>
        <title>Smart Energia - Dashboard</title>
      </Head>
      <Header name='' />

      <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      <Link href='pld'>
        <section className="cardsSection" >
          <MapCard title='R$/MWh' subtitle='abril / 22' date='até 10/10' statistic='' imgSource='/moneyIcon.svg' />
          {
            mapsInfo.map(value => {
              return <MapCard key={value.submarket} title='S' subtitle={value.submarket} statistic={parseFloat(value.value).toFixed(2)} imgSource='/SUL.svg' />
            })
          }
          {/* <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
          <MapCard title='S' subtitle='Sul' statistic='R$ 273,54' imgSource='/SUL.svg' />
          <MapCard title='NE' subtitle='Nordeste' statistic='R$ 273,54' imgSource='/nordeste.svg' />
          <MapCard title='N' subtitle='Norte' statistic='R$ 273,54' imgSource='/norte.svg' /> */}
        </section>
      </Link>

      <section className='dashboard'>
        <GraphCard title='Consumo' subtitle='Gráfico de Consumo'>
          <SingleBar title='Economia Bruta' subtitle='(Valores em R$ mil)'
          dataset='Consolidada' dataset1='Estimada'
          dataProps={grossAnualGraph}
          label={grossAnualYears} barLabel year/>
        </GraphCard>

        <GraphCard title='Economia Acumulado' subtitle='Economia Acumulada' singleBar>
          <SingleBar title='Economia Bruta Estimada e Acumulada' subtitle='(Valores em R$)'
          dataset='Acumulada' dataset1='Estimado'
          dataProps={grossMensalGraph}
          label={grossMensalYears}
          barLabel month/>
        </GraphCard>

        <GraphCard title='Custos Estimados' subtitle='Custos Estimados em R$/MWh' singleBar>
          <LineBarChart2 data1={acumulatedGraph} data2={acumulatedGraph} data3={acumulatedGraph}
          label={ConsumoEstimado.label} dataset1='Custo' dataset2='Cativo' dataset3='Livre'
          title='Custo Estimado' subtitle='(Valores em R$/MWh)' barLabel hashurado/>
        </GraphCard>

        <GraphCard title='Indicador de Custo' subtitle='Valores em R$/ MWh'>
          <Chart title='Indicador de Custo' subtitle='(Valores em R$/MWh)' data1={dataEconomiaIndicador.data1} data2={dataEconomiaIndicador.data2}
          label={dataEconomiaIndicador.labels} barLabel/>
        </GraphCard>
      </section>

      <button onClick={() => {
        const id = 1
      }}></button>
    </DashboardView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let grossAnualGraph = [];
  let grossMensalGraph = [];
  let acumulatedGraph = [];
  let mapsInfo = [];

  await apiClient.post('/economy/grossAnnual').then(res => {
    grossAnualGraph = res.data.data
  }).catch(res => {
    console.log(res)
  })

  await apiClient.post('/economy/grossMonthly').then(res => {
    grossMensalGraph = res.data.data
  }).catch(res => {
    console.log(res)
  })

  await apiClient.post('/economy/estimates').then(res => {
    acumulatedGraph = res.data.data
  }).catch(res => {
    console.log(res)
  })

  await apiClient.post('/pld/overview').then(res => {
    mapsInfo = res.data.data
  }).catch(res => {
    console.log(res)
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
      mapsInfo
    }
  }
}
