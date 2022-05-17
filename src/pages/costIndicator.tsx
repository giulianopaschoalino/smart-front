import React from 'react'

import Chart from '../components/graph/Chart'
import { SingleBar } from '../components/graph/SingleBar'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../services/economiaBruta'
import { dataEconomiaIndicador } from '../services/economiaIndicador'
import { CostIndicatorView } from '../styles/layouts/economy/costIndicator/CostIndicatorView'

export default function CostIndicator() {
  return (
    <CostIndicatorView>
      <Header name='' />
      <PageTitle title='Indicador de Custo' subtitle='Valores em R$/MWh'/>
      <section>
        <Chart title='Indicador de Custo' subtitle='(Valores em R$/MWh)' data1={dataEconomiaIndicador.data1} data2={dataEconomiaIndicador.data2} label={dataEconomiaIndicador.labels} />
      </section>
    </CostIndicatorView>
  )
}
