import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import Chart2 from '../../components/graph/Chart2'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'

import getAPIClient from '../../services/ssrApi'
import { AccumulatedSavingsView } from '../../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'

export default function AccumulatedSavings({graphData, years, userName}: any) {
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
    <AccumulatedSavingsView>
      <Head>
        <title>Smart Energia - Economia Bruta Mensal</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Economia Bruta Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - Valores em R$ mil' />
      </Header>
      <section>
        <Chart2 title='' subtitle=''
        data1={graphData.filter((value, index) => value.mes.slice(3, 8).includes('2021'))}
        data2={graphData.filter((value, index) => value.mes.slice(3, 8).includes('2022'))}
        label={months}/>
        {/* <SingleBar title='' subtitle='' dataset='Consolidada'
          dataProps={graphData}
          label={years} barLabel/> */}
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
    // console.log(res)
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
