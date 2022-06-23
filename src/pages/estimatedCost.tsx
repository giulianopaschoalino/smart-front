import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import Chart from '../components/graph/Chart'
import { LineBarChart } from '../components/graph/LineBarChart'
import { LineBarChart2 } from '../components/graph/LineBarChart2'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { ConsumoEstimado } from '../services/consumoEstimado'
import getAPIClient from '../services/ssrApi'
import { EstimatedCostView } from '../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost({graphData, userName}: any) {
  return (
    <EstimatedCostView>
      <Head>
        <title>Smart Energia - Custos Estimados</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Cativo x Livre mensal' subtitle='Comparativo de Custo Estimado' />
      <section>
        <LineBarChart2 data1={graphData} data2={graphData} data3={graphData}
        dataset1="Economia (R$)" dataset2='Cativo' dataset3='Livre'
        label={ConsumoEstimado.label} title='Cativo x Livre mensal' subtitle='' barLabel hashurado />
      </section>
    </EstimatedCostView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let graphData = [];

  await apiClient.post('/economy/estimates').then(res => {
    graphData = res.data.data
    console.log(graphData)
  }).catch(res => {
    console.log(res)
  })

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      graphData,
      userName
    }
  }
}
