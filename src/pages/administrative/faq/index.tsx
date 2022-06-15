import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { api } from '../../../services/api';


import FaqTable from '../../../components/administrativeTables/FaqTable';
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'
import getAPIClient from '../../../services/ssrApi';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type FaqInterface = {
  question: string;
  answer: string;

}


export default function Sidebar({faqData}) {
  async function handleRegisterNewFaq({question, answer}: FaqInterface) {
    await api.post('/faq', {
      "question": question,
      "answer": answer,

    }).then(res => console.log(res.data))
  }

  const [faq, setFaq] = useState<FaqInterface>({
    question: '',
    answer: '',
  })


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <FaqView>
    <Header name=''/>

      <PageTitle title='Perguntas Frequentes' subtitle='Perguntas Frequentes'/>

      <div className='buttons'>
      <button className='btn2' onClick={handleOpen}>Adicionar</button>
      <button className='btn1' onClick={handleOpen}>Inativar</button>

      </div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <h1>Adicionar/Editar Pergunta</h1>
          <Typography sx={{color:'gray', fontSize:12}}variant="h5" gutterBottom component="div">
          Adicionar/Editar Pergunta
          </Typography>
          <br />

        <TextField id="outlined-basic" label="Pergunta" onChange={value=>setFaq({...faq, question:value.target.value})} sx={{width:710, ml:8}} variant="outlined" /> <br /><br />
        <TextField id="outlined-basic" label="Resposta" onChange={value=>setFaq({...faq, answer:value.target.value})} sx={{width:710, ml:8}} variant="outlined" />

          <br /><br />
        <FaqButton1  title='Cancelar' onClick={function (): void {
              throw new Error('Function not implemented.');
            } } />
        <FaqButton2   title='Salvar' onClick={() => handleRegisterNewFaq(faq)}
        />
        </Box>

      </Modal>
      <FaqTable questionData={faqData}/>

    </FaqView>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  console.log('teste')
  let faqData = [];


await apiClient.get('/faq').then(res => {
  faqData = res.data
}).catch(res => {
  console.log(res)
})
  console.table(faqData);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      faqData
    }
  }
}
