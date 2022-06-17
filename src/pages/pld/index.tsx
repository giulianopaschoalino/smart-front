import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react'

import BasicButton from '../../components/buttons/basicButton/BasicButton';
import Chart from '../../components/graph/Chart';
import { LineBarChart } from '../../components/graph/LineBarChart';
import LineChart from '../../components/graph/LineChart';
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle';
import { EconomiaAcumulada } from '../../services/economiaAcumulada';
import { EvolucaoPld } from '../../services/evolucaoPld';
import getAPIClient from '../../services/ssrApi';
import { GoBack, PldGraphView, PldTableView } from '../../styles/layouts/pld/PldView'
import RenderIf from '../../utils/renderIf'

interface pldInterface {
  tableData: any,
  graphByHourData: any,
  graphByMonthData: any
}

export default function pld({tableData, graphByHourData, graphByMonthData}: pldInterface) {
  const router = useRouter()
  const { region } = router.query

  const [page, setPage] = useState<string>('table')
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    console.log(page)
  }, [page])

  function handleGreen(minimo, mi, ma, maximo) {
    if (minimo - mi >= 100 && minimo - mi < 200) {
      return 'green'
    } else if ( mi*2 >= 200 && mi*2 < 250 ) {
      return'dullGreen'
    } else if ( (ma-mi)/2 >=250 && (ma-mi)/2 < 300 ) {
      return 'white'
    } else if ( ma/2 >= 300 && ma/2 < 600 ) {
      return 'dullRed'
    } else if ( maximo-ma > 600 ) {
      return 'red'
    }
  }

  return (
    <main style={{
      width: '100%',
    }}>
      <Head>
        <title>Smart Energia - PLD</title>
      </Head>
      <Header name='' />
      <RenderIf isTrue={page==='table'? true : false}>
        <Link href='/dashboard' >{'< Voltar para Visão Geral'}</Link>
        <PageTitle title='Tabela de consumo PLD' subtitle=''/>
        <PldTableView>
          <table className="tg">
            <thead>
              <tr>
                <th className='tg-8oo6'>Mês</th>
                <th className='tg-8oo6'>Nordeste</th>
                <th className='tg-8oo6'>Norte</th>
                <th className='tg-8oo6'>Sudeste</th>
                <th className='tg-8oo6'>Sul</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.map(data => {
                  return <>
                    <tr>
                      <td className='tg-gceh'>{data.year_month_formatted}</td>
                      <td className='tg-uulg red'>{data.nordeste}</td>
                      <td className='tg-gceh dullRed'>{data.norte}</td>
                      <td className='tg-gceh dullGreen'>{data.sudeste}</td>
                      <td className='tg-uulg red'>{data.sul}</td>
                    </tr>
                  </>
                })
              }
              <tr>
                <td className='tg-gceh'>Mín</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Max</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Desv Pad</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
            </tbody>
          </table>
          <section>
            <article onClick={() => setPage('perMouth')}>
              <p>Valores Diários</p>
            </article>
            <article onClick={() => setPage('perDate')}>
              <p>Valores Horários</p>
            </article>
          </section>
        </PldTableView>
      </RenderIf>

      <RenderIf isTrue={page==='perMouth'? true : false}>
        <GoBack onClick={() => setPage('table')}>{'< voltar para tabela PLD'}</GoBack>
        <PageTitle title='Resumo PLD - Diários' subtitle=''/>
        <PldGraphView>
          <section className='toolsbar'>
            <div className='select'>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                sx={{
                  width: '100%'
                }}
              >
                <MenuItem value={0}>Norte</MenuItem>
                <MenuItem value={10}>Nordeste</MenuItem>
                <MenuItem value={20}>Sul</MenuItem>
                <MenuItem value={30}>Sudeste</MenuItem>
              </Select>
            </div>
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2015-08-09"/>
            <BasicButton title='Download (csv)' onClick={() => console.log()}/>
          </section>
          <LineBarChart data1={EvolucaoPld.data} data3={EvolucaoPld.data1} dataset1={'Economia'} dataset2={'barra1'} dataset3={'2021'} label={EvolucaoPld.label} title='Evolução PLD (R$/MWh)' subtitle='' />
        </PldGraphView>
      </RenderIf>

      <RenderIf isTrue={page==='perDate'? true : false}>
        <GoBack onClick={() => setPage('table')}>{'< voltar para tabela PLD'}</GoBack>
        <PldGraphView>
          <PageTitle title='Resumo PLD - Horas' subtitle=''/>
          <section className='toolsbar'>
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2021-09-19"/>
            <BasicButton title='Download (csv)' onClick={() => console.log()}/>
          </section>
          <LineChart data1={EconomiaAcumulada.data3} data2={EconomiaAcumulada.data4} data3={EconomiaAcumulada.data5} data4={EconomiaAcumulada.data6} dataset1='NORDESTE' dataset2='NORTE' dataset3='SUDESTE' dataset4='SUL' title='PLD - 19/09/21' subtitle='' label={EconomiaAcumulada.label1} />
        </PldGraphView>
      </RenderIf>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let tableData = [];

  await apiClient.post('/pld/list').then(res => {
    tableData = res.data
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
      tableData,
    }
  }
}
