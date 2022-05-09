import React from 'react'

import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'
import { CostIndicatorView } from '../styles/layouts/economy/costIndicator/CostIndicatorView'

export default function CostIndicator() {
  return (
    <CostIndicatorView>
      <Header name='' />
      <section>
        <h1>Indicador de Custo</h1>
        <span>Valores em R$/MWh</span>
      </section>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </CostIndicatorView>
  )
}
