import React from 'react'
import { SingleBar } from '../components/graph/SingleBar'
import { ChatTelemetryView } from '../styles/layouts/ChatTelemetry/ChatTelemetryView'
import { useRouter } from 'next/router'

import { FatorPotencia } from '../services/fatorPotencia'
import { ConsumoDecretizadoBar } from '../services/consumoDiscretizadoBar'
import { ConsumoDecretizadoLine } from '../services/consumoDiscretizadoLine'
import LineChart from '../components/graph/LineChart'
import { LineBarChart } from '../components/graph/LineBarChart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'

export default function chartTelemetry() {

  return (
    <ChatTelemetryView>
      <Header name='' />
      <PageTitle title='Telemetria - Graficos' subtitle='Gráficos' />
      <section className='chartContainer' >
        <LineChart title='Fator de Potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data4} data3={[]} data4={[]} dataset1='Fator de Potencia' label={FatorPotencia.label1} />
        <LineChart title='Consumo decretizado em 1 hora' subtitle='' data1={ConsumoDecretizadoLine.data} data2={[]} data3={[]} data4={[]} dataset1='Demanda registrada' label={ConsumoDecretizadoLine.label1} />
        <SingleBar title='Consumo decretizado em 1 hora' subtitle='' dataProps={ConsumoDecretizadoBar.data} label={ConsumoDecretizadoBar.label} dataset={'Consumo'} />
        <LineBarChart data1={ConsumoDecretizadoLine.data1} data3={ConsumoDecretizadoLine.data} dataset1={'Demanda contratada + 5%'} dataset2={'barra1'} dataset3={'2021'} label={ConsumoDecretizadoLine.label1} title='Demanda Contratada X Registrada' subtitle='' red/>
      </section>
    </ChatTelemetryView>
  )
}
