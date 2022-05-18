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
      <section>
        <LineChart title='Fator potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data4} data3={[]} data4={[]} label={FatorPotencia.label1} />
        <LineChart title='Consumo decretizado em 1 hora' subtitle='' data1={ConsumoDecretizadoLine.data} data2={[]} data3={[]} data4={[]} label={ConsumoDecretizadoLine.label1} />
        <SingleBar title='Consumo decretizado em 1 hora' subtitle='' dataProps={ConsumoDecretizadoBar.data} label={ConsumoDecretizadoBar.label} />
        <LineBarChart data1={ConsumoDecretizadoLine.data1} data2={ConsumoDecretizadoLine.data} data3={[]} label={ConsumoDecretizadoLine.label1} title='Demanda Contratada X Registrada' subtitle='' red/>
      </section>
    </ChatTelemetryView>
  )
}
