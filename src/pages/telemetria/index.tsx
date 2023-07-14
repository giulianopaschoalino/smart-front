import React, { useEffect, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Head from 'next/head'
import GradientButton from '../../components/buttons/gradientButton/GradientButton'
import Header from '../../components/header/Header'
import {
  Buttons,
  ChartFilters,
  TableHeader,
  TelemetriaView
} from '../../styles/layouts/Telemetria/TelemetriaView'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { DemRegXDemConChart } from '../../components/graph/DemRegXDemConChart'
import getAPIClient from '../../services/ssrApi'
import RenderIf from '../../utils/renderIf'

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { format } from 'date-fns'
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import { DiscretizedConsumptionChart } from '../../components/graph/DiscretizedConsumptionChart'
import FatorPotenciaChart from '../../components/graph/fatorPotenciaChart'
import PageTitle from '../../components/pageTitle/PageTitle'
import { getDemand } from '../../services/charts/telemetry/getDemand'
import { getDiscretization } from '../../services/charts/telemetry/getDiscretization'
import { getPowerFactorData } from '../../services/charts/telemetry/getPowerFactor'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

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

export default function Telemetria({ userName, clients }: any) {
  const [unity, setUnity] = useState(clients[0]?.codigo_scde)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [month, setMonth] = useState(new Date().getMonth())
  const [endMonth, setEndMonth] = useState(new Date().getMonth() + 1)
  const [discretization, setDiscretization] = useState('1_hora')

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)
  const [openSnackError, setOpenSnackError] = useState<boolean>(false)
  const [openSnackFields, setOpenSnackFields] = useState<boolean>(false)

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackError(false)
    setOpenSnackSuccess(false)
    setOpenSnackFields(false)
  }

  function downloadCSVFile(csv, filename) {
    const csv_file = new Blob([csv], { type: 'text/csv;charset=utf-8' })

    const download_link = document.createElement('a')

    download_link.download = filename

    download_link.href = window.URL.createObjectURL(csv_file)

    download_link.style.display = 'none'

    document.body.appendChild(download_link)

    download_link.click()
  }

  function htmlToCSV(filename) {
    const data = []
    const rows = document.querySelectorAll('table tr')

    for (let i = 0; i < rows.length; i++) {
      const row = [],
        cols: any = rows[i].querySelectorAll('td, th')

      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText)
      }

      data.push(row.join(';'))
    }

    downloadCSVFile(data.join('\n'), filename)
  }

  const [tableData, setTableData] = useState(null)

  const [loader, setLoader] = useState(false)

  const [menu, setMenu] = useState(0)

  const [showChart, setShowChart] = useState(false)

  const [send, setSend] = useState(false)

  const handleChangeStartDate = (newValue: Date | null) => {
    setStartDate(newValue)
  }
  const handleChangeEndDate = (newValue: Date | null) => {
    setEndDate(newValue)
  }

  const [fatorPotenciaData, setFatorPotenciaData] = useState([])
  const [demRegXDemCon, setDemRegXDemCon] = useState([])
  const [discretizedConsumptionData, setDiscretizedConsumptionData] = useState(
    []
  )

  useEffect(() => {
    setSend(false)
  }, [startDate, endDate])

  useEffect(() => {
    const firstOfTheMonth = format(new Date(startDate).setDate(2), 'yyyy-MM-dd')
    const lastOfTheMonth = format(
      new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0),
      'yyyy-MM-dd'
    )

    setStartDate(new Date(firstOfTheMonth))

    setLoader(true)
    getDiscretization(
      unity,
      new Date(firstOfTheMonth),
      new Date(lastOfTheMonth),
      discretization
    )
      .then((result) => {
        setDiscretizedConsumptionData(result)
        setSend(false)
        setLoader(false)
      })
      .catch(() => {
        setSend(false)
        setOpenSnackFields(true)
      })

    getDemand(unity, startDate, endDate, discretization)
      .then((result) => {
        setDemRegXDemCon(result)
        setSend(false)
        setTableData(result)
      })
      .catch(() => {
        setSend(false)
        setOpenSnackFields(true)
        setLoader(false)
      })

    getPowerFactorData(unity, startDate, endDate, discretization)
      .then((result) => {
        setFatorPotenciaData(result)
        setSend(false)
        setLoader(false)
      })
      .catch(() => {
        setSend(false)
        setOpenSnackFields(true)
        setLoader(false)
      })
  }, [])

  return (
    <main style={{ width: '100%' }}>
      <Head>
        <title>Smart Energia - Telemetria</title>
      </Head>

      <Snackbar
        open={openSnackSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: '100%' }}
        >
          Dados disponíveis para Visualização/Download!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackError}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: '100%' }}
        >
          Não foi possível pegar os dados!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackFields}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: '100%' }}
        >
          Verifique os campos e tente novamente!
        </Alert>
      </Snackbar>

      <Header name={userName}>
        <PageTitle
          title="Telemetria"
          subtitle="Dados Coletados do Sistema de Coleta de Dados de Energia"
        />
      </Header>

      {typeof window === 'undefined' || typeof window === undefined ? null : (
        <TelemetriaView>
          {/* <Banner title ='Telemetria' subtitle='Dados Coletados do Sistema de Coleta de Dados de Energia -
        SCDE da Câmara de Comercialização de Energia Elétrica - CCEE,
        sendo que as quantidades aqui informadas são de responsabilidade do agente de medição
        - Distribuidora.' imgSource='/assets/graphical.png' /> */}
          <TableHeader>
            <Tabs value={menu} onChange={(e, nv) => setMenu(nv)} aria-label="">
              <Tab
                label={
                  discretization === '5_min'
                    ? 'Consumo discretizado em 5 minutos'
                    : discretization === '15_min'
                      ? 'Consumo discretizado em 15 minutos'
                      : discretization === '1_hora'
                        ? 'Consumo discretizado em 1 hora'
                        : 'Consumo discretizado em 1 dia'
                }
              />
              <Tab label="Demanda" />

              <Tab label="Fator Potência" />
            </Tabs>
          </TableHeader>

          {/* discretization chart */}
          <RenderIf isTrue={menu === 0}>
            <ChartFilters>
              <div className="input">
                <FormControl style={{ minWidth: 100, width: 200 }} size="small">
                  <InputLabel>Unidade</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unity}
                    label="Unidade"
                    onChange={(value) => setUnity(value.target.value)}
                    sx={{ height: 63, mb: 2 }}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>

                    {clients.map(({ codigo_scde, unidade }) => (
                      <MenuItem key={codigo_scde} value={codigo_scde}>
                        {unidade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="input">
                <FormControl
                  sx={{ minWidth: 120, width: 200, ml: 1, mr: 1 }}
                  size="small"
                >
                  <InputLabel>Discretização</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={discretization}
                    label="Discretização"
                    onChange={(value) => setDiscretization(value.target.value)}
                    sx={{ height: 63, mb: 2 }}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value="5_min">5 minutos</MenuItem>
                    <MenuItem value="15_min">15 minutos</MenuItem>
                    <MenuItem value="1_hora">1 hora</MenuItem>
                    <MenuItem value="1_dia">1 dia</MenuItem>
                    <MenuItem value="1_mes">1 mês</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {discretization === '1_mes' ? (
                <>
                  <FormControl
                    sx={{ minWidth: 120, width: 200, ml: 1, mr: 1 }}
                    size="small"
                  >
                    <InputLabel>Discretização</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={month}
                      label="Mês"
                      onChange={(value) => {
                        setMonth(value.target.value as number)
                        const firstOfTheMonth: Date = new Date(
                          startDate.getFullYear(),
                          (value.target.value as number) - 1,
                          1
                        )
                        setStartDate(firstOfTheMonth)
                      }}
                      sx={{ height: 63, mb: 2 }}
                      fullWidth
                    >
                      <MenuItem value="">
                        <em>Nenhum</em>
                      </MenuItem>
                      {months
                        .slice(0, new Date().getUTCMonth() + 1)
                        .map((value, index) => {
                          return (
                            <MenuItem key={value} value={(index + 1) as number}>
                              {value}
                            </MenuItem>
                          )
                        })}
                    </Select>
                  </FormControl>
                  {discretization === '1_mes' && (
                    <FormControl
                      sx={{ minWidth: 120, width: 200, ml: 1, mr: 1 }}
                      size="small"
                    >
                      <InputLabel>Discretização</InputLabel>
                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={endMonth}
                        label="Mês"
                        onChange={(value) => {
                          setEndMonth(value.target.value as number)
                          const firstOfTheMonth: Date = new Date(
                            startDate.getFullYear(),
                            (value.target.value as number) - 1,
                            1
                          )
                          const lastOfTheMonth: Date = new Date(
                            startDate.getFullYear(),
                            firstOfTheMonth.getMonth() + 1,
                            0
                          )
                          setEndDate(lastOfTheMonth)
                        }}
                        sx={{ height: 63, mb: 2 }}
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>Nenhum</em>
                        </MenuItem>
                        {months
                          .slice(0, new Date().getUTCMonth() + 1)
                          .map((value, index) => {
                            return (
                              <MenuItem
                                key={value}
                                value={(index + 1) as number}
                              >
                                {value}
                              </MenuItem>
                            )
                          })}
                      </Select>
                    </FormControl>
                  )}
                </>
              ) : (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <div className="datePicker">
                      <DesktopDatePicker
                        label="Data inicial"
                        inputFormat="dd/MM/yyyy"
                        value={startDate}
                        onChange={handleChangeStartDate}
                        renderInput={(params) => (
                          <TextField {...params} sx={{ mr: 1, mb: 2 }} />
                        )}
                      />
                    </div>
                    <div className="datePicker" style={{ marginRight: 10 }}>
                      <DesktopDatePicker
                        label="Data final"
                        inputFormat="dd/MM/yyyy"
                        value={endDate}
                        minDate={startDate}
                        maxDate={
                          discretization === '1_mes'
                            ? new Date(startDate).setUTCFullYear(
                              startDate.getUTCFullYear() + 2
                            )
                            : discretization === '1_dia'
                              ? new Date(startDate).setUTCFullYear(
                                startDate.getUTCFullYear() + 2
                              )
                              : discretization === '1_hora'
                                ? new Date(startDate).setUTCMonth(
                                  startDate.getUTCMonth() + 1
                                )
                                : discretization === '15_min'
                                  ? new Date(startDate).setUTCDate(
                                    startDate.getUTCDate() + 7
                                  )
                                  : new Date(startDate).setUTCDate(
                                    startDate.getUTCDate() + 1
                                  )
                        }
                        onChange={(newValue: any) =>
                          handleChangeEndDate(newValue)
                        }
                        renderInput={(params) => (
                          <TextField {...params} sx={{ mb: 2 }} />
                        )}
                      />
                    </div>
                  </LocalizationProvider>
              )}
              <div className="select">
                <BasicButton
                  title="Selecionar!"
                  onClick={() => {
                    setLoader(true)
                    getDiscretization(unity, startDate, endDate, discretization)
                      .then((result) => {
                        setDiscretizedConsumptionData(result)
                        setSend(false)
                        setLoader(false)
                        setTableData(result)
                      })
                      .catch((exception) => {
                        setSend(false)
                        setOpenSnackFields(true)
                        setLoader(false)
                      })
                  }}
                />
              </div>
            </ChartFilters>

            <DiscretizedConsumptionChart
              title={
                discretization === '5_min'
                  ? 'Consumo discretizado em 5 minutos'
                  : discretization === '15_min'
                    ? 'Consumo discretizado em 15 minutos'
                    : discretization === '1_hora'
                      ? 'Consumo discretizado em 1 hora'
                      : 'Consumo discretizado em 1 dia'
              }
              subtitle=""
              dataProps={discretizedConsumptionData}
              label={discretizedConsumptionData.map((value) => value.minut)}
              dataset={'Consumo'}
              dataset1="Estimado"
              month
            />
          </RenderIf>

          {/* demand chart */}
          <RenderIf isTrue={menu === 1}>
            <ChartFilters>
              <div className="input">
                <FormControl style={{ minWidth: 100, width: 200 }} size="small">
                  <InputLabel>Unidade</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unity}
                    label="Unidade"
                    onChange={(value) => setUnity(value.target.value)}
                    sx={{ height: 63, mb: 2 }}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>

                    {clients.map(({ codigo_scde, unidade }) => (
                      <MenuItem key={codigo_scde} value={codigo_scde}>
                        {unidade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="input">
                <FormControl
                  sx={{ minWidth: 120, width: 200, ml: 1, mr: 1 }}
                  size="small"
                >
                  <InputLabel>Discretização</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={discretization}
                    label="Discretização"
                    onChange={(value) => setDiscretization(value.target.value)}
                    sx={{ height: 63, mb: 2 }}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value="5_min">5 minutos</MenuItem>
                    <MenuItem value="15_min">15 minutos</MenuItem>
                    <MenuItem value="1_hora">1 hora</MenuItem>
                    {/* <MenuItem value="1_dia">1 dia</MenuItem>
                    <MenuItem value="1_mes">1 mês</MenuItem> */}
                  </Select>
                </FormControl>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="datePicker">
                  <DesktopDatePicker
                    label="Data inicial"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ mr: 1, mb: 2 }} />
                    )}
                  />
                </div>
                <div className="datePicker" style={{ marginRight: 10 }}>
                  <DesktopDatePicker
                    label="Data final"
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    maxDate={
                      discretization === '1_mes'
                        ? new Date(startDate).setUTCFullYear(
                          startDate.getUTCFullYear() + 2
                        )
                        : discretization === '1_dia'
                          ? new Date(startDate).setUTCFullYear(
                            startDate.getUTCFullYear() + 2
                          )
                          : discretization === '1_hora'
                            ? new Date(startDate).setUTCMonth(
                              startDate.getUTCMonth() + 1
                            )
                            : discretization === '15_min'
                              ? new Date(startDate).setUTCDate(
                                startDate.getUTCDate() + 7
                              )
                              : new Date(startDate).setUTCDate(
                                startDate.getUTCDate() + 1
                              )
                    }
                    onChange={(newValue: any) => handleChangeEndDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ mb: 2 }} />
                    )}
                  />
                </div>
              </LocalizationProvider>
              <div className="select">
                <BasicButton
                  title="Selecionar!"
                  onClick={() => {
                    setLoader(true)
                    getDemand(unity, startDate, endDate, discretization)
                      .then((result) => {
                        setDemRegXDemCon(result)
                        setSend(false)
                        setLoader(false)
                        setTableData(result)
                      })
                      .catch((exception) => {
                        setSend(false)
                        setOpenSnackFields(true)
                        setLoader(false)
                      })
                  }}
                />
              </div>
            </ChartFilters>
            <DemRegXDemConChart
              data1={demRegXDemCon}
              data2={demRegXDemCon}
              dataset1={'Demanda contratada + 5%'}
              dataset2={'barra1'}
              dataset3={'Demanda Registrada'}
              label={demRegXDemCon.map((value) => value.hora)}
              title="Demanda Contratada X Registrada"
              subtitle=""
              red
            />
          </RenderIf>

          {/* power factor chart */}
          <RenderIf isTrue={menu === 2}>
            <ChartFilters>
              <div className="input">
                <FormControl style={{ minWidth: 100, width: 200 }} size="small">
                  <InputLabel>Unidade</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={unity}
                    label="Unidade"
                    onChange={(value) => setUnity(value.target.value)}
                    sx={{ height: 63, mb: 2 }}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>

                    {clients.map(({ codigo_scde, unidade }) => (
                      <MenuItem key={codigo_scde} value={codigo_scde}>
                        {unidade}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="input">
                <FormControl
                  sx={{ minWidth: 120, width: 200, ml: 1, mr: 1 }}
                  size="small"
                >
                  <InputLabel>Discretização</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={discretization}
                    label="Discretização"
                    onChange={(value) => setDiscretization(value.target.value)}
                    sx={{ height: 63, mb: 2 }}
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Nenhum</em>
                    </MenuItem>
                    <MenuItem value="5_min">5 minutos</MenuItem>
                    <MenuItem value="15_min">15 minutos</MenuItem>
                    <MenuItem value="1_hora">1 hora</MenuItem>
                    <MenuItem value="1_dia">1 dia</MenuItem>
                    <MenuItem value="1_mes">1 mês</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="datePicker">
                  <DesktopDatePicker
                    label="Data inicial"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ mr: 1, mb: 2 }} />
                    )}
                  />
                </div>
                <div className="datePicker" style={{ marginRight: 10 }}>
                  <DesktopDatePicker
                    label="Data final"
                    inputFormat="dd/MM/yyyy"
                    value={endDate}
                    maxDate={
                      discretization === '1_mes'
                        ? new Date(startDate).setUTCFullYear(
                          startDate.getUTCFullYear() + 2
                        )
                        : discretization === '1_dia'
                          ? new Date(startDate).setUTCFullYear(
                            startDate.getUTCFullYear() + 2
                          )
                          : discretization === '1_hora'
                            ? new Date(startDate).setUTCMonth(
                              startDate.getUTCMonth() + 1
                            )
                            : discretization === '15_min'
                              ? new Date(startDate).setUTCDate(
                                startDate.getUTCDate() + 7
                              )
                              : new Date(startDate).setUTCDate(
                                startDate.getUTCDate() + 1
                              )
                    }
                    onChange={(newValue: any) => handleChangeEndDate(newValue)}
                    renderInput={(params) => (
                      <TextField {...params} sx={{ mb: 2 }} />
                    )}
                  />
                </div>
              </LocalizationProvider>
              <div className="select">
                <BasicButton
                  title="Selecionar!"
                  onClick={() => {
                    setLoader(true)
                    getPowerFactorData(
                      unity,
                      startDate,
                      endDate,
                      discretization
                    )
                      .then((result) => {
                        setFatorPotenciaData(result)
                        setSend(false)
                        setLoader(false)
                        setTableData(result)
                      })
                      .catch((exception) => {
                        setSend(false)
                        setOpenSnackFields(true)
                        setLoader(false)
                      })
                  }}
                />
              </div>
            </ChartFilters>
            <FatorPotenciaChart
              title="Fator de Potencia"
              subtitle=""
              data1={fatorPotenciaData}
              data2={fatorPotenciaData}
              dataset1="Fator de Potencia"
              dataset2="Fator ref"
              label={fatorPotenciaData.map((value) => value.day_formatted)}
            />
          </RenderIf>

          <RenderIf isTrue={loader}>
            <div className="modal">
              <div id="preloader_1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </RenderIf>

          <table className="tg">
            <thead>
              <tr>
                <th className="tg-8oo6">Unidade</th>
                <th className="tg-8oo6">Ponto</th>
                <th className="tg-8oo6">Numero do dia</th>
                <th className="tg-8oo6">Dia formatado</th>
                <th className="tg-8oo6">Hora</th>
                <th className="tg-8oo6">Minuto</th>
                <th className="tg-8oo6">f_ref</th>
                <th className="tg-8oo6">Consumo</th>
                <th className="tg-8oo6">Reativa</th>
                <th className="tg-8oo6">fp</th>
                <th className="tg-8oo6">dem contratada</th>
                <th className="tg-8oo6">dem registrada</th>
                <th className="tg-8oo6">dem tolerancia</th>
              </tr>
            </thead>
            <tbody>
              {fatorPotenciaData !== null
                ? fatorPotenciaData?.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td className="tg-gceh">{unity}</td>
                      <td className="tg-gceh">{value?.ponto}</td>
                      <td className="tg-gceh">
                        {parseFloat(value?.dia_num)}
                      </td>
                      <td className="tg-uulg">{value?.day_formatted}</td>
                      <td className="tg-gceh">{value?.hora}</td>
                      <td className="tg-gceh">{value.minut}</td>
                      <td className="tg-gceh">{value?.f_ref}</td>
                      <td className="tg-uulg">
                        {parseFloat(value?.consumo).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2
                        })}
                      </td>
                      <td className="tg-gceh">
                        {parseFloat(value?.reativa).toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2
                        })}
                      </td>
                      <td className="tg-gceh">{parseFloat(value?.fp)}</td>
                      <td className="tg-gceh">{value?.dem_cont}</td>
                      <td className="tg-gceh">{value?.dem_reg}</td>
                      <td className="tg-gceh">{value?.dem_tolerancia}</td>
                    </tr>
                  )
                })
                : null}
            </tbody>
          </table>

          <RenderIf isTrue={showChart}>
            <DemRegXDemConChart
              data1={demRegXDemCon}
              data2={demRegXDemCon}
              dataset1={'Demanda contratada + 5%'}
              dataset2={'barra1'}
              dataset3={'Demanda Registrada'}
              label={demRegXDemCon?.map((value) => value.hora)}
              title="Demanda Contratada X Registrada"
              subtitle=""
              red
            />
          </RenderIf>

          <Buttons>
            {/* <GradientButton title='DADOS' description='CLIQUE AQUI PARA GERAR GRÁFICO DO MÊS ATUAL' onClick={() => setShowChart(!showChart)} purple /> */}
            {/* <GradientButton title='GRÁFICO' description='CLIQUE AQUI PARA GERAR GRÁFICO DO PERÍODO SELECIONADO' onClick={() => handleVerifyFields()} orange /> */}
            <GradientButton
              title="DOWNLOADS"
              description={`CLIQUE AQUI PARA BAIXAR OS DADOS EM FORMATO EXCEL DO PERÍODO SELECIONADO`}
              green
              onClick={() => {
                htmlToCSV(
                  `${menu === 2
                    ? 'fator_potencia'
                    : menu === 1
                      ? 'demanda'
                      : 'consumo_discretizado'
                  }.csv`
                )
              }}
            />
          </Buttons>

          <p className="paragraph">
            <i>
              Fonte: Dados coletados do Sistema de Coleta de Dados de Energia -
              SCDE da Câmara de Comercialização <br />
              Energia Elétrica – CCEE, sendo que as quantidades aqui informadas
              são de responsabilidade <br />
              do agente de medição - Distribuidora.
            </i>
          </p>
        </TelemetriaView>
      )}
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-client_id']: client_id } = parseCookies(ctx)

  const apiClient = getAPIClient(ctx)

  let clients = []

  await apiClient
    .post('/units', {
      filters: [
        {
          type: '=',
          field: 'dados_cadastrais.cod_smart_cliente',
          value: client_id
        },
        { type: 'not_in', field: 'dados_cadastrais.codigo_scde', value: ['0P'] }
      ],
      fields: ['unidade', 'cod_smart_unidade', 'codigo_scde'],
      distinct: true
    })
    .then((res) => {
      console.log(res.data)
      clients = res.data.data
    })
    .catch((res) => {
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
      clients
    }
  }
}
