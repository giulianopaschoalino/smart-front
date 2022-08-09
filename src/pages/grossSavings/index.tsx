import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { GrossAnualChart } from '../../components/graph/grossAnualChart/GrossAnualChart'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import getAPIClient from '../../services/ssrApi'

import { GrossSavingsView } from '../../styles/layouts/economy/grossSavings/GrossSavings'

export default function GrossSavings({graphData, years, userName}: any) {
  return (
    <GrossSavingsView>
      <Head>
        <title>Smart Energia - Economia Acumulada</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Economia Bruta Anual' subtitle='Economia Bruta Estimada e Acumulada Anual - Valores em R$ x mil' />
      </Header>
      <section>
        <GrossAnualChart title='' subtitle=''
        dataset='Consolidada'

        dataProps={graphData}
        label={years} barLabel bruta/>

      </section>
    </GrossSavingsView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let graphData = [];

  await apiClient.post('/economy/grossAnnual').then(res => {
    graphData = res.data.data
    // console.log(graphData[0])
  }).catch(res => {
    // console.log(res)
  })

  const years = graphData.map((value) => value.ano)

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
