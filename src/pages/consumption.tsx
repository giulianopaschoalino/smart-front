import React from 'react'
import Chart from '../components/graph/Chart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { ConsumptionView } from '../styles/layouts/consumption/ConsumptionView'

export default function Consumption() {
  return (
    <ConsumptionView>
      <Header name='' />
      <PageTitle title='Consumo' subtitle='Análise de Consumo'/>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </ConsumptionView>
  )
}
