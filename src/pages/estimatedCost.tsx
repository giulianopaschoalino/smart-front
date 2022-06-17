import Head from 'next/head'
import React from 'react'

import Chart from '../components/graph/Chart'
import { LineBarChart } from '../components/graph/LineBarChart'
import { LineBarChart2 } from '../components/graph/LineBarChart2'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { ConsumoEstimado } from '../services/consumoEstimado'
import { EstimatedCostView } from '../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost() {
  return (
    <EstimatedCostView>
      <Head>
        <title>Smart Energia - Custos Estimados</title>
      </Head>
      <Header name='' />
      <PageTitle title='Cativo x Livre mensal' subtitle='Comparativo de Custo Estimado' />
      <section>
        <LineBarChart2 data1={ConsumoEstimado.data2} data2={ConsumoEstimado.data} data3={ConsumoEstimado.data1} dataset1="Economia (R$)" dataset2='Cativo' dataset3='Livre' label={ConsumoEstimado.label} title='Custo Estimado' subtitle='' barLabel hashurado />
      </section>
    </EstimatedCostView>
  )
}
