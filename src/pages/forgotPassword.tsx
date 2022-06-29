import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import FormData from 'form-data';
import Snackbar from '@mui/material/Snackbar';
import LoginButton from '../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';
import { ForgotPasswordContainer, ForgotPasswordView } from '../styles/layouts/forgotPassword/ForgotPasswordView';
import RenderIf from '../utils/renderIf';
import Alert from '@mui/material/Alert';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import getAPIClient from '../services/ssrApi';
import { api } from '../services/api';

export default function ForgotPassword() {
  const router = useRouter()
  const rota = router.pathname
  const formData = new FormData();
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [same, setSame] = useState<boolean>(false)
  const [email, setEmail] = useState<any>();

  useEffect(() => {
    setPassword('')
    setConfirmPassword('')
    setSame(false)
  }, [rota])


  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackError(false);
    setOpenSnackSuccess(false);
  };



  useEffect(() => {
    if (password == confirmPassword && password != '') {
      setSame(false)
    } else {
      setSame(true)
    }
  }, [password])

  function handleSendEmail() {
    formData.append('email', email)
    api.post('/auth/forgot-password', formData).then(res => {
      setOpenSnackSuccess(true)
    }).catch(res => {
      setOpenSnackError(true)
    })
  }

  return (
    <ForgotPasswordView auth={rota}>
      <Head>
        <title>Smart Energia</title>
      </Head>
      <Image src='/assets/marca1.svg' width={350} height={350} />
      <ForgotPasswordContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} value={password} label="Senha" onChange={value => setPassword(value.target.value)} variant="outlined"/>
        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} value={confirmPassword} label="Confirmar Senha" onChange={value => setConfirmPassword(value.target.value)} variant="outlined"/>

        <LoginButton title='Redefinir Senha' onClick={() => handleSendEmail()} />

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

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' >www.energiasmart.com.br</a></p>

      </ForgotPasswordContainer>
    </ForgotPasswordView>
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
