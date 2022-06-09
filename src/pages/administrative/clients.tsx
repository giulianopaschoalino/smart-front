import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import Modal from '@mui/material/Modal';
import PageTitle from '../../components/pageTitle/PageTitle'
import { ClientsModalView, ClientsView } from '../../styles/layouts/clients/ClientsView'
import Box from '@mui/material/Box';
import FaqButton1 from '../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../components/buttons/faqButton/FaqButton2';

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
  overflowY: 'scroll'
};



export default function clients() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = useState(false)



  return (
    <>
      <ClientsView>
        <PageTitle title='Clientes' subtitle='Clientes Smart Energia'/>

        <section>
          <BasicButton title='Adicionar' onClick={handleOpen}/>

        </section>

        {/* <button className='btn2' onClick={handleOpen}>Open modal</button> */}
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <h1>Adicionar Cliente</h1>
          <Typography sx={{color:'gray', fontSize:12}}variant="h5" gutterBottom component="div">
          Adicionar Cliente Smart Energia</Typography>
          <br />
         <TextField id="outlined-basic" label="Nome" sx={{width:350, ml:5}} variant="outlined" />
         <TextField id="outlined-basic" label="E-mail/Usuário" sx={{width:350, ml:8}} variant="outlined" />
         <TextField id="outlined-basic" label="Senha" sx={{width:350, ml:5, mt:2}} variant="outlined" />
         <TextField id="outlined-basic" label="Confirma Senha" sx={{width:350, ml:8, mt:2}} variant="outlined" />
         <TextField id="outlined-basic" label="Codigo do Cliente Smart Energia" sx={{width:350, ml:5, mt:2}} variant="outlined" />
         <TextField id="outlined-basic" label="Imagem/Logotipo" sx={{width:350, ml:8, mt:2}} variant="outlined" />
          <br /><br />
         <FaqButton1  title='Cancelar' />
          <FaqButton2  title='Salvar' />



        </Box>

        </Modal>

      </ClientsView>

         </>
  )
}
