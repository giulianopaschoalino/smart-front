import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart'

// material ui imports
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import { ConsumoEstimado } from '../../services/consumoEstimado'
import getAPIClient from '../../services/ssrApi'
import { EstimatedCostView } from '../../styles/layouts/economy/estimatedCost/EstimatedCostView'

export default function EstimatedCost({graphData, userName, clients}: any) {
  const [unity, setUnity] = useState('');

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
              return <MenuItem key={1} value={value.codigo_scde}>{value.cod_smart_unidade}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <section>
        <CativoXLivreChart chartData={graphData}
        dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
        label={ConsumoEstimado.label} title='' subtitle='' barLabel hashurado/>
      </section>
    </EstimatedCostView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-client_id']: id } = parseCookies(ctx)

  let graphData = [];
  let clients = [];

  await apiClient.post('/units', {
		"filters": [
      {"type" : "not_in", "field": "dados_cadastrais.codigo_scde", "value":["0P"]},
			{"type" : "=", "field": "dados_cadastrais.cod_smart_cliente", "value": id}
		],
		"fields": ["cod_smart_unidade", "codigo_scde"],
		"distinct": true
  }).then(res => {
    clients = res.data.data
  }).catch(res => {
    // console.log(res)
  })

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
      clients,
      graphData,
      userName
    }
  }
}
