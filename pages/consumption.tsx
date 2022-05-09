import React from 'react'
import Chart from '../src/components/graph/Chart'
import Header from '../src/components/header/Header'
import { ConsumptionView } from '../styles/layouts/consumption/ConsumptionView'

export default function Consumption() {
  return (
    <ConsumptionView>
      <Header name='' />
      <section>
        <h1>Consumo</h1>
        <span>Análise de Consumo</span>
      </section>
      <section>
        <Chart title='Indicador de custo' />
      </section>
    </ConsumptionView>
  )
}
