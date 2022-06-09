import Button from '@material-ui/core/Button'
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader'
import Chart from '../../../components/graph/Chart'
import { SingleBar } from '../../../components/graph/SingleBar'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { dataEconomiaBruta } from '../../../services/economiaBruta'
import { GrossSavingsView } from '../../../styles/layouts/economy/grossSavings/GrossSavings'

export default function GrossSavings() {
  return (
    <>
    <Head>
      <title>Smart Energia - Economia Acumulada</title>
    </Head>
    <AdministrativeHeader />
    <GrossSavingsView>
      <PageTitle title='Economia Bruta' subtitle='Economia Bruta Estimada e Acumulada anual (Valores em R$ mil)' />
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
        <SingleBar title='Economia Bruta' subtitle='(Valores em R$ mil)' label={dataEconomiaBruta.labels} dataset='Consolidada' dataset1='Estimada' dataProps={dataEconomiaBruta.data} barLabel year/>
      </section>
    </GrossSavingsView>
    </>
  )
}
