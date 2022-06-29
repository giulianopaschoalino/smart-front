import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'

import LoginButton from '../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';

import { VerifyEmailContainer, VerifyEmailView } from '../styles/layouts/forgotPassword/verifyEmail';
import RenderIf from '../utils/renderIf';
import Head from 'next/head';
import { api } from '../services/api';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

export default function VerifyEmail() {
  const [sent, setSent]=useState(false);
  const [code, setCode]=useState<string>('')
  const [codeStatus, setCodeStatus]=useState<boolean>(null)
  const formData = new FormData();
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);
  const [email, setEmail] = useState<any>();
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const router = useRouter()
  const rota = router.pathname

  useEffect(() => {
    setCode('')
    setSent(false)
    setCodeStatus(null)
  }, [rota])

  function handleSendEmail() {
    formData.append('email', email)
    api.post('/auth/forgot-password', formData).then(res => {
      setOpenSnackSuccess(true)
    }).catch(res => {
      setOpenSnackError(true)
    })
  }

  function verifyConfirmationCode() {
    if (code === '0000') {
      setTimeout(() => {
        router.push('/forgotPassword')
      }, 2500);
      setCodeStatus(true)
    } else {
      setCodeStatus(false)
    }
  }

  return (
    <VerifyEmailView auth={rota} >
      <Head>
        <title>Smart Energia - Verificar Email</title>
      </Head>
      <Image style={{cursor:'pointer'}} src='/assets/marca1.png' width={500} height={340} onClick={() => router.push('/')} />
      <VerifyEmailContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>
        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Email" variant="outlined"/>
        <RenderIf isTrue={sent? false : true}>
          <LoginButton title='Enviar Email' onClick={() => handleSendEmail()} />
        </RenderIf>
        <RenderIf isTrue={sent? true : false}>
          <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Nova Senha" variant="outlined"/>
          <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Codigo de verificação" variant="outlined" onChange={value => setCode(value.target.value)} />
          <LoginButton title='Continuar' onClick={() => {verifyConfirmationCode()}} />
          <RenderIf isTrue={codeStatus===true? true : false} >
            <Alert severity="success">Codigo de veerificação aceito — aguarde um instante!</Alert>
          </RenderIf>
          <RenderIf isTrue={codeStatus===false? true : false} >
            <Alert severity="warning">Codigo de verificação invalido — tente outro!</Alert>
          </RenderIf>
        </RenderIf>

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p><a href='tel:+55(41)3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' >www.energiasmart.com.br</a></p>

      </VerifyEmailContainer>
    </VerifyEmailView>
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
