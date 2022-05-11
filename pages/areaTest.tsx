import React from 'react'
import BasicButton from '../src/components/buttons/basicButton/BasicButton'
<<<<<<< HEAD
import Image from 'next/image';
=======
import GradientButton from '../src/components/buttons/gradientButton/GradientButton'
>>>>>>> d76992f98de0130492c71a92530d12b04793ecac
import Graph from '../src/components/graph/Chart'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';





export default function areaTest() {

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const handleChange =
    (prop) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
 const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
<<<<<<< HEAD
    // <Graph title='Indicador de custo' />
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-ad
          ornment-password">Password</InputLabel>
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
                  {values.showPassword ? <Image src="/eye-svgrepo-com.svg" width={50} height={10}/> : <Image src="/eye-svgrepo-com.svg" width={50} height={10} />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

=======
    <>
      <Graph title='Indicador de custo' />
      <GradientButton title='GRÁFICO' description='Gerar gráficos com os dados selecionados' orange />
    </>
>>>>>>> d76992f98de0130492c71a92530d12b04793ecac
  )
}
