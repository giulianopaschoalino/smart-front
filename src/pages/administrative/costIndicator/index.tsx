import Button from '@material-ui/core/Button'
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader'
import Chart from '../../../components/graph/Chart'
import { SingleBar } from '../../../components/graph/SingleBar'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../../../services/economiaBruta'
import { dataEconomiaIndicador } from '../../../services/economiaIndicador'
import { CostIndicatorView } from '../../../styles/layouts/economy/costIndicator/CostIndicatorView'

export default function CostIndicator() {
  return (
    <CostIndicatorView>
      <Head>
        <title>Smart Energia - Indicador de Custos</title>
      </Head>
      <AdministrativeHeader />
      <PageTitle title='Indicador de Custo' subtitle='Valores em R$/MWh'/>
      <Button
        variant="contained"
        component="label"
        style={{width: '300px', margin: '30px'}}
      >
        Upload de dados
        <input
          type="file"
          hidden
        />
      </Button>
      <section>
        <Chart title='Indicador de Custo' subtitle='(Valores em R$/MWh)' data1={dataEconomiaIndicador.data1} data2={dataEconomiaIndicador.data2} label={dataEconomiaIndicador.labels} barLabel />
      </section>
    </CostIndicatorView>
  )
}
