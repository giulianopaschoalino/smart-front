import React, { useEffect, useState } from 'react'

import { DashboardView } from '../../styles/layouts/dashboard/DashboardView'

import MapCard from '../../components/mapCard/MapCard'
import GraphCard from '../../components/graph/graphCard/ChartCard'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import Link from 'next/link'

import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import getAPIClient from '../../services/ssrApi'
import { GrossAnualChart } from '../../components/graph/grossAnualChart/GrossAnualChart'
import CostIndicatorChart from '../../components/graph/costIndicatorChart'
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart'
import GrossMensalChart from '../../components/graph/grossMensalChart/GrossMensalChart'
import Head from 'next/head'

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

  const [lastDataBrutaMensalS, setLastDataBrutaMensal] = useState('')
  const [lastDataBrutaAnualS, setLastDataBrutaAnual] = useState('')
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
            <GraphCard title='Economia Anual' subtitle='Economia Bruta Estimada e Acumulada Anual - Valores em R$ x mil'>
            <b>Economia Acumulada: <p>R${lastDataBrutaMensalS}</p></b>
              <GrossAnualChart title='' subtitle=''
                dataset='Consolidada'
                dataProps={grossAnualGraph}
                label={grossAnualYears} barLabel bruta miniature/>
            </GraphCard>

            <GraphCard title='Economia Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - Valores em R$ x mil'>
              <b>Economia Acumulada: <p>R${lastDataBrutaMensalS}</p></b>
              <GrossMensalChart title='' subtitle=''
                data1={grossMensalGraph}
                data2={grossMensalGraph}
                label={grossMensalGraph.map((value) => value.mes)}
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
                data1={costIndicator.filter((value, index) => value.mes.slice(0, 4).includes('2021'))}
                // data1={graphData}
                data2={costIndicator.filter((value, index) => value.mes.slice(0, 4).includes('2022'))}
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
