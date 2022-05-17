import React from 'react'

import Chart from '../components/graph/Chart'
import { LineBarChart } from '../components/graph/LineBarChart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { ConsumoEstimado } from '../services/consumoEstimado'

import { EstimatedCostView } from '../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost() {
  return (
    <EstimatedCostView>
      <Header name='' />
      <PageTitle title='Custos Estimados' subtitle='Comparativo de Custo Estimado' />
      <section>
        <LineBarChart data1={ConsumoEstimado.data2} data2={ConsumoEstimado.data} data3={ConsumoEstimado.data1} label={ConsumoEstimado.label} title='evolução pld' subtitle='' />
      </section>
    </EstimatedCostView>
  )
}
