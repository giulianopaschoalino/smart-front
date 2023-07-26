import { forwardRef, useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import FormData from 'form-data';
import LoginButton from '../../components/buttons/loginButton/LoginButton';
import TextField from '@mui/material/TextField';

import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

import { VerifyEmailContainer, VerifyEmailView } from '../../styles/layouts/forgotPassword/verifyEmail';
import RenderIf from '../../utils/renderIf';
import Head from 'next/head';
import { api } from '../../services/api';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function VerifyEmail() {
  const [sent, setSent]=useState(false);
  const [code, setCode]=useState<string>('')

  const [codeStatus, setCodeStatus]=useState<boolean>(null)

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);
  const [openSnackSuccessPassword, setOpenSnackSuccessPassword] = useState<boolean>(false);
  const [openSnackErrorPassword, setOpenSnackErrorPassword] = useState<boolean>(false);

  const [email, setEmail] = useState<any>();
  const [token, setToken] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [password_confirmation, setPassword_confirmation] = useState<any>();

  const router = useRouter()
  const rota = router.pathname

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackError(false)
    setOpenSnackSuccess(false)
    setOpenSnackErrorPassword(false)
    setOpenSnackSuccessPassword(false)
  }

  function handleSendEmail() {
    api.post('/auth/forgot-password', {
      email
    }).then(res => {
      setSent(true)
      setOpenSnackSuccess(true)
    }).catch(() => setOpenSnackError(true))
  }

  function verifyConfirmationCode() {
    api.post('/auth/reset-password', {
      email,
      password,
      password_confirmation,
      token
    }).then(res => {
      setSent(true)
      setOpenSnackSuccessPassword(true)
      setTimeout(() => {
        router.push('/')
      }, 2000);
    }).catch(() => setOpenSnackErrorPassword(true))
  }

  useEffect(() => {
    setCode('')
    setSent(false)
    setCodeStatus(null)
  }, [rota])

  return (
    <VerifyEmailView auth={rota} >
      <Head>
        <title>Smart Energia - Verificar Email</title>
      </Head>
      <Snackbar
        open={openSnackSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: '100%' }}
        >
          Email enviado com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackError}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: '100%' }}
        >
          Email não enviado!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackSuccessPassword}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: '100%' }}
        >
          Senha alterada com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackErrorPassword}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: '100%' }}
        >
          Senha não alterada!
        </Alert>
      </Snackbar>

      <Image style={{cursor:'pointer'}} src='/assets/marca1.png' width={500} height={340} onClick={() => router.push('/')} />
      <VerifyEmailContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>
        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} label="Email" onChange={value => setEmail(value.target.value)} variant="outlined"/>
        <RenderIf isTrue={sent? false : true}>
          <LoginButton title='Enviar Email' onClick={() => {
            handleSendEmail()
          }} />
        </RenderIf>

        <RenderIf isTrue={sent? true : false}>
          <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Nova Senha" variant="outlined"  onChange={value => setPassword(value.target.value)}/>
          <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Confirme sua senha" variant="outlined"  onChange={value => setPassword_confirmation(value.target.value)}/>

          <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Codigo de verificação" variant="outlined" onChange={value => setToken(value.target.value)}/>
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

  return {
    props: {
    }
  }
}
