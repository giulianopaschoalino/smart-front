import React from 'react'

import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'

import { AccumulatedSavingsView } from '../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'

export default function AccumulatedSavings() {
  return (
    <AccumulatedSavingsView>
      <Header name='' />
      <section>
        <h1>Economia Acumulada</h1>
        <span>Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)</span>
      </section>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </AccumulatedSavingsView>
  )
}
