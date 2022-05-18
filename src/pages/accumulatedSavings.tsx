import React from 'react'

import Chart from '../components/graph/Chart'
import { SingleBar } from '../components/graph/SingleBar'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { EconomiaAcumulada } from '../services/economiaAcumulada'

import { AccumulatedSavingsView } from '../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'

export default function AccumulatedSavings() {
  return (
    <AccumulatedSavingsView>
      <Header name='' />
      <PageTitle title='Economia Acumulada' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
      <section>
        <SingleBar title='Economia Bruta Estimada e Acumulada' subtitle='(Valores em R$ mil)' dataset='Consolidada' label={EconomiaAcumulada.label1}  dataProps={EconomiaAcumulada.data2} />
      </section>
    </AccumulatedSavingsView>
  )
}
