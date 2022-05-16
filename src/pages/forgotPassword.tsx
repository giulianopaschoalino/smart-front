import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'

import LoginButton from '../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';
import { ForgotPasswordContainer, ForgotPasswordView } from '../styles/layouts/forgotPassword/ForgotPasswordView';

export default function ForgotPassword() {
  const router = useRouter()
  const rota = router.pathname

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  useEffect(() => {
    setPassword('')
    setConfirmPassword('')
  }, [rota])

  return (
    <ForgotPasswordView auth={rota} >
    <Image src='/assets/marca1.svg' width={500} height={500} />
    <ForgotPasswordContainer>
      <h1>Bem-Vindo</h1>
      <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

      <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} value={password} label="Senha" onChange={value => setPassword(value.target.value)} variant="outlined"/>
      <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} value={confirmPassword} label="Confirmar Senha" onChange={value => setConfirmPassword(value.target.value)} variant="outlined"/>

      <LoginButton title='Redefinir Senha' onClick={() => router.push('/')} />

      <fieldset className="line">
        <legend className="text">Ou</legend>
      </fieldset>

      <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' >www.energiasmart.com.br</a></p>

    </ForgotPasswordContainer>
  </ForgotPasswordView>
  )
}
