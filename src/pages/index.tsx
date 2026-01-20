import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef
} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import RenderIf from '../utils/renderIf'
import Snackbar from '@mui/material/Snackbar'

import LoginButton from '../components/buttons/loginButton/LoginButton'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import { LoginContainer, LoginView } from '../styles/layouts/login/LoginView'
import Dashboard from './dashboard'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { AxiosError } from 'axios'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Home() {
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)
  const [openSnackError, setOpenSnackError] = useState<boolean>(false)

  const field = useRef(null)

  const [state, setstate] = useState(false)
  const [focus, setFocus] = useState('email')

  const [values, setValues] = useState({
    password: null,
    showPassword: false
  })

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>()

  const router = useRouter()
  const rota = router.pathname

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
    setPassword(event.target.value)
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const { signIn } = useContext(AuthContext)

  async function handleSignIn() {
    try {
      if ([email, password].some(v => !v.trim())) return setOpenSnackError(true);

      await signIn({ email, password })
    } catch (ex) {
      setOpenSnackError(true)
    }
  }

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackError(false)
    setOpenSnackSuccess(false)
  }

  useEffect(() => {
    setValues({
      password: '',
      showPassword: null
    })
    setEmail('')
  }, [rota])

  return (
    <LoginView auth={rota}>
      <Head>
        <title>Smart Energia</title>
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
          notificação cadastrada com sucesso!
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
          Preencha os campos corretamente!
        </Alert>
      </Snackbar>

      <div>
        <Image src="/assets/marca1.png" width={500} height={340} />
      </div>

      <LoginContainer>
        <h1>Bem-Vindo</h1>
        <h2>
          Estratégias Inteligentes em
          <br /> Gestão de Energia
        </h2>

        <TextField
          id="outlined-basic"
          sx={{ m: 1, width: '90%' }}
          label="Login"
          value={email}
          variant="outlined"
          onKeyDown={(e) => e.key === 'Enter' && field.current.children[0].focus()}
          onChange={(value) => setEmail(value.target.value.trim())}
        />
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            ref={field}
            onKeyDown={(e) => (e.key === 'Enter' ? handleSignIn() : null)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
        </FormControl>
        <Link href="verifyEmail">Esqueceu a senha ?</Link>

        <LoginButton title="ENTRAR" onClick={() => handleSignIn()} />

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p>
          <a href="tel:+55(41) 3012-5900">+55(41) 3012-5900</a>
          <br />
          <a
            href="https://www.smartenergia.com.br"
            target="_blank"
            rel="noreferrer"
          >
            www.smartenergia.com.br
          </a>
        </p>
      </LoginContainer>
    </LoginView>
  )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { ['@smartAuth-token']: token } = parseCookies(ctx)
//   if (token) {
//     return {
//       redirect: {
//         destination: '/dashboard',
//         permanent: false
//       }
//     }
//   }
// }
/*export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

//   if (token) {
//     return {
//       redirect: {
//         destination: '/dashboard',
//         permanent: false
//       }
//     }
//   }
  return {
    props: {}
  };
}
*/
