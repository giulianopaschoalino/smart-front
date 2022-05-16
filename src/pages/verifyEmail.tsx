import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'

import LoginButton from '../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';

import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';

import { ForgotPasswordContainer, ForgotPasswordView } from '../styles/layouts/forgotPassword/ForgotPasswordView';
import { VerifyEmailContainer, VerifyEmailView } from '../styles/layouts/forgotPassword/verifyEmail';

export default function VerifyEmail() {
  const [sent, setSent]=useState(false);
  const [code, setCode]=useState<string>('');

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const router = useRouter()
  const rota = router.pathname

  useEffect(() => {
    if (code === '0000') {
      router.push('/forgotPassword')
    }
  }, [code])

  useEffect(() => {
    setCode('')
    setSent(false)
  }, [rota])

  return (
    <VerifyEmailView auth={rota} >
      <Image src='/assets/marca1.svg' width={500} height={500} />
      <VerifyEmailContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Email" variant="outlined"/>
        {
          sent?
            <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Codigo de verificação" variant="outlined" onChange={value => setCode(value.target.value)} />
            :
            null
        }

          <LoginButton title='Enviar Email' onClick={() => setSent(true)} />

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' >www.energiasmart.com.br</a></p>

      </VerifyEmailContainer>
    </VerifyEmailView>
  )
}
