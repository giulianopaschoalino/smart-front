import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react'

import BasicButton from '../../components/buttons/basicButton/BasicButton';
import { LineBarChart } from '../../components/graph/LineBarChart';
import LineChart from '../../components/graph/LineChart';
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle';
import { api } from '../../services/api';
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

  const [date, setDate] = useState('');
  const [select, setSelect] = useState('NORDESTE');
  const [page, setPage] = useState<string>('table')
  const [day, setDay] = useState<string>('2')

  const [dataByDay, setDataByDay] = useState([])

  const [sul, setSul] = useState([])
  const [norte, setNorte] = useState([])
  const [sudeste, setSudeste] = useState([])
  const [nordeste, setNordeste] = useState([])

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };
  const handleChangeDay = (event: SelectChangeEvent) => {
    setDay(event.target.value);
  };

  const label = ['1', '2', '3', '4', '5', '6', '7', '8', '8', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

  function getDataByDay() {
    api.post('/pld/daily', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "mes_ref", "value": `${day}/2022`, "row": true},
          {"type" : "=", "field" : "pld.submercado", "value": select}
        ],
      "order": [{ "field": "day_calc", "direction": "asc" }]
    }).then(res => {
      setDataByDay(res.data.data)
    }).catch(exception => console.log(exception))
  }

  function getDataByHour() {
    api.post('/pld/schedule', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "dia_num", "value": date, "row": true},
          {"type" : "=", "field" : "submercado", "value": "SUL"}
        ],
      "order": [{ "field": "hour", "direction": "asc" }]
    }).then(res => {
      setSul(res.data.data)
    }).catch(exception => console.log(exception))

    api.post('/pld/schedule', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "dia_num", "value": date, "row": true},
          {"type" : "=", "field" : "submercado", "value": "SUDESTE"}
        ],
      "order": [{ "field": "hour", "direction": "asc" }]
    }).then(res => {
      setSudeste(res.data.data)
    }).catch(exception => console.log(exception))

    api.post('/pld/schedule', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "dia_num", "value": date, "row": true},
          {"type" : "=", "field" : "submercado", "value": "NORTE"}
        ],
      "order": [{ "field": "hour", "direction": "asc" }]
    }).then(res => {
      setNorte(res.data.data)
    }).catch(exception => console.log(exception))

    api.post('/pld/schedule', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "dia_num", "value": date, "row": true},
          {"type" : "=", "field" : "submercado", "value": "NORDESTE"}
        ],
      "order": [{ "field": "hour", "direction": "asc" }]
    }).then(res => {
      setNordeste(res.data.data)
    }).catch(exception => console.log(exception))
  }

  useEffect(() => {
    getDataByHour()
    getDataByDay()
    console.log(dataByDay)
  }, [date, day, select])

  function handleCellColor(minimo, mi, ma, maximo) {
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
                value={select}
                onChange={handleChange}
                displayEmpty
                sx={{
                  width: '100%'
                }}
              >
                <MenuItem value={'NORTE'}>Norte</MenuItem>
                <MenuItem value={'NORDESTE'}>Nordeste</MenuItem>
                <MenuItem value={'SUL'}>Sul</MenuItem>
                <MenuItem value={'SUDESTE'}>Sudeste</MenuItem>
              </Select>
            </div>
            <Select
                value={day}
                onChange={handleChangeDay}
                displayEmpty
                sx={{
                  width: '100%'
                }}
              >
                <MenuItem value={'01'}>01</MenuItem>
                <MenuItem value={'02'}>02</MenuItem>
                <MenuItem value={'03'}>03</MenuItem>
                <MenuItem value={'04'}>04</MenuItem>
                <MenuItem value={'05'}>05</MenuItem>
                <MenuItem value={'06'}>06</MenuItem>
                <MenuItem value={'07'}>07</MenuItem>
                <MenuItem value={'08'}>08</MenuItem>
                <MenuItem value={'09'}>09</MenuItem>
                <MenuItem value={'10'}>10</MenuItem>
                <MenuItem value={'11'}>11</MenuItem>
                <MenuItem value={'12'}>12</MenuItem>
                <MenuItem value={'13'}>13</MenuItem>
                <MenuItem value={'14'}>14</MenuItem>
                <MenuItem value={'15'}>15</MenuItem>
                <MenuItem value={'16'}>16</MenuItem>
                <MenuItem value={'17'}>17</MenuItem>
                <MenuItem value={'18'}>18</MenuItem>
                <MenuItem value={'19'}>19</MenuItem>
                <MenuItem value={'20'}>20</MenuItem>
                <MenuItem value={'21'}>21</MenuItem>
                <MenuItem value={'22'}>22</MenuItem>
                <MenuItem value={'23'}>23</MenuItem>
                <MenuItem value={'24'}>24</MenuItem>
                <MenuItem value={'25'}>25</MenuItem>
                <MenuItem value={'26'}>26</MenuItem>
                <MenuItem value={'27'}>27</MenuItem>
                <MenuItem value={'28'}>28</MenuItem>
                <MenuItem value={'29'}>29</MenuItem>
                <MenuItem value={'30'}>30</MenuItem>
              </Select>

          </section>
          <LineBarChart
          data1={dataByDay} data3={dataByDay}
          dataset1={'Economia'} dataset2={'barra1'} dataset3={'2021'}
          label={EvolucaoPld.label}
          title='Evolução PLD (R$/MWh)' subtitle='' />
        </PldGraphView>
      </RenderIf>

      <RenderIf isTrue={page==='perDate'? true : false}>
        <GoBack onClick={() => setPage('table')}>{'< voltar para tabela PLD'}</GoBack>
        <PldGraphView>
          <PageTitle title='Resumo PLD - Horas' subtitle=''/>
          <section className='toolsbar'>
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value={date} onChange={(value) => setDate(value.target.value)}/>
            <BasicButton title='Download (csv)' onClick={() => console.log()}/>
          </section>
          <LineChart data1={nordeste} data2={norte} data3={sudeste} data4={sul}
          dataset1='NORDESTE' dataset2='NORTE' dataset3='SUDESTE' dataset4='SUL'
          title={`PLD - ${date}`}
          subtitle='' label={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']} />
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
    tableData = res.data.data
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
