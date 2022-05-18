import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'

import LoginButton from '../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';
import { ForgotPasswordContainer, ForgotPasswordView } from '../styles/layouts/forgotPassword/ForgotPasswordView';
import RenderIf from '../utils/renderIf';
import Alert from '@mui/material/Alert';
import Head from 'next/head';

export default function ForgotPassword() {
  const router = useRouter()
  const rota = router.pathname

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [same, setSame] = useState<boolean>(false)

  useEffect(() => {
    setPassword('')
    setConfirmPassword('')
    setSame(false)
  }, [rota])

  function handleChangePassword() {
    if (same) {
      router.push('/')
    } else {
      null
    }
  }

  useEffect(() => {
    if (password == confirmPassword && password != '') {
      setSame(false)
    } else {
      setSame(true)
    }
  }, [password])

  return (
    <ForgotPasswordView auth={rota} >
      <Head>
        <title>Smart Energia</title>
      </Head>
      <Image src='/assets/marca1.svg' width={350} height={350} />
      <ForgotPasswordContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} value={password} label="Senha" onChange={value => setPassword(value.target.value)} variant="outlined"/>
        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} value={confirmPassword} label="Confirmar Senha" onChange={value => setConfirmPassword(value.target.value)} variant="outlined"/>

        <LoginButton title='Redefinir Senha' onClick={() => handleChangePassword()} />

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' >www.energiasmart.com.br</a></p>

      </ForgotPasswordContainer>
    </ForgotPasswordView>
  )
}
