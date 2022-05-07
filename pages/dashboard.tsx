import React from 'react'

import { DashboardView } from '../styles/layouts/Dashboard/DashboardView'
import MapCard from '../src/components/mapCard/MapCard'
import GraphCard from '../src/components/graph/graphCard/GraphCard'

export default function Dashboard() {
  return (
    <DashboardView>
      <h1>Visão Geral</h1>
      <span>Bem Vindo a Smart Energia</span>
      <section className="cardsSection" >
        <MapCard title='R$/MWh' subtitle='abril / 22' statistic='' imgSource='/moneyIcon.svg' />
        <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
        <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
        <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
        <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
      </section>

      <section className='dashboard'>
        <GraphCard title='Consumo' subtitle='Gráfico de Consumo' consumption={25} />
        <GraphCard title='Consumo' subtitle='Gráfico de Consumo' />
        <GraphCard title='Consumo' subtitle='Gráfico de Consumo' className='footerGraph' />
      </section>
    </DashboardView>
  )
}
