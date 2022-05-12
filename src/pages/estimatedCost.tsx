import React from 'react'

import Chart from '../components/graph/Chart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'

import { EstimatedCostView } from '../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost() {
  return (
    <EstimatedCostView>
      <Header name='' />
      <PageTitle title='Custos Estimados' subtitle='Comparativo de Custo Estimado' />
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </EstimatedCostView>
  )
}
