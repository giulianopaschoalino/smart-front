import React from 'react'

import { DashboardView } from '../styles/layouts/dashboard/DashboardView'

import MapCard from '../components/mapCard/MapCard'
import GraphCard from '../components/graph/graphCard/ChartCard'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import Link from 'next/link'
import LineChart from '../components/graph/LineChart'

export default function Dashboard() {

  return (
    <DashboardView>
      <Header name='' />
      <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      <Link href={'pld'} >
        <section className="cardsSection" >
            <MapCard title='R$/MWh' subtitle='abril / 22' statistic='' imgSource='/moneyIcon.svg' />
            <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
            <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
            <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
            <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
        </section>
      </Link>

      <section className='dashboard'>
        <GraphCard title='Consumo' subtitle='Gráfico de Consumo' consumption={25} line>
          {/* <LineChart datas={dataEconomia} /> */}
        </GraphCard>
        <GraphCard title='Indicador de Custo' subtitle='Valores em R$/ MWh' />
        <GraphCard title='Economia Acumulado' subtitle='Economia Acumulado' className='footerGraph' singleBar />
      </section>
    </DashboardView>
  )
}
