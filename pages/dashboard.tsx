import React from 'react'

import { DashboardView } from '../styles/layouts/dashboard/DashboardView.js'

import MapCard from '../src/components/mapCard/MapCard'
import GraphCard from '../src/components/graph/graphCard/ChartCard'
import Header from '../src/components/header/Header'
import PageTitle from '../src/components/pageTitle/PageTitle'

export default function Dashboard() {
  return (
    <DashboardView>
      <Header name='' />
      <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
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
