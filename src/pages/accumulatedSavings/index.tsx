import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import Chart from '../../components/graph/Chart'
import { SingleBar } from '../../components/graph/SingleBar'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import { EconomiaAcumulada } from '../../services/economiaAcumulada'
import { dataEconomiaBruta } from '../../services/economiaBruta'
import getAPIClient from '../../services/ssrApi'
import { AccumulatedSavingsView } from '../../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'

export default function AccumulatedSavings({graphData, years, userName}: any) {
  return (
    <AccumulatedSavingsView>
      <Head>
        <title>Smart Energia - Economia Bruta Mensal</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Economia Bruta Mensal' subtitle='Economia Bruta Estimada e Acumulada mensal - Valores em R$ mil' />
      <section>
        <SingleBar title='' subtitle='' dataset='Consolidada'
          dataProps={graphData}
          label={years} barLabel/>
      </section>
    </AccumulatedSavingsView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let graphData = [];

  await apiClient.post('/economy/grossMonthly').then(res => {
    graphData = res.data.data
    // console.log(graphData[0].mes)
  }).catch(res => {
    console.log(res)
  })

  const years = graphData.map((value) => value.mes)

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
      years,
      userName
    }
  }
}
