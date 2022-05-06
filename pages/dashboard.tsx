import React from 'react'

import { DashboardView } from '../styles/layouts/Dashboard/DashboardView'
import MapCard from '../src/components/mapCard/MapCard'
import GraphCard from '../src/components/graph/graphCard/GraphCard'
import Sidebar from '../src/components/sidebar/Sidebar'

export default function Dashboard() {
  return (
    <div style={{
      'display': 'flex',
      'flexDirection': 'row'
    }}>
      <Sidebar />
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
        </section>
      </DashboardView>
    </div>
  )
}
