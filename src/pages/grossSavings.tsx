import Head from 'next/head'
import React from 'react'

import Chart from '../components/graph/Chart'
import { SingleBar } from '../components/graph/SingleBar'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../services/economiaBruta'

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
