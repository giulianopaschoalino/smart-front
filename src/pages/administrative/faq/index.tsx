import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';
import CommonQuestionsCard from '../../../components/faqQuestionsCard/FaqQuestionsCard'



import { FaqView } from './faqView'

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
    <FaqView>
      <div className='title'>
       <h1>Adicionar/Editar Pergunta</h1>
          <Typography sx={{color:'gray', fontSize:12}}variant="h5" gutterBottom component="div">
          Adicionar/Editar Pergunta
          </Typography>
      </div>
      <div className='buttons'>

      <button className='btn' onClick={handleOpen}>Open modal</button>
      <button className='btn2' onClick={handleOpen}>Open modal</button>
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


    </FaqView>
  )
}
