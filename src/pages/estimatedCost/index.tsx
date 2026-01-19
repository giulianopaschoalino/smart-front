import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart'

// material ui imports
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import getAPIClient from '../../services/ssrApi'
import { EstimatedCostView } from '../../styles/layouts/economy/estimatedCost/EstimatedCostView'

import { api } from '../../services/api'
import { getLastConsolidatedYear, populateGraphDataForYear } from '../../utils/dataProcessing'

export default function EstimatedCost({graphData, userName, clients}: any) {
  const [unity, setUnity] = useState<string>(null);

  const [graphDataState, setGraphDataState] = useState(null);
  const [processedGraphData, setProcessedGraphData] = useState(graphData)
  const [lastConsolidatedYear, setLastConsolidatedYear] = useState<number | null>(null)

  useEffect(() => {
    // Calculate the last consolidated year
    const lastYear = getLastConsolidatedYear(graphData, true)
    setLastConsolidatedYear(lastYear)

    // Populate graph data with consolidated and estimated data for that year
    const populatedData = populateGraphDataForYear(graphData, lastYear)
    setProcessedGraphData(populatedData)
  }, [graphData])

  useEffect(() => {
    api.post('/economy/estimates', unity!==''?{
      "filters": [
        {"type" : "=", "field":"dados_cadastrais.cod_smart_unidade", "value": unity}
      ]
    }:{}).then(res => {
      // Apply data processing to filtered result
      if (res.data.data && res.data.data.length > 0) {
        const lastYear = getLastConsolidatedYear(res.data.data, true)
        const populatedData = populateGraphDataForYear(res.data.data, lastYear)
        setGraphDataState(populatedData)
      } else {
        setGraphDataState(res.data.data)
      }
    })
  }, [unity])

  return (
    <EstimatedCostView>
      <Head>
        <title>Smart Energia - Custos Estimados</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Cativo x Livre Mensal' subtitle='Comparativo de Custo Estimado - Valores em R$ x mil' />
      </Header>
      <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
        <InputLabel id="demo-select-small">Unidade</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          value={unity}
          label="Unidade"
          onChange={value => setUnity(value.target.value)}
          fullWidth
        >
          <MenuItem value="">Todas</MenuItem>
          {/* <MenuItem value="RSZFNAENTR101P">RSZFNAENTR101P</MenuItem> !!OPÇAO COM DADOS TESTES!! */}
          {
            clients.map((value) => {
              return <MenuItem key={1} value={value.cod_smart_unidade}>{value.unidade}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <section>
        <CativoXLivreChart chartData={unity!==null? graphDataState : processedGraphData}
        dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
        label={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} title='' subtitle='' barLabel hashurado/>
      </section>
    </EstimatedCostView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-client_id']: client_id } = parseCookies(ctx)

  let graphData = [];
  let clients = [];

  await apiClient.post('/units', {
		"filters": [
			{"type" : "=", "field": "dados_cadastrais.cod_smart_cliente", "value": client_id},
			{"type" : "not_in", "field": "dados_cadastrais.codigo_scde", "value":["0P"]}
		],
		"fields": [
			"unidade",
			"cod_smart_unidade",
			"codigo_scde"],
		"distinct": true
}).then(res => {
  clients = res.data.data
})
  await apiClient.post('/economy/estimates').then(res => {
    graphData = res.data.data
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
      clients,
      graphData,
      userName
    }
  }
}
