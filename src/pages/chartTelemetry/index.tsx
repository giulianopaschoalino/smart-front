import React, { useEffect, useState } from 'react'
import { ChatTelemetryView } from '../../styles/layouts/ChatTelemetry/ChatTelemetryView'

import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import Head from 'next/head'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import getAPIClient from '../../services/ssrApi'
import FatorPotenciaChart from '../../components/graph/fatorPotenciaChart'

import { DiscretizedConsumptionChart } from '../../components/graph/DiscretizedConsumptionChart'
import DiscretizedConsumptionChartLine from '../../components/graph/DiscretizedConsumptionChartLine'
import { useRouter } from 'next/router'
import { DemRegXDemConChart } from '../../components/graph/DemRegXDemConChart'
import RenderIf from '../../utils/renderIf'
import { getPowerFactorData } from '../../services/charts/telemetry/getPowerFactor'
import { getDemand } from '../../services/charts/telemetry/getDemand'
import { getDiscretization } from '../../services/charts/telemetry/getDiscretization'

export default function chartTelemetry({userName}) {
  const [fatorPotenciaData, setFatorPotenciaData] = useState([]);
  const [demRegXDemCon, setDemRegXDemCon] = useState([]);
  const [discretizedConsumptionData, setDiscretizedConsumptionData] = useState([]);
  const [discretizedConsumptionDataReativa, setDiscretizedConsumptionDataReativa] = useState([]);

  const { ['user-cod_client']: cod_client } = parseCookies()

  const router = useRouter()

  const {startDate, endDate, unity, discretization} = router.query

  const { '@smartAuth-token': token } = parseCookies()

  function getChartsData() {
    console.log(token)
    getPowerFactorData("PRAXCUENTR101P", "2022-01-01", "2022-01-31", "med_5min")
      .then(result => setFatorPotenciaData(result))
      .catch(exception => console.log('exeption', exception))

    // getDiscretization("PRAXCUENTR101P", "2022-01-01", "2022-01-31", "med_5min")
    //   .then(result => setDiscretizedConsumptionDataReativa(result))
    //   .catch(exception => console.log(exception))

    // getDiscretization("PRAXCUENTR101P", "2022-01-01", "2022-01-31", "med_5min")
    //   .then(result => setDiscretizedConsumptionData(result))
    //   .catch(exception => console.log(exception))

    // getDemand("PRAXCUENTR101P", "2022-01-01", "2022-01-31", "med_5min")
    //   .then(result => setDemRegXDemCon(result))
    //   .catch(exception => console.log(exception))

    // setFatorPotenciaData(res.data.data)
    // setDiscretizedConsumptionDataReativa(res.data.data)
    // setDiscretizedConsumptionData(res.data.data)
    // setDemRegXDemCon(res.data.data)
  }

  useEffect(() => {
    getChartsData()
  }, [])

  return (
    <ChatTelemetryView>
      <Head>
        <title>Smart Energia - Graficos Telemetria</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Telemetria - Graficos' subtitle='Gráficos' />
      <section className='chartContainer'>
        {
          demRegXDemCon===null?
          <div id="preloader_1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          :
          <>

          <RenderIf isTrue={discretization!=='1_dia' && discretization!=='1_mes'}>
          {/* <RenderIf isTrue={true}> */}
            <div>
              <DiscretizedConsumptionChart title={
                  discretization==='5_min'? 'Consumo discretizado em 5 minutos' :
                  discretization==='15_min'? 'Consumo discretizado em 15 minutos' : discretization==='1_hora'? 'Consumo discretizado em 1 hora' : 'Consumo discretizado em 1 dia'
                } subtitle='' dataProps={discretizedConsumptionData} label={discretizedConsumptionData.map(value => value.minut)} dataset={'Consumo'} dataset1='Estimado' month/>
                <p style={{alignSelf: 'center', textAlign: 'center'}}>{`Mês - ${startDate}`}</p>
            </div>

            <div>
              <DiscretizedConsumptionChartLine title={
                  discretization==='5_min'? 'Consumo discretizado em 5 minutos' :
                  discretization==='15_min'? 'Consumo discretizado em 15 minutos' : discretization==='1_hora'? 'Consumo discretizado em 1 hora' : 'Consumo discretizado em 1 dia'
                } subtitle='' data1={discretizedConsumptionDataReativa} dataset1='Demanda registrada'
                label={discretizedConsumptionDataReativa.map(data => parseFloat(data.reativa).toFixed(3))} />
            </div>
          </RenderIf>

            <div>
              <DemRegXDemConChart data1={demRegXDemCon} data2={demRegXDemCon}
              dataset1={'Demanda contratada + 5%'} dataset2={'barra1'} dataset3={'Demanda Registrada'}
              label={demRegXDemCon.map(value => value.hora)} title='Demanda Contratada X Registrada' subtitle='' red/>
            </div>

            <div>
            <FatorPotenciaChart title='Fator de Potencia' subtitle='' data1={fatorPotenciaData}
              data2={fatorPotenciaData} dataset1='Fator de Potencia' dataset2='Fator ref' label={fatorPotenciaData.map(value => parseFloat(value.dia_num))} />
            </div>
          </>
        }
        </section>
    </ChatTelemetryView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)

  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-cod_client']: cod_client } = parseCookies(ctx)

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
    }
  }
}
