import React from 'react'

import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'

import { EstimatedCostView } from '../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost() {
  return (
    <EstimatedCostView>
      <Header name='' />
      <section>
        <h1>Custo Estimado</h1>
        <span>Comparativo de Custo Estimado</span>
      </section>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </EstimatedCostView>
  )
}
