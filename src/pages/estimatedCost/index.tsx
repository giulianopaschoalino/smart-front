import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'

import { LineBarChart2 } from '../../components/graph/LineBarChart2'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import { ConsumoEstimado } from '../../services/consumoEstimado'
import getAPIClient from '../../services/ssrApi'
import { EstimatedCostView } from '../../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost({graphData, userName}: any) {
  return (
    <EstimatedCostView>
      <Head>
        <title>Smart Energia - Custos Estimados</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Cativo x Livre Mensal' subtitle='Comparativo de Custo Estimado - Valores em R$ x mil' />
      </Header>
      <section>
        <LineBarChart2 data1={graphData} data2={graphData} data3={graphData}
        dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
        label={ConsumoEstimado.label} title='' subtitle='' barLabel hashurado />
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
  }).catch(res => {
    // console.log(res)
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
