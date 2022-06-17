import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import Chart from '../components/graph/Chart'
import { SingleBar } from '../components/graph/SingleBar'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../services/economiaBruta'
import { dataEconomiaIndicador } from '../services/economiaIndicador'
import getAPIClient from '../services/ssrApi'
import { CostIndicatorView } from '../styles/layouts/economy/costIndicator/CostIndicatorView'

function addMissingMonths(data) {
  console.log(data[0].mes.slice(1, 1))
}

function verifyDataByYear(data) {
  if (data.length === 12)
    return true
  else
    return false
}

export default function CostIndicator({graphData}: any) {
  console.log(graphData.filter((value, index) => value.mes.slice(3, 7).includes('2021')).map(value => value.custo_unit))

  return (
    <CostIndicatorView>
      <Head>
        <title>Smart Energia - Indicador de Custos</title>
      </Head>
      <Header name='' />
      <PageTitle title='Indicador de Custo' subtitle='Valores em R$/MWh'/>
      <section>
        <Chart title='Indicador de Custo' subtitle='(Valores em R$/MWh)' data1={graphData.filter((value, index) => value.mes.slice(3, 7).includes('2021'))}
        data2={graphData.filter((value, index) => value.mes.slice(3, 7).includes('2022'))}
        label={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'ago', 'set', 'out', 'nov', 'dez']} barLabel />
      </section>
    </CostIndicatorView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let graphData = [];

  await apiClient.post('/economy/MWh').then(res => {
    graphData = res.data.data
    console.log(graphData[0].mes)
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
      graphData,
    }
  }
}
