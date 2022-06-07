import Head from 'next/head'
import React from 'react'
import CommonQuestionsCard from '../../../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../../../components/header/Header'
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'
import BasicButton from '../../../components/buttons/basicButton/BasicButton';

import TextField from '@mui/material/TextField';

export default function commonQuestions() {
  return (
    <FaqView>
      <Head>
        <title>Smart Energia - FAQ</title>
      </Head>
      <Header name='' />
      <h1>Perguntas Frequentes</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

      <TextField id="standard-basic" label="Pergunta" sx={{width:740}} variant="standard" />
      <TextField id="standard-basic" label="Resposta" sx={{width:740}} variant="standard" />
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
