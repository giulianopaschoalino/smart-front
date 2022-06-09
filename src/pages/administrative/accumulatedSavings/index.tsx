import Button from '@material-ui/core/Button'
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader'
import Chart from '../../../components/graph/Chart'
import { SingleBar } from '../../../components/graph/SingleBar'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { EconomiaAcumulada } from '../../../services/economiaAcumulada'
import { dataEconomiaBruta } from '../../../services/economiaBruta'
import { AccumulatedSavingsView } from '../../../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'

export default function AccumulatedSavings() {
  return (
    <AccumulatedSavingsView>
      <Head>
        <title>Smart Energia - Economia Acumulada</title>
      </Head>
      <AdministrativeHeader />
      <PageTitle title='Economia Acumulada' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
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
        <SingleBar title='Economia Bruta Estimada e Acumulada' subtitle='(Valores em R$ mil)' dataset='Consolidada'
          dataset1='Estimada' label={EconomiaAcumulada.label}  dataProps={EconomiaAcumulada.data2} barLabel month/>
      </section>
    </AccumulatedSavingsView>
  )
}
