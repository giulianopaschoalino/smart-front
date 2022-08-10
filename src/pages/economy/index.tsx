import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react'

import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle';
import { api } from '../../services/api';
import getAPIClient from '../../services/ssrApi';
import { TableHeader } from '../../styles/layouts/pld/PldView'
import RenderIf from '../../utils/renderIf'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { MenuContext } from '../../contexts/menu/MenuContext';
import { GrossAnualChart } from '../../components/graph/grossAnualChart/GrossAnualChart';
import GrossMensalChart from '../../components/graph/grossMensalChart/GrossMensalChart';
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart';
import CostIndicatorChart from '../../components/graph/costIndicatorChart';
import { EconomyView } from '../../styles/layouts/economy/economy';

export default function economy({userName, anual, years, brutaMensal, yearsBrutaMensal, catLiv, clients, indicatorCost}: any) {
  const {economyMenu, setEconomyMenu} = useContext(MenuContext)

  const [unity, setUnity] = useState<string>('');

  const [catLivDataState, setCatLivDataState] = useState(null);
  const [indicatorDataState, setIndicatorDataState] = useState(null);

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

  const [lastDataBrutaMensalS, setLastDataBrutaMensal] = useState('')
  useEffect(() => {
    let lastData = '0'
    let index=0
    if (economyMenu) {
      while (index < brutaMensal.length) {
        if (!brutaMensal[index].dad_estimado)
          lastData=brutaMensal[index].economia_acumulada
        index++
      }
    } else {
      while (index < anual.length) {
        if (!anual[index].dad_estimado)
          lastData=brutaMensal[index].economia_acumulada
        index++
      }
    }
    setLastDataBrutaMensal(`${parseFloat(lastData).toFixed(3)}`)
  }, [economyMenu])

  useEffect(() => {
    api.post('/economy/estimates', unity!==''?{
      "filters": [
        {"type" : "=", "field":"dados_cadastrais.cod_smart_unidade", "value": unity!=="default"? null : unity}
      ]
    }:{}).then(res => {
      setCatLivDataState(res.data.data)
    })

    api.post('/economy/MWh', unity!==''?{
      "filters": [
        {"type" : "=", "field":"dados_cadastrais.cod_smart_unidade", "value": unity!=="default"? null : unity}
      ]
    }:{}).then(res => {
      setIndicatorDataState(res.data.data)
    })
  }, [unity])

  return (
    <main style={{width: '100%'}}>
      <Head>
        <title>Smart Energia - Economia</title>
      </Head>
      <div id='title'/>
      <Header name={userName}>
        <PageTitle title='Economia' subtitle='Gráficos de economia'/>
      </Header>
      <EconomyView>
        <TableHeader>
          <Tabs value={economyMenu} onChange={(e, nv) => setEconomyMenu(nv)} aria-label="">
            <Tab label="Acumulada Anual"/>
            <Tab label="Acumulada Mensal"/>
            <Tab label="Cativo x Livre Mensal"/>
            <Tab label="Custo R$/MWh"/>
          </Tabs>
        </TableHeader>
        <article>
          {
            economyMenu === 0 || economyMenu === 1?
            <p>Economia Bruta Estimada e Acumulada Anual - Valores em R$ x mil</p>
            :
            economyMenu === 2?
            <p>Comparativo de Custo Estimado - Valores em R$ x mil</p>
            :
            <p>Indicador de Custo - Valores em R$/MWh</p>
          }
          <p>{
            economyMenu===0 || economyMenu===1?
              <><b>Economia Acumulada: <p>R${lastDataBrutaMensalS}</p></b></>
              :
              null
          }</p>
        </article>
        {
          typeof window === 'undefined' || typeof window === undefined? null :
          <>
            <RenderIf isTrue={economyMenu===0}>
              <section>
                <GrossAnualChart title='' subtitle=''
                  dataset='Consolidada'

                  dataProps={anual}
                  label={years} barLabel bruta
                />
              </section>
            </RenderIf>

            <RenderIf isTrue={economyMenu===1}>
              <section>
                <GrossMensalChart title='' subtitle=''
                  data1={brutaMensal}
                  data2={brutaMensal}
                  label={yearsBrutaMensal}
                />
              </section>
            </RenderIf>

            <RenderIf isTrue={economyMenu===2}>
              <div style={{paddingLeft: '3%'}}>
                <FormControl sx={{ m: 1, minWidth: 120, width: 200, height: '65px'}} size="small">
                  <InputLabel id="demo-select-small">Unidade</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unity}
                    label="Unidade"
                    sx={{height: '64px'}}
                    onChange={value => setUnity(value.target.value)}
                    fullWidth
                  >
                    <MenuItem value="default">Todas</MenuItem>
                    {/* <MenuItem value="RSZFNAENTR101P">RSZFNAENTR101P</MenuItem> !!OPÇAO COM DADOS TESTES!! */}
                    {
                      clients.map((value) => {
                        return <MenuItem key={1} value={value.cod_smart_unidade}>{value.unidade}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <section>
                <CativoXLivreChart chartData={unity!==''? catLivDataState : catLiv}
                dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
                label={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} title='' subtitle='' barLabel hashurado/>
              </section>
            </RenderIf>

            <RenderIf isTrue={economyMenu===3}>
              <div style={{paddingLeft: '3%'}}>
                <FormControl sx={{ m: 1, minWidth: 120, width: 200 }} size="small">
                  <InputLabel id="demo-select-small">Unidade</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unity}
                    sx={{height: '64px'}}
                    label="Unidade"
                    onChange={value => setUnity(value.target.value)}
                    fullWidth
                  >
                    <MenuItem value="default">Todas</MenuItem>
                    {/* <MenuItem value="RSZFNAENTR101P">RSZFNAENTR101P</MenuItem> COMENTARIO DE OPÇAO COM DADOS TESTES */}
                    {
                      clients.map((value) => {
                        return <MenuItem key={1} value={value.cod_smart_unidade}>{value.unidade}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <section>
                <CostIndicatorChart title='' subtitle=''
                  data1={indicatorDataState?.filter((value, index) => value.mes.slice(0, 4).includes('2021'))}
                  data2={indicatorDataState?.filter((value, index) => value.mes.slice(0, 4).includes('2022'))}
                  label={months}
                />
              </section>
            </RenderIf>
          </>
        }
      </EconomyView>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-client_id']: client_id } = parseCookies(ctx)

  let anual = [];

  await apiClient.post('/economy/grossAnnual').then(res => {
    anual = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  const years = anual.map((value) => value.ano)

  let brutaMensal = [];

  await apiClient.post('/economy/grossMonthly').then(res => {
    brutaMensal = res.data.data
    // console.log(graphData[0].mes)
  }).catch(res => {
    // console.log(res)
  })

  const yearsBrutaMensal = brutaMensal.map((value) => value.mes)

  let catLiv = [];
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
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/economy/estimates').then(res => {
    catLiv = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  let indicatorCost = []

  await apiClient.post('/economy/MWh').then(res => {
    indicatorCost = res.data.data
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
      userName,
      anual,
      years,
      brutaMensal,
      yearsBrutaMensal,
      catLiv,
      clients,
      indicatorCost
    }
  }
}
