import React from 'react'

import Chart from '../components/graph/Chart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'

import { AccumulatedSavingsView } from '../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'

export default function AccumulatedSavings() {
  return (
    <AccumulatedSavingsView>
      <Header name='' />
      <PageTitle title='Economia Acumulada' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </AccumulatedSavingsView>
  )
}
