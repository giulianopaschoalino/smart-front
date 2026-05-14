import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { forwardRef, useEffect, useState } from 'react'
import BasicButton from '../../../components/buttons/basicButton/BasicButton'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { IndustryInfoView } from '../../../styles/layouts/industryInfo/IndustryInfoView'
import { api } from '../../../services/api'
import FormData from 'form-data';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import getAPIClient from '../../../services/ssrApi'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function industryInfo({userName, pdfUrl}: any) {
  const formData = new FormData();

  const [pdf, setPdf] = useState<any>();
  function onChange(e) {
    setPdf(e.target.files[0])
  }

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackError(false);
    setOpenSnackSuccess(false);
  };

  function handleCreateClient() {
    formData.append('file', pdf)

    api.post('/updateFile', formData).then(res => {
      setOpenSnackSuccess(true)
    }).catch(() => setOpenSnackError(true))
  }

  function handleDownloadPdf() {
    api.get('/download').then(res => {
      const pdfUrl = res.data.data

      if (!pdfUrl) {
        setOpenSnackError(true)
        return
      }

      window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    }).catch(() => setOpenSnackError(true))
  }

  return (
    <IndustryInfoView>
      <Snackbar open={openSnackSuccess} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          PDF enviado com Sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Falha ao enviar PDF!
        </Alert>
      </Snackbar>
      <Head>
        <title>Smart Energia - Info de Setor</title>
      </Head>
      <Header name={userName} />
      <div className='title'>
        <PageTitle title='Info Setorial' subtitle='Realize o upload da última versão de info setorial' />
        <form action="">
          <label htmlFor="">Escolher arquivo</label>
          <input type="file" name='arquivo' placeholder='' id='arquivo' onChange={onChange}/>
        </form>
      </div>

      <BasicButton onClick={() => handleCreateClient()} title='Atualizar'/>
      <BasicButton onClick={() => handleDownloadPdf()} title='Visualizar arquivo mais recente'/>
      <BasicButton onClick={() => console.log('')} title='Excluir último arquivo enviado'/>

    </IndustryInfoView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let pdfUrl = ''

  try {
    const res = await apiClient.get('/download')
    pdfUrl = res.data.data
  } catch {
    pdfUrl = ''
  }

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
      pdfUrl
    }
  }
}
