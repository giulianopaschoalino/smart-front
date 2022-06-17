import { GetServerSideProps } from 'next'
import Head from 'next/head'
import React from 'react'

import Chart from '../components/graph/Chart'
import { SingleBar } from '../components/graph/SingleBar'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../services/economiaBruta'
import getAPIClient from '../services/ssrApi'

import { GrossSavingsView } from '../styles/layouts/economy/grossSavings/GrossSavings'

export default function GrossSavings() {
  return (
    <GrossSavingsView>
      <Head>
        <title>Smart Energia - Economia Acumulada</title>
      </Head>
      <Header name='' />
      <PageTitle title='Economia Bruta' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
      <section>
        <SingleBar title='Economia Bruta' subtitle='(Valores em R$ mil)' label={dataEconomiaBruta.labels} dataset='Consolidada' dataset1='Estimada' dataProps={dataEconomiaBruta.data} barLabel year/>
      </section>
    </GrossSavingsView>
  )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let clients = [];
  let notifications = [];

  await apiClient.get('/user').then(res => {
    clients = res.data
  }).catch(res => {
    console.log(res)
  })

  await apiClient.get('/economy/grossAnnual').then(res => {
    grossSaving = res.data
    grossSaving.map(value)

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
      clients,
      grossSaving
    }
  }
}
