import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import LoginButton from '../components/buttons/loginButton/LoginButton';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import {AiOutlineEyeInvisible, AiOutlineEye} from 'react-icons/ai';

import { LoginView, LoginContainer } from  '../styles/layouts/login/LoginView';

export default function Home() {
  const [state, setstate]=useState(false);

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const router = useRouter()
  const rota = router.pathname

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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

  return (
    <LoginView auth={rota} >
      <Image src='/assets/marca1.svg' width={350} height={350} />
      <LoginContainer>
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em<br /> Gestão de Energia</h2>

        <TextField id="outlined-basic" sx={{ m: 1, width: '90%' }}label="Login" variant="outlined" />
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
        <Link href='verifyEmail' >Esqueceu a senha ?</Link>

        <LoginButton title='ENTRAR' link />

        <fieldset className="line">
          <legend className="text">Ou</legend>
        </fieldset>

        <p><a href='tel:+55(41) 3012-5900' >+55(41) 3012-5900</a><br/><a href='https://www.energiasmart.com.br' target="_blank" rel="noreferrer" >www.energiasmart.com.br</a></p>

      </LoginContainer>
    </LoginView>
  )
}
