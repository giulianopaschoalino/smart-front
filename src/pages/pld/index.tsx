import Fab from '@mui/material/Fab';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react'

import BasicButton from '../../components/buttons/basicButton/BasicButton';
import { LineBarChart } from '../../components/graph/LineBarChart';
import LineChart from '../../components/graph/LineChart';
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle';
import { api } from '../../services/api';
import getAPIClient from '../../services/ssrApi';
import { PldGraphView, PldTableMinMaxView, PldTableView, TableHeader } from '../../styles/layouts/pld/PldView'
import RenderIf from '../../utils/renderIf'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import NavigationIcon from '@mui/icons-material/Navigation';

import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MenuContext } from '../../contexts/menu/MenuContext';

interface pldInterface {
  tableData: any,
  graphByHourData: any,
  graphByMonthData: any
  userName: string,
  clientMonth: any
}

export default function pld({tableData, userName, clientMonth}: pldInterface) {
  const {pldMenu, setPldMenu} = useContext(MenuContext)

  const dateFormated = new Date()

  const year_Month = `0${dateFormated.getMonth()+1}/${dateFormated.getFullYear()}`

  const [date, setDate] = useState<any>(new Date());
  const [select, setSelect] = useState('SUDESTE');

  // rendering page
  const [month, setMonth] = useState<any>(new Date().toLocaleDateString().slice(3, 10))

  const [dataByDay, setDataByDay] = useState([])

  const [sul, setSul] = useState([])
  const [norte, setNorte] = useState([])
  const [sudeste, setSudeste] = useState([])
  const [nordeste, setNordeste] = useState([])
  const [ pageYPosition, setPageYPosition ] = useState(0);

  function getPageYAfterScroll(){
    setPageYPosition(window.scrollY);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelect(event.target.value);
  };
  const handleChangeDay = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  const handleChangeDate = (newValue: Date | null) => {
    setDate(newValue)

  };

  function getDataByDay() {
    api.post('/pld/daily', {
      "filters": [
          {"type" : "=", "field" : "year_month_formatted", "value": month},
          {"type" : "=", "field" : "submarket", "value": select}
        ],
      "order": [{ "field": "day_calc", "direction": "asc" }]
    }).then(res => {
      setDataByDay(res.data.data)
    }).catch(exception => {
      // console.log(exception)
    })
  }

  function getDataByHour() {
    api.post('/pld/schedule', {
      "limit": 20,
      "offset": 0,
      "filters": [
          {"type" : "=", "field" : "dia_num", "value": date.toLocaleDateString().split('/').reverse().join('-'), "row": true},
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
          {"type" : "=", "field" : "dia_num", "value": date.toLocaleDateString().split('/').reverse().join('-'), "row": true},
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
          {"type" : "=", "field" : "dia_num", "value": date.toLocaleDateString().split('/').reverse().join('-'), "row": true},
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
          {"type" : "=", "field" : "dia_num", "value": date.toLocaleDateString().split('/').reverse().join('-'), "row": true},
          {"type" : "=", "field" : "submercado", "value": "NORDESTE"}
        ],
      "order": [{ "field": "hour", "direction": "asc" }]
    }).then(res => {
      setNordeste(res.data.data)
    }).catch(exception => {
      // console.log(exception)
    })
  }

  function handleColor(value, region) {
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
    // const rows = document.getElementsByClassName('tabela');

    for (let i = rows.length/2; i < rows.length; i++) {
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
  }, [date, month, select])

  useEffect(() => {
    window?.addEventListener('scroll', getPageYAfterScroll);
  }, [])

  return (
    <main style={{width: '100%'}}>
      <Head>
        <title>Smart Energia - PLD</title>
      </Head>
      <div id='title'/>
      <Header name={userName}>
        <PageTitle title='PLD' subtitle='Evolução PLD - Valores em R$/MWh'/>
      </Header>
      <TableHeader>
        <Tabs value={pldMenu} onChange={(e, nv) => setPldMenu(nv)} aria-label="">
          <Tab label="Pld Histórico"/>
          <Tab label="Valores Diários"/>
          <Tab label="Valores Horários"/>
        </Tabs>
        <div className='btnDownload'>
          <RenderIf isTrue={pldMenu === 0}>
            <BasicButton onClick={() => {
              const html = document.querySelector("table").outerHTML;
              htmlToCSV(html, "tabela_PLD.csv");
            }} title='Download'/>
          </RenderIf>
        </div>
      </TableHeader>

      <RenderIf isTrue={pldMenu===0}>
        <PldTableView>
          <table className='tg'>
            <thead>
              <tr>
                <th className='tg-8oo6'>Mês</th>
                <th className='tg-8oo6'>Nordeste<p>(R$/MWh)</p></th>
                <th className='tg-8oo6'>Norte<p>(R$/MWh)</p></th>
                <th className='tg-8oo6'>Sudeste<p>(R$/MWh)</p></th>
                <th className='tg-8oo6'>Sul<p>(R$/MWh)</p></th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.data.map(data => {
                  return <>
                    <tr className={data.year_month_formatted==year_Month? 'actual' : ''}>
                      <td className='tg-gceh'>{data.year_month_formatted}</td>
                      <td className={`tg-uulg`}>{parseFloat(data.nordeste).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td className={`tg-gceh`}>{parseFloat(data.norte).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td className={`tg-gceh`}>{parseFloat(data.sudeste).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td className={`tg-uulg`}>{parseFloat(data.sul).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                  </>
                })
              }
            </tbody>
          </table>
        </PldTableView>
        <PldTableMinMaxView>
          <table className='tg'>
            <tbody>
              {
                tableData.result.map((data, index) => {
                  if (index === 0) {
                    return <>
                      <tr>
                        <td style={{borderTopLeftRadius: 8}} className='tg-gceh'>Máximo</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  } else if (index===1) {
                    return <>
                      <tr>
                        <td className='tg-gceh'>Mínimo</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  } else if (index===2) {
                    return <>
                      <tr>
                        <td className='tg-gceh' style={{borderBottomColor: 'transparent'}}>Desv. Padrão</td>
                        <td className='tg-uulg' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.nordeste_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.norte_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.sudeste_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-uulg' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.sul_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  }
                })
              }
            </tbody>
          </table>
        </PldTableMinMaxView>

        <PldTableView display={false}>
          <table className="tg tabela" style={{display: 'none'}}>
            <thead>
              <tr className='tr'>
                <th className='tg-8oo6'>Mês</th>
                <th className='tg-8oo6'>Nordeste</th>
                <th className='tg-8oo6'>Norte</th>
                <th className='tg-8oo6'>Sudeste</th>
                <th className='tg-8oo6'>Sul</th>
              </tr>
            </thead>
            <tbody>
              {
                tableData.data.map(data => {
                  return <>
                    <tr className={`${data.year_month_formatted==year_Month? 'actual' : ''} tr`}>
                      <td className='tg-gceh'>{data.year_month_formatted}</td>
                      <td className={`tg-uulg`}>{parseFloat(data.nordeste).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td className={`tg-gceh`}>{parseFloat(data.norte).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td className={`tg-gceh`}>{parseFloat(data.sudeste).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      <td className={`tg-uulg`}>{parseFloat(data.sul).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                  </>
                })
              }
              {
                tableData.result.map((data, index) => {
                  if (index === 0) {
                    return <>
                      <tr className='tr'>
                        <td style={{borderTopLeftRadius: 8}} className='tg-gceh'>Máximo</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_max).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  } else if (index===1) {
                    return <>
                      <tr className='tr'>
                        <td className='tg-gceh'>Mínimo</td>
                        <td className='tg-uulg'>{parseFloat(data.nordeste_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.norte_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-gceh'>{parseFloat(data.sudeste_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className='tg-uulg'>{parseFloat(data.sul_min).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  } else if (index===2) {
                    return <>
                      <tr className='tr'>
                        <td className='tg-gceh' style={{borderBottomColor: 'transparent'}}>Desv. Padrão</td>
                        <td className='tg-uulg' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.nordeste_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.norte_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-gceh' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.sudeste_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                        <td className='tg-uulg' style={{borderBottomColor: 'transparent'}}>{parseFloat(data.sul_desv_pad).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                      </tr>
                    </>
                  }
                })
              }
            </tbody>
          </table>
        </PldTableView>
      </RenderIf>

      {/* grafico de grafico por seleção de data (mês) (diario)*/}
      <RenderIf isTrue={pldMenu===1}>
        <PldGraphView>
          <section className='toolsbar2'>
            <FormControl sx={{
              width: '320px'
            }}>
              <InputLabel id="demo-simple-select-label">Região</InputLabel>
                <Select
                  value={select}
                  onChange={handleChange}
                  displayEmpty
                  label='Região'
                >
                  <MenuItem value={'NORTE'}>Norte</MenuItem>
                  <MenuItem value={'NORDESTE'}>Nordeste</MenuItem>
                  <MenuItem value={'SUL'}>Sul</MenuItem>
                  <MenuItem value={'SUDESTE'}>Sudeste</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{
              width: '320px',
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
                      if (parseFloat(a.mes_ref.slice(0, 2)) < parseFloat(b.mes_ref.slice(0, 2)))
                      if (parseFloat(a.mes_ref.slice(3, 7)) > parseFloat(b.mes_ref.slice(3, 7))) return -1
                      else return 1
                      if (parseFloat(a.mes_ref.slice(0, 2)) > parseFloat(b.mes_ref.slice(0, 2)))
                      if (parseFloat(a.mes_ref.slice(3, 7)) < parseFloat(b.mes_ref.slice(3, 7))) return 1
                      else return -1

                      return 0
                    }).map((data, index) => {
                      return <MenuItem key={index} value={data.mes_ref}>{data.mes_ref}</MenuItem>
                    })
                  }
              </Select>
            </FormControl>
          </section>
          <LineBarChart
          data1={dataByDay.map(value => value.mmovel)} data3={dataByDay}
          dataset1={'Média'} dataset2={'barra1'} dataset3={'Diario'}
          label={dataByDay.map((value, index) => {
            return value.day_formatted
          })}
          title='' subtitle='' />
        </PldGraphView>
      </RenderIf>

      {/* grafico de grafico por seleção de data INTEIRA (horario)*/}
      <RenderIf isTrue={pldMenu===2}>
        <PldGraphView>
          <section className='toolsbar2'>
            {/* <p>Selecione a data: </p> */}
            <LocalizationProvider dateAdapter={AdapterDateFns} localeText={'pt-BR'} adapterLocale='pt-BR'>
              <div className='select datePicker'>
                <DesktopDatePicker
                  label="Data"
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField {...params} style={{minWidth: '320px'}}/>}
                />
              </div>
            </LocalizationProvider>
          </section>
          <LineChart data1={nordeste} data2={norte} data3={sudeste} data4={sul}
            dataset1='NORDESTE' dataset2='NORTE' dataset3='SUDESTE' dataset4='SUL'
            title={''}
            subtitle='' label={['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24']}
          />
        </PldGraphView>
      </RenderIf>
      {pageYPosition > 300 && <a href="#title" style={{position: 'fixed', right: '50px', bottom: '100px'}}>
        <Fab aria-label="add">
          <NavigationIcon />
        </Fab>
      </a>}
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
