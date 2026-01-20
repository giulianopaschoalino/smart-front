import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

// material ui imports
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CostIndicatorChart from '../../components/graph/costIndicatorChart'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import getAPIClient from '../../services/ssrApi'
import { CostIndicatorView } from '../../styles/layouts/economy/costIndicator/CostIndicatorView'
import { api } from '../../services/api';
import { getLastConsolidatedYear, populateGraphDataForYear } from '../../utils/dataProcessing'

export default function CostIndicator({graphData, userName, clients}: any) {
  const [unity, setUnity] = useState('');

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

  const [graphDataState, setGraphDataState] = useState([]);
  const [processedGraphData, setProcessedGraphData] = useState(graphData)
  const [lastConsolidatedYear, setLastConsolidatedYear] = useState<number | null>(null)

  useEffect(() => {
    // Calculate the last consolidated year
    const lastYear = getLastConsolidatedYear(graphData, true)
    console.log('Last Consolidated Year:', lastYear)
    console.log('Graph Data:', graphData)
    setLastConsolidatedYear(lastYear)

    // Keep the full dataset to show both years
    setProcessedGraphData(graphData)
  }, [graphData])

  useEffect(() => {
    api.post('/economy/estimates', unity!==''?{
      "filters": [
        {"type" : "=", "field":"dados_cadastrais.cod_smart_unidade", "value": unity}
      ]
    }:{}).then(res => {
      // Keep full dataset without filtering by year
      if (res.data.data && res.data.data.length > 0) {
        const lastYear = getLastConsolidatedYear(res.data.data, true)
        setLastConsolidatedYear(lastYear)
        setGraphDataState(res.data.data)
      } else {
        setGraphDataState(res.data.data)
      }
    })
  }, [unity])

  return (
    <CostIndicatorView>
      <Head>
        <title>Smart Energia - Indicador de Custos</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Indicador de Custo' subtitle='Indicador de Custo - Valores em R$/MWh'/>
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
          {/* <MenuItem value="RSZFNAENTR101P">RSZFNAENTR101P</MenuItem> COMENTARIO DE OPÇAO COM DADOS TESTES */}
          {
            clients.map((value) => {
              return <MenuItem key={1} value={value.cod_smart_unidade}>{value.unidade}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <section>
        <CostIndicatorChart title={lastConsolidatedYear?.toLocaleString()} subtitle=''
          data1={unity!==''? 
            graphDataState
              .filter(value => value.mes?.slice(0, 4) === (lastConsolidatedYear && lastConsolidatedYear - 1)?.toString() && value.custo_unit !== undefined)
              .map(value => value?.custo_unit && !!parseFloat(value?.custo_unit) ? value.custo_unit : null)
            :
            processedGraphData
              .filter(value => value.mes?.slice(0, 4) === (lastConsolidatedYear && lastConsolidatedYear - 1)?.toString() && value.custo_unit !== undefined)
              .map(value => value?.custo_unit && !!parseFloat(value?.custo_unit) ? value.custo_unit : null)}
          data2={unity!==''? 
            graphDataState
              .filter(value => value.mes?.slice(0, 4) === lastConsolidatedYear?.toString() && value.custo_unit !== undefined)
              .map(value => value?.custo_unit && !!parseFloat(value?.custo_unit) ? value.custo_unit : null)
            :
            processedGraphData
              .filter(value => value.mes?.slice(0, 4) === lastConsolidatedYear?.toString() && value.custo_unit !== undefined)
              .map(value => value?.custo_unit && !!parseFloat(value?.custo_unit) ? value.custo_unit : null)}
          years={[lastConsolidatedYear ? (lastConsolidatedYear - 1).toString() : '', lastConsolidatedYear?.toString() || '']}
          label={months}
        />
      </section>
    </CostIndicatorView>
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

  await apiClient.post('/economy/MWh').then(res => {
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
