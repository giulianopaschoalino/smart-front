import React from 'react'

import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'

import { GrossSavingsView } from '../styles/layouts/economy/grossSavings/GrossSavings'

export default function GrossSavings() {
  return (
    <GrossSavingsView>
      <Header name='' />
      <section>
        <h1>Economia Bruta</h1>
        <span>Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)</span>
      </section>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </GrossSavingsView>
  )
}
