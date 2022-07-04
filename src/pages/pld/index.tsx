import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react'

import BasicButton from '../../components/buttons/basicButton/BasicButton';
import { LineBarChart } from '../../components/graph/LineBarChart';
import LineChart from '../../components/graph/LineChart';
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle';
import { api } from '../../services/api';
import { EvolucaoPld } from '../../services/evolucaoPld';
import getAPIClient from '../../services/ssrApi';
import { GoBack, PldGraphView, PldTableView } from '../../styles/layouts/pld/PldView'
import RenderIf from '../../utils/renderIf'

interface pldInterface {
  tableData: any,
  graphByHourData: any,
  graphByMonthData: any
  userName: string,
  clientMonth: any
}

export default function pld({tableData, userName, clientMonth}: pldInterface) {
  const dateFormated = new Date()

  const year_Month = `0${dateFormated.getMonth()}/${dateFormated.getFullYear()}`

  const [date, setDate] = useState(`${dateFormated.getFullYear()}-${dateFormated.getUTCMonth()+1}-${dateFormated.getUTCDate()}`);
  const [select, setSelect] = useState('SUDESTE');
  const [page, setPage] = useState<string>('table')
  const [month, setMonth] = useState<string>((dateFormated.getUTCMonth()+1).toString())

  const [dataByDay, setDataByDay] = useState([])

  const [sul, setSul] = useState([])
  const [norte, setNorte] = useState([])
  const [sudeste, setSudeste] = useState([])
  const [nordeste, setNordeste] = useState([])

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };
  const handleChangeDay = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  function getDataByDay() {
    api.post('/pld/daily', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "mes_ref", "value": `${month}/2022`, "row": true},
          {"type" : "=", "field" : "pld.submercado", "value": select}
        ],
      "order": [{ "field": "day_calc", "direction": "asc" }]
    }).then(res => {
      setDataByDay(res.data.data)
    }).catch(exception => {
      console.log(exception)
    })
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
    }).catch(exception => {
      // console.log(exception)
    })

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
    }).catch(exception => {
      // console.log(exception)
    })

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
    }).catch(exception => {
      // console.log(exception)
    })

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
    }).catch(exception => {
      // console.log(exception)
    })
  }

  function handleColorNorte(value, region) {
    if (value <= tableData.result[1].norte_min)
      return ''
    else if (value >= tableData.result[0][`${region}_max`])
      return ''
    else if (tableData.result[0][`${region}_max`] - value > tableData.result[0][`${region}_max`]/2)
      return ''
    else if (tableData.result[1][`${region}_min`] - value <= tableData.result[1][`${region}_min`])
      return ''
  }

  function downloadCSVFile(csv, filename) {
    const csv_file = new Blob(["\ufeff",csv], {type: "text/csv"});

    const download_link = document.createElement("a");

    download_link.download = filename;

    download_link.href = window.URL.createObjectURL(csv_file);

    download_link.style.display = "none";

    document.body.appendChild(download_link);

    download_link.click();
  }

  function htmlToCSV(html, filename) {
    const data = [];
    const rows = document.querySelectorAll("table tr");

    for (let i = 0; i < rows.length; i++) {
      const row = [], cols: any = rows[i].querySelectorAll("td, th");

      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }

      data.push(row.join(";"));
    }

    downloadCSVFile(data.join("\n"), filename);
  }

  useEffect(() => {
    getDataByHour()
    getDataByDay()
    console.log(month)
  }, [date, month, select])

  return (
    <main style={{width: '100%',}}>
      <Head>
        <title>Smart Energia - PLD</title>
      </Head>
      <RenderIf isTrue={page==='table'? true : false}>
        <Header name={userName}>
          <Link href='/dashboard' >{'< Voltar para Visão Geral'}</Link>
          <PageTitle title='Tabela de consumo PLD' subtitle='Tabela de consumo PLD'/>
        </Header>
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
                tableData.data.sort((a, b) => {
                  if (parseFloat(a.year_month_formatted.slice(0,2)) > parseFloat(b.year_month_formatted.slice(1,2))) return 1
                  if (parseFloat(a.year_month_formatted.slice(0,2)) < parseFloat(b.year_month_formatted.slice(1,2))) return -1

                  return 0
                }).map(data => {
                  return <>
                    <tr className={data.year_month_formatted==year_Month? 'actual' : ''}>
                      <td className='tg-gceh'>{data.year_month_formatted}</td>
                      <td className={`tg-uulg`}>{parseFloat(data.nordeste).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      <td className={`tg-gceh`}>{parseFloat(data.norte).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      <td className={`tg-gceh`}>{parseFloat(data.sudeste).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      <td className={`tg-uulg`}>{parseFloat(data.sul).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                    </tr>
                  </>
                })
              }
              <tr>
                <td className='tg-gceh'></td>
                <td className={`tg-uulg`}></td>
                <td className={`tg-gceh`}></td>
                <td className={`tg-gceh`}></td>
                <td className={`tg-uulg`}></td>
              </tr>
              {
                tableData.result.map((data, index) => {
                  if (index === 0) {
                    return <>
                      <tr>
                        <td className='tg-gceh'>Máximo</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  } else if (index===1) {
                    return <>
                      <tr>
                        <td className='tg-gceh'>Mínimo</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  } else if (index===2) {
                    return <>
                      <tr>
                        <td className='tg-gceh'>Desv. Padrão</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  }
                })
              }
            </tbody>
          </table>
          <div className='btnDownload'>
          <BasicButton onClick={() => {
            const html = document.querySelector("table").outerHTML;
            htmlToCSV(html, "tabela_PLD.csv");
          }} title='Download'/>
          </div>
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
        <Header name={userName}>
          <GoBack onClick={() => setPage('table')}>{'< Voltar para tabela PLD'}</GoBack>
          <PageTitle title='Resumo PLD - Diários' subtitle='Evolução PLD (R$/MWh)'/>
        </Header>
        <PldGraphView>
          <section className='toolsbar'>
            <div className='select'>
            <FormControl sx={{
              width: '100%'
            }}>
              <InputLabel id="demo-simple-select-label">Região</InputLabel>
                <Select
                  value={select}
                  onChange={handleChange}
                  displayEmpty
                  label='Região'
                  sx={{
                    width: '100%'
                  }}
                >
                  <MenuItem value={'NORTE'}>Norte</MenuItem>
                  <MenuItem value={'NORDESTE'}>Nordeste</MenuItem>
                  <MenuItem value={'SUL'}>Sul</MenuItem>
                  <MenuItem value={'SUDESTE'}>Sudeste</MenuItem>
                </Select>
              </FormControl>
            </div>
            <FormControl sx={{
              width: '22%',
              ml: 1
            }}>
              <InputLabel id="demo-simple-select-label">Mês</InputLabel>
              <Select
                  value={month}
                  onChange={handleChangeDay}
                  displayEmpty
                  placeholder='dia'
                  label="Age"
                >
                  <MenuItem value={'0'}>Nenhum</MenuItem>
                  {
                    clientMonth.sort((a, b) => {
                      if (parseFloat(a.mes_ref.slice(3,4)) > parseFloat(b.mes_ref.slice(3,4))) return 1
                      if (parseFloat(a.mes_ref.slice(3,4)) < parseFloat(b.mes_ref.slice(3,4))) return -1

                      return 0
                    }).map((data, index) => {
                      return <MenuItem key={index} value={data.mes_ref.slice(2, 4)}>{data.mes_ref.slice(2, 4)}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
          </section>
          <LineBarChart
          data1={dataByDay} data3={dataByDay}
          dataset1={'Média'} dataset2={'barra1'} dataset3={'Diario'}
          label={EvolucaoPld.label}
          title='' subtitle='' />
        </PldGraphView>
      </RenderIf>

      <RenderIf isTrue={page==='perDate'? true : false}>
        <Header name={userName}>
          {/* <Link href='/dashboard' >{'< Voltar para Visão Geral'}</Link> */}
          <GoBack onClick={() => setPage('table')}>{'< Voltar para tabela PLD'}</GoBack>
          <PageTitle title='Resumo PLD - Horas' subtitle='Gráfico de resumo PLD - Horas (Média, Diário)'/>
        </Header>
        <PldGraphView>
          <section className='toolsbar'>
            <input type="date" data-date={date} data-date-format="DD MMMM YYYY" value={date} onChange={(value) => setDate(value.target.value)}/>
          </section>
          <LineChart data1={nordeste} data2={norte} data3={sudeste} data4={sul}
          dataset1='NORDESTE' dataset2='NORTE' dataset3='SUDESTE' dataset4='SUL'
          title={date? `Período - ${date.toString().split("-")[2]}/${date.toString().split("-")[1]}/${date.toString().split("-")[0]}` : null}
          subtitle='' label={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']} />
        </PldGraphView>
      </RenderIf>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let tableData = [];
  let clientMonth = [];

  await apiClient.post('/pld/list').then(res => {
    tableData = res.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/pld', {
    "filters": [],
    "fields": ["mes_ref"],
    "distinct": true
  }).then(res => {
    clientMonth = res.data.data
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
      tableData,
      userName,
      clientMonth
    }
  }
}
