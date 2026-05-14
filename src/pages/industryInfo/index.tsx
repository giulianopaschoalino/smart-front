import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { forwardRef, useState } from 'react'
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import { api } from '../../services/api'
import { IndustryInfoView } from '../../styles/layouts/industryInfo/IndustryInfoView'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useRouter } from 'next/router'
import Banner from '../../components/banner/Banner'
import Image from 'next/image'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function industryInfo({userName}: any) {
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);

  const router = useRouter()

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackError(false);
    setOpenSnackSuccess(false);
  };

  function handleDownloadPdf() {
    api.get('/download').then(res => {
      const pdfUrl = res.data.data

      if (!pdfUrl) {
        setOpenSnackError(true)
        return
      }

      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
      setOpenSnackSuccess(true)
    }).catch(() => setOpenSnackError(true))
  }

  return (
    <main style={{width: '100%'}}>
      <Snackbar open={openSnackSuccess} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Pdf baixado Sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
        Pdf não baixado!
        </Alert>
      </Snackbar>
      <Head>
        <title>Smart Energia - Info de Setor</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Info setorial' subtitle='Baixe o pdf para ver o info setorial'/>
      </Header>
      <IndustryInfoView>
        <section>
          <article>
            <p style={{marginRight: '10px'}}>A Smart é uma empresa de vanguarda na informação sobre o Setor Elétrico Brasileiro e mantém sólidos relacionamentos com os agentes e entidades do setor,
              a informação precisa aliada à mais de 21 anos de experiência torna a sua consultoria estratégica para consumidores e geradores</p>
            <Image src='/assets/banners/sectoriaInf.jpg' width={350} height={250}/>
          </article>
          <p>Um resumo das atualizações gerais do Setor Elétrico, com dados sobre geração consumo, demanda, meteorologia baseadas em informações do ONS, CCEE, ANEEL, 10 Maiores Jornais e Revistas e CPTEC</p>
        </section>
        <button onClick={() => handleDownloadPdf()}>Clique aqui para baixar o arquivo em PDF</button>

      </IndustryInfoView>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

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
      userName
    }
  }
}

