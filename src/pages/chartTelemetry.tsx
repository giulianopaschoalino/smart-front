import React, { useState } from 'react'
import { SingleBar } from '../components/graph/SingleBar'
import { ChatTelemetryView } from '../styles/layouts/ChatTelemetry/ChatTelemetryView'
import { useRouter } from 'next/router'

import { FatorPotencia } from '../services/fatorPotencia'
import { ConsumoDecretizadoBar } from '../services/consumoDiscretizadoBar'
import { ConsumoDecretizadoLine } from '../services/consumoDiscretizadoLine'
import LineChart from '../components/graph/LineChart'
import { LineBarChart } from '../components/graph/LineBarChart'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import Head from 'next/head'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'white',
  p: 5,
};

export default function chartTelemetry() {
  const [openFatorPotencia, setOpenFatorPotencia] = useState(false);
  const handleCloseFatorPotencia = () => setOpenFatorPotencia(false);

  const [openConsumoDiscretizado1, setOpenConsumoDiscretizado1] = useState(false);
  const handleCloseConsumoDiscretizado1 = () => setOpenConsumoDiscretizado1(false);

  const [openConsumoDiscretizado2, setOpenConsumoDiscretizado2] = useState(false);
  const handleCloseConsumoDiscretizado2 = () => setOpenConsumoDiscretizado2(false);

  const [openDemandaContratada, setOpenDemandaContratada] = useState(false);
  const handleCloseDemandaContratada = () => setOpenDemandaContratada(false);

  return (
    <ChatTelemetryView>
      <Head>
        <title>Smart Energia - Graficos Telemetria</title>
      </Head>
      <Header name='' />
      <PageTitle title='Telemetria - Graficos' subtitle='Gráficos' />
      <section className='chartContainer'>
        <div onClick={() => setOpenFatorPotencia(true)}>
          <LineChart title='Fator de Potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data2} dataset1='Fator de Potencia' dataset2='Fator ref.' label={FatorPotencia.label1} />
        </div>
        <Modal
          open={openFatorPotencia}
          onClose={handleCloseFatorPotencia}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LineChart title='Fator de Potencia' subtitle='' data1={FatorPotencia.data} data2={FatorPotencia.data4} data3={[]} data4={[]} dataset1='Fator de Potencia' label={FatorPotencia.label1} />
          </Box>
        </Modal>

        <div onClick={() => setOpenConsumoDiscretizado1(true)}>
          <LineChart title='Consumo discretizado em 1 hora' subtitle='' data1={ConsumoDecretizadoLine.data} data2={[]} data3={[]} data4={[]} dataset1='Demanda registrada' label={ConsumoDecretizadoLine.label1} />
        </div>
        <Modal
          open={openConsumoDiscretizado1}
          onClose={handleCloseConsumoDiscretizado1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LineChart title='Consumo discretizado em 1 hora' subtitle='' data1={ConsumoDecretizadoLine.data} data2={[]} data3={[]} data4={[]} dataset1='Demanda registrada' label={ConsumoDecretizadoLine.label1} />
          </Box>
        </Modal>

        <div onClick={() => setOpenConsumoDiscretizado2(true)}>
          <SingleBar title='Consumo discretizado em 1 hora' subtitle='' dataProps={ConsumoDecretizadoBar.data} label={ConsumoDecretizadoBar.label} dataset={'Consumo'} dataset1='Estimado' month/>
        </div>
        <Modal
          open={openConsumoDiscretizado2}
          onClose={handleCloseConsumoDiscretizado2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SingleBar title='Consumo discretizado em 1 hora' subtitle='' dataProps={ConsumoDecretizadoBar.data} label={ConsumoDecretizadoBar.label} dataset={'Consumo'} dataset1='Estimado' month/>
          </Box>
        </Modal>

        <div onClick={() => setOpenDemandaContratada(true)}>
          <LineBarChart data1={ConsumoDecretizadoLine.data1} data3={ConsumoDecretizadoLine.data} dataset1={'Demanda contratada + 5%'} dataset2={'barra1'} dataset3={'Demanda Registrada'} label={ConsumoDecretizadoLine.label1} title='Demanda Contratada X Registrada' subtitle='' red/>
        </div>
        <Modal
          open={openDemandaContratada}
          onClose={handleCloseDemandaContratada}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <LineBarChart data1={ConsumoDecretizadoLine.data1} data3={ConsumoDecretizadoLine.data} dataset1={'Demanda contratada + 5%'} dataset2={'barra1'} dataset3={'2021'} label={ConsumoDecretizadoLine.label1} title='Demanda Contratada X Registrada' subtitle='' red/>
          </Box>
        </Modal>
      </section>
    </ChatTelemetryView>
  )
}
