import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

// import Chart2 from '../../components/graph/Chart2'
import GrossMensalChart from '../../components/graph/grossMensalChart/GrossMensalChart'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'

import getAPIClient from '../../services/ssrApi'
import { AccumulatedSavingsView } from '../../styles/layouts/economy/accumulatedSavings/AccumulatedSavingsView'
import { getLastConsolidatedYear, populateGraphDataForYear } from '../../utils/dataProcessing'

export default function AccumulatedSavings({graphData, years, userName}: any) {
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez'
  ]

  const [processedData, setProcessedData] = useState(graphData)
  const [lastConsolidatedYear, setLastConsolidatedYear] = useState<number | null>(null)

  useEffect(() => {
    // Calculate the last consolidated year
    const lastYear = getLastConsolidatedYear(graphData, true)
    setLastConsolidatedYear(lastYear)

    // Populate graph data with consolidated and estimated data for that year
    const populatedData = populateGraphDataForYear(graphData, lastYear)
    setProcessedData(populatedData)
  }, [graphData])

  return (
    <AccumulatedSavingsView>
      <Head>
        <title>Smart Energia - Economia Bruta Mensal</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Economia Bruta Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - Valores em R$ x mil' />
      </Header>
      <section>
        <GrossMensalChart title='' subtitle=''
          data1={processedData}
          data2={processedData}
          label={months}
        />
        {/* <SingleBar title='' subtitle='' dataset='Consolidada'
          dataProps={graphData}
          label={years} barLabel/> */}
      </section>
    </AccumulatedSavingsView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let graphData = [];

  await apiClient.post('/economy/grossMonthly').then(res => {
    graphData = res.data.data
  })
  const years = graphData.map((value) => value.mes)

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
      years,
      userName
    }
  }
}
