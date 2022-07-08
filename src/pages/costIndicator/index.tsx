import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'

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
              return <MenuItem key={1} value={value.codigo_scde}>{value.cod_smart_unidade}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <section>
        <CostIndicatorChart title='' subtitle=''
          data1={graphData.filter((value, index) => value.mes.slice(4, 8).includes('2021'))}
          data2={graphData.filter((value, index) => value.mes.slice(4, 8).includes('2022'))}
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

  await apiClient.post('/economy/MWh').then(res => {
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
