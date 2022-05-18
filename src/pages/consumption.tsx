import Head from 'next/head'
import React from 'react'
import Chart from '../components/graph/Chart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { dataEconomiaIndicador } from '../services/economiaIndicador'
import { ConsumptionView } from '../styles/layouts/consumption/ConsumptionView'

export default function Consumption() {
  return (
    <ConsumptionView>
      <Head>
        <title>Smart Energia - Consumo</title>
      </Head>
      <Header name='' />
      <PageTitle title='Consumo' subtitle='Análise de Consumo'/>
      <section>
        <Chart title='Indicador de Custo' subtitle='(Valores em R$/MWh)' data1={dataEconomiaIndicador.data1} data2={dataEconomiaIndicador.data2} label={dataEconomiaIndicador.labels} />
      </section>
    </ConsumptionView>
  )
}
