import React from 'react'

import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'
import PageTitle from '../src/components/pageTitle/PageTitle'
import { CostIndicatorView } from '../styles/layouts/economy/costIndicator/CostIndicatorView'

export default function CostIndicator() {
  return (
    <CostIndicatorView>
      <Header name='' />
      <PageTitle title='Indicador de Custo' subtitle='Valores em R$/MWh'/>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </CostIndicatorView>
  )
}
