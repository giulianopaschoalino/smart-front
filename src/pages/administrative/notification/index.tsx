import Head from 'next/head'
import React from 'react'
import CommonQuestionsCard from '../../../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../../../components/header/Header'
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';






export default function commonQuestions() {

  const [month, setMonth] = React.useState('');
  const [unidade, setUnidade] = React.useState('');

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };
  const handleChangeUnidade = (event: SelectChangeEvent) => {
    setUnidade(event.target.value);
  };



  return (
    <FaqView>
      <Head>
        <title>Smart Energia - FAQ</title>
      </Head>
      <Header name='' />
      <h1>Perguntas Frequentes</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <TextField id="standard-basic" label="Mensagem" sx={{width:700}} variant="standard" />

      <br />

      <FormControl size='small' fullWidth sx={{ width: 135}} >

        <InputLabel id="demo-simple-select-label">Clientes</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label="Month"
          onChange={handleChangeMonth}
        >
          <MenuItem value={15}>Cliente 1</MenuItem>
          <MenuItem value={20}>Cliente 2</MenuItem>
          <MenuItem value={30}>Cliente 3</MenuItem>
          <MenuItem value={30}>Cliente 4</MenuItem>
          <MenuItem value={30}>Cliente 5</MenuItem>
          <MenuItem value={30}>Cliente 6</MenuItem>
          <MenuItem value={30}>Cliente 7</MenuItem>

        </Select>
      </FormControl>
<br />
      <BasicButton  title='Enviar' />

      <section className='CommonQuestionsSection' >
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
      </section>
    </FaqView>
  )
}
