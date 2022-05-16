import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'

import LoginButton from '../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';

import Alert from '@mui/material/Alert';

import { VerifyEmailContainer, VerifyEmailView } from '../styles/layouts/forgotPassword/verifyEmail';
import RenderIf from '../utils/renderIf';

export default function VerifyEmail() {
  const [sent, setSent]=useState(false);
  const [code, setCode]=useState<string>('')
  const [codeStatus, setCodeStatus]=useState<boolean>(null)

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

  function verifyConfirmationCode() {
    if (code === '0000') {
      setTimeout(() => {
        router.push('/')
      }, 2500);
      setCodeStatus(true)
    } else {
      setCodeStatus(false)
    }
  }

  return (
    <VerifyEmailView auth={rota} >
      <Image src='/assets/marca1.svg' width={500} height={500} />
      <VerifyEmailContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Email" variant="outlined"/>
        <RenderIf isTrue={sent? false : true}>
          <LoginButton title='Enviar Email' onClick={() => setSent(true)} />
        </RenderIf>

        <RenderIf isTrue={sent? true : false}>
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

        <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' >www.energiasmart.com.br</a></p>

      </VerifyEmailContainer>
    </VerifyEmailView>
  )
}
