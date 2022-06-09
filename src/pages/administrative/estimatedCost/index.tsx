import Button from '@material-ui/core/Button'
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader'
import Chart from '../../../components/graph/Chart'
import { LineBarChart } from '../../../components/graph/LineBarChart'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { ConsumoEstimado } from '../../../services/consumoEstimado'
import { EstimatedCostView } from '../../../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost() {
  return (
    <>
    <Head>
      <title>Smart Energia - Custos Estimados</title>
    </Head>
    <AdministrativeHeader />
    <EstimatedCostView>
      <PageTitle title='Custos Estimados' subtitle='Comparativo de Custo Estimado' />
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
        <LineBarChart data1={ConsumoEstimado.data2} data2={ConsumoEstimado.data} data3={ConsumoEstimado.data1} dataset1="Economia (R$)" dataset2='Cativo' dataset3='Livre' label={ConsumoEstimado.label} title='Custo Estimado' subtitle='' barLabel hashurado />
      </section>
    </EstimatedCostView>
    </>
  )
}
