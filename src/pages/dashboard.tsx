import React from 'react'

import { DashboardView } from '../styles/layouts/dashboard/DashboardView'

import MapCard from '../components/mapCard/MapCard'
import GraphCard from '../components/graph/graphCard/ChartCard'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import Link from 'next/link'
import LineChart from '../components/graph/LineChart'
import { SingleBar } from '../components/graph/SingleBar'

import { dataEconomiaBruta } from '../services/economiaBruta'
import { dataEconomiaIndicador } from '../services/economiaIndicador'
import { EconomiaAcumulada } from '../services/economiaAcumulada'
import Chart from '../components/graph/Chart'
import { LineBarChart } from '../components/graph/LineBarChart'
import { ConsumoEstimado } from '../services/consumoEstimado'

export default function Dashboard() {

  return (
    <DashboardView>
      <Header name='' />
      <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      <Link href={'pld'} >
        <section className="cardsSection" >
          <MapCard title='R$/MWh' subtitle='abril / 22' statistic='' imgSource='/moneyIcon.svg' />
          <MapCard title='SE/CO' subtitle='Sudeste' statistic='R$ 273,54' imgSource='/mapSample.svg' />
          <MapCard title='S' subtitle='Sul' statistic='R$ 273,54' imgSource='/SUL.svg' />
          <MapCard title='NE' subtitle='Nordeste' statistic='R$ 273,54' imgSource='/nordeste.svg' />
          <MapCard title='N' subtitle='Norte' statistic='R$ 273,54' imgSource='/norte.svg' />
        </section>
      </Link>

      <section className='dashboard'>
        <GraphCard title='Consumo' subtitle='Gráfico de Consumo' consumption={25} line>
          <LineChart data1={EconomiaAcumulada.data2} title='Economia Bruta' dataset1='Estimada' subtitle='' label={EconomiaAcumulada.label1} />
        </GraphCard>
        <GraphCard title='Economia Acumulado' subtitle='Economia Acumulado' singleBar>
          <SingleBar title='Economia Bruta Estimada e Acumulada' subtitle='(Valores em R$ mil)' dataset='Acumulada' label={EconomiaAcumulada.label1}  dataProps={EconomiaAcumulada.data2} />
        </GraphCard>
        <GraphCard title='Custos Estimados' subtitle='Custos Estimados em R$/MWh' singleBar>
          <LineBarChart data1={ConsumoEstimado.data2} data2={ConsumoEstimado.data} data3={ConsumoEstimado.data1} label={ConsumoEstimado.label} dataset1='Custo' dataset2='2020' dataset3='2021' title='Custo Estimado' subtitle='' />
        </GraphCard>
        <GraphCard title='Indicador de Custo' subtitle='Valores em R$/ MWh'>
          <Chart title='Indicador de Custo' subtitle='(Valores em R$/MWh)' data1={dataEconomiaIndicador.data1} data2={dataEconomiaIndicador.data2} label={dataEconomiaIndicador.labels} />
        </GraphCard>
      </section>
    </DashboardView>
  )
}
