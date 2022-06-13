import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import PageTitle from '../../../components/pageTitle/PageTitle'

import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';

import TextField from '@mui/material/TextField';
import Head from 'next/head'



import FaqTable from '../../../components/administrativeTables/FaqTable';
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import Header from '../../../components/header/Header'
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'




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



export default function Sidebar() {

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
         <TextField id="outlined-basic" label="Pergunta" sx={{width:710, ml:8}} variant="outlined" /> <br /><br />
         <TextField id="outlined-basic" label="Resposta" sx={{width:710, ml:8}} variant="outlined" />
          <br /><br />
         <FaqButton1  title='Cancelar' />
         <FaqButton2  title='Salvar' />
        </Box>

      </Modal>
      <FaqTable />

    </FaqView>
    </>
  )
}
