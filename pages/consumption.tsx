import React from 'react'
import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'
import PageTitle from '../src/components/pageTitle/PageTitle'
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
