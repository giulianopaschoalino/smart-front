import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import LoginButton from '../components/buttons/loginButton/LoginButton';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';
import { LoginContainer, LoginView } from  '../styles/layouts/login/LoginView';
import Dashboard from './dashboard';

export default function Home() {
  const [state, setstate] = useState(false);

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const router = useRouter()
  const rota = router.pathname

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { signIn } = useContext(AuthContext)

  async function handleSignIn() {
    await signIn({email, password})
  }

  return (
    <LoginView auth={rota} >
      <Head>
        <title>Smart Energia</title>
      </Head>

      <div>
        <Image src='/assets/marca1.svg' width={520} height={350} />
      </div>

      <LoginContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }} label="Login" variant="outlined" onChange={value => {
          setEmail(value.target.value)
        }}/>
        <FormControl sx={{ m: 1, width: '90%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Link href='verifyEmail'>Esqueceu a senha ?</Link>

        <LoginButton title='ENTRAR' onClick={() => handleSignIn()}/>

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' target="_blank" rel="noreferrer" >www.energiasmart.com.br</a></p>
      </LoginContainer>

    </LoginView>
  )
}
