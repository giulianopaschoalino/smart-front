import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React, { useState } from 'react'
import BasicButton from '../../../components/buttons/basicButton/BasicButton'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { IndustryInfoView } from '../../../styles/layouts/industryInfo/IndustryInfoView'
import InputUploadPdf from '../../../components/inputUploadPdf/inputUpload';
import { api } from '../../../services/api'

import FormData from 'form-data';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { InputUploadView } from '../../../components/inputUploadPdf/inputUploadView'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function industryInfo({userName}: any) {
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
    }).catch(res => {
      setOpenSnackError(true)
    })
  }

  return (
    <IndustryInfoView>
      <Snackbar open={openSnackSuccess} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          PDF Baixado com Sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          PDF não baixado!
        </Alert>
      </Snackbar>
      <Head>
        <title>Smart Energia - Info de Setor</title>
      </Head>
      <Header name={userName} />
      <div className='title'>
        <PageTitle title='Info Setorial' subtitle='Realize o upload da última versão de info setorial' />
        <InputUploadView>
          <div className="update">
          <form action="">
            <div className='testess'>
              <label  htmlFor="arquivo"> <p className='TitleButton'> Enviar PDF </p>   </label>
              <input  type="file" name='arquivo' id='arquivo' onChange={onChange} />
            </div>
          </form>
          </div>
        </InputUploadView>
        {/* <InputUploadPdf/> */}
      </div>

      <BasicButton onClick={() => handleCreateClient()} title='Atualizar'/>

    </IndustryInfoView>
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
