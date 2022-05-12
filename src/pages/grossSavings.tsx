import React from 'react'

import Chart from '../components/graph/Chart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'

import { GrossSavingsView } from '../styles/layouts/economy/grossSavings/GrossSavings'

export default function GrossSavings() {
  return (
    <GrossSavingsView>
      <Header name='' />
      <PageTitle title='Economia Bruta' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </GrossSavingsView>
  )
}
