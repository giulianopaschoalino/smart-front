import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import Chart from '../../components/graph/Chart'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import getAPIClient from '../../services/ssrApi'
import { CostIndicatorView } from '../../styles/layouts/economy/costIndicator/CostIndicatorView'

export default function CostIndicator({graphData, userName}: any) {
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
    <CostIndicatorView>
      <Head>
        <title>Smart Energia - Indicador de Custos</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Indicador de Custo' subtitle='Indicador de Custo - Valores em R$/MWh'/>
      <section>
        <Chart title='' subtitle=''
        data1={graphData.filter((value, index) => value.mes.slice(4, 8).includes('2021'))}
        // data1={graphData}
        data2={graphData.filter((value, index) => value.mes.slice(4, 8).includes('2022'))}
        label={graphData.map(value => value.mes.slice(0, 3))} barLabel />
      </section>
    </CostIndicatorView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let graphData = [];

  await apiClient.post('/economy/MWh').then(res => {
    graphData = res.data.data
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
      userName
    }
  }
}
