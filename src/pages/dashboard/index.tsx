import { useEffect, useState } from 'react'

import { DashboardView } from '../../styles/layouts/dashboard/DashboardView'

import Link from 'next/link'
import GraphCard from '../../components/graph/graphCard/ChartCard'
import Header from '../../components/header/Header'
import MapCard from '../../components/mapCard/MapCard'
import PageTitle from '../../components/pageTitle/PageTitle'

import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies, setCookie } from 'nookies'
import AccumulatedEconomyTitle from '../../components/accumulatedEconomyTitle/AccumulatedEconomyTitle'
import { CativoXLivreChart } from '../../components/graph/cativoXLivreChart'
import CostIndicatorChart from '../../components/graph/costIndicatorChart'
import { GrossAnualChart } from '../../components/graph/grossAnualChart/GrossAnualChart'
import GrossMensalChart from '../../components/graph/grossMensalChart/GrossMensalChart'
import getAPIClient from '../../services/ssrApi'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import BasicButton from '../../components/buttons/basicButton/BasicButton'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 600,
  width: 500,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,

  borderRadius: 3,

  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

export default function Dashboard({ grossAnualGraph, grossAnualYears, grossMensalGraph, grossMensalYears, acumulatedGraph, mapsInfo, userName, costIndicator }: any) {
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

  const { ['terms']: terms } = parseCookies()

  const currentYear = new Date().getUTCFullYear()
  const previousYear = new Date().getUTCFullYear() - 1

  const [lastDataBrutaMensalS, setLastDataBrutaMensal] = useState('')
  const [lastDataBrutaAnualS, setLastDataBrutaAnual] = useState('')

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let lastDataMensal = '0'
    let lastDataAnual = '0'
    let index = 0

    while (index < grossMensalGraph.length) {
      if (!grossMensalGraph[index].dad_estimado && grossMensalGraph[index].economia_acumulada !== null)
        lastDataMensal = grossMensalGraph[index].economia_acumulada
      index++
    }
    setLastDataBrutaMensal(`${parseFloat(lastDataMensal).toFixed(3)}`)
    index = 0
    while (index < grossAnualGraph.length) {
      if (!grossAnualGraph[index].dad_estimado)
        lastDataAnual = grossAnualGraph[index].economia_acumulada
      index++
    }
    setLastDataBrutaAnual(`${parseFloat(lastDataAnual).toFixed(3)}`)
  }, [])

  return (
    <DashboardView>
      <Head>
        <title>Smart Energia - Visão Geral</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Visão Geral' subtitle='Bem Vindo a Smart Energia' />
      </Header>

      <Link href='pld'>
        <section className="cardsSection" >
          <MapCard title='R$/MWh' subtitle='' date={`${format(new Date(), 'MM/yyyy')}`} statistic='' imgSource='/moneyIcon2.png' />
          {
            mapsInfo.map(value => {
              return <MapCard key={value.submarket} title='S' subtitle={value.submarket} statistic={parseFloat(value.value).toFixed(2)} imgSource='/SUL.svg' />
            })
          }
        </section>
      </Link>

      {
        typeof window === 'undefined' || typeof window === undefined ? null :
          <>
            <section className='dashboard'>
              <GraphCard title='Economia Anual' subtitle='Economia Bruta Estimada e Acumulada Anual - Valores em R$ x mil'>
                <AccumulatedEconomyTitle value={lastDataBrutaAnualS} />
                <GrossAnualChart title='' subtitle=''
                  dataset='Consolidada'
                  dataProps={grossAnualGraph}
                  label={grossAnualYears} barLabel bruta miniature />
              </GraphCard>

              <GraphCard title='Economia Mensal' subtitle='Economia Bruta Estimada e Acumulada Mensal - Valores em R$ x mil'>
                <AccumulatedEconomyTitle value={lastDataBrutaMensalS} />
                <GrossMensalChart title='' subtitle=''
                  data1={grossMensalGraph}
                  data2={grossMensalGraph}
                  label={months}
                  miniature
                />
              </GraphCard>

              <GraphCard title='Custo Mensal Cativo x Livre' subtitle='Comparativo de Custo Estimado - Valores em R$ x mil'>
                <CativoXLivreChart chartData={acumulatedGraph}
                  dataset1="Economia (R$)" dataset2='Est. Cativo' dataset3='Est. Livre'
                  label={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']} title='' subtitle='' barLabel hashurado miniature />
              </GraphCard>

              <GraphCard title='Indicador de Custo' subtitle='Indicador de Custo - Valores em R$/MWh'>
                <CostIndicatorChart title='' subtitle=''
                  data1={costIndicator?.filter((value, index) => value?.mes.slice(0, 4).includes(costIndicator[0].mes.slice(0, 4))).map(value => value?.custo_unit && !!parseInt(value?.custo_unit) ? value.custo_unit : null)}
                  data2={costIndicator?.filter((value, index) => value?.mes.slice(0, 4).includes(costIndicator[costIndicator.length - 1].mes.slice(0, 4))).map(value => value?.custo_unit && !!parseInt(value?.custo_unit) ? value.custo_unit : null)}
                  // years={[costIndicator[0].mes.slice(0, 4), costIndicator[costIndicator.length - 1].mes.slice(0, 4)]}
                  years={[previousYear+'', currentYear+'']}
                  label={months}
                  miniature
                />
              </GraphCard>
            </section>
            <Modal
              open={terms == 'false'}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Termos de uso
                </Typography>
                <Box sx={{ overflow: 'auto', flex: 1 }}>
                  <img src='assets/smart-energia-terms-image.png' style={{ maxWidth: '100%' }} />
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <p>
                      Bem-vindo ao Smart Energy View, a Plataforma Web da SMART ENERGIA!
                    </p>

                    <p>
                      Agora você terá a Gestão da sua Energia na palma da sua mão!!!!
                    </p>

                    <p>
                      Visualize os principais indicadores, dados de economia, resumo de operações, PLD, notícias além de acompanhar o consumo de energia em intervalos mínimos de 5 minutos.
                    </p>

                    <p>
                      Estamos na última fase de testes da plataforma e em breve também iremos disponibilizar os aplicativos para seu celular, nos sistemas operacionais IOS e Android.
                    </p>

                    <p>
                      Encontrando qualquer dificuldade, eventuais inconsistências ou dúvidas, nos contate!
                    </p>

                    <p>
                      Lembrando que conforme nosso contrato de serviços vigente, todas as informações entregues são estritamente privadas, sendo seu sigilo protegido por lei, não podendo ser compartilhadas com terceiros sendo destinadas a seu uso exclusivo.
                    </p>

                    <p>
                      A divulgação não autorizada das informações adquiridas nesta plataforma (ou seu uso), de forma integral ou parcial, é proibida, não sendo permitido o compartilhamento dos acessos e senhas ou qualquer informação que tiver acesso junto a esta plataforma, sendo que o acesso a esta plataforma é restrito e individual.
                    </p>

                    <p>
                      Destacamos que os resultados informados são meramente indicativos, não vinculantes a resultados e que as premissas disponibilizadas na plataforma são as mesmas utilizadas nos Energys Reports e estudos encaminhados.
                    </p>


                    <p>
                      <strong>Aproveite essa nova ferramenta de acompanhar sua Gestão de Energia!</strong>
                    </p>
                  </Typography>
                </Box>
                <BasicButton title="Aceito os termos" onClick={() => {
                  setCookie(undefined, 'terms', 'true')
                  setOpen(false)
                }} />
              </Box>
            </Modal>
          </>
      }
    </DashboardView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let grossAnualGraph = [];
  let grossMensalGraph = [];
  let acumulatedGraph = [];
  let costIndicator = []
  let mapsInfo = [];

  await apiClient.post('/economy/grossAnnual').then(res => {
    grossAnualGraph = res.data.data
  })

  await apiClient.post('/economy/grossMonthly').then(res => {
    grossMensalGraph = res.data.data
  })

  await apiClient.post('/economy/estimates').then(res => {
    acumulatedGraph = res.data.data
  })

  await apiClient.post('/economy/MWh').then(res => {
    costIndicator = res.data.data
  })

  await apiClient.post('/pld/overview').then(res => {
    mapsInfo = res.data.data
  })

  const grossMensalYears = grossMensalGraph.map((value) => value.mes)
  const grossAnualYears = grossAnualGraph.map((value) => value.ano)

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
      grossAnualGraph,
      grossAnualYears,
      grossMensalYears,
      grossMensalGraph,
      acumulatedGraph,
      costIndicator,
      mapsInfo,

      userName
    }
  }
}
