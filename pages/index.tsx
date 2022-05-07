import React from 'react'
import Image from 'next/image';


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';


import { LoginView} from  '../styles/layouts/Login/LoginView';


export default function Home() {
  // interface State {
  //   amount: string;
  //   password: string;
  //   weight: string;
  //   weightRange: string;
  //   showPassword: boolean;
  // }
  // const [values, setValues] = React.useState<State>({
  //   amount: '',
  //   password: '',
  //   weight: '',
  //   weightRange: '',
  //   showPassword: false,
  // });

  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };

  return (
    <LoginView>
      <Image src='/assets/marca1.svg' width={600} height={700}/>
      <section className="container">
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em Gestão de Energia</h2>
        <input type="text" placeholder='Login'/>
        <input type="text" placeholder='Senha'/>
        <span>Esqueceu a senha ?</span>
        <button>ENTRAR</button>

        <fieldset>
          <legend>Ou</legend>
        </fieldset>

        <p>+55(41) 3012-5900
        <br /> www.energiasmart.com.br</p>

      </section>
    </LoginView>
  )
}
