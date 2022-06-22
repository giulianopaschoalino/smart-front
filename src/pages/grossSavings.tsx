import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import Chart from '../components/graph/Chart'
import { SingleBar } from '../components/graph/SingleBar'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../services/economiaBruta'
import getAPIClient from '../services/ssrApi'

import { GrossSavingsView } from '../styles/layouts/economy/grossSavings/GrossSavings'

function addMissingMonths(data) {
  // console.log(data[0].mes.slice(1, 1))
}

function verifyDataByYear(data) {
  if (data.length === 12)
    return true
  else
    return false
}

export default function GrossSavings({graphData, years, userName}: any) {
  return (
    <GrossSavingsView>
      <Head>
        <title>Smart Energia - Economia Acumulada</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Economia Bruta Anual' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
      <section>
        <SingleBar title='Economia Bruta' subtitle='(Valores em R$ mil)'
        dataset='Consolidada' dataset1='Estimada'

        dataProps={graphData}
        label={years} barLabel year/>

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
    console.log(res)
  })

  const years = graphData.map((value) => value.ano)
  console.log(years)
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
