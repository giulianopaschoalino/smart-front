import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'

import AdministrativeHeader from '../../components/administrativeHeader/AdministrativeHeader';
import ClientsTable from '../../components/administrativeTables/ClientsTable';
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import FaqButton1 from '../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../components/buttons/faqButton/FaqButton2';
import Header from '../../components/header/Header'
import InputUpload from '../../components/inputUplaod/inputUpload';
import { ClientsView } from '../../styles/layouts/clients/ClientsView';
import PageTitle from '../../components/pageTitle/PageTitle';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { ConfirmModalView } from '../../styles/layouts/modals/confirmModalView';
import { api } from '../../services/api';

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
  const [client, setClient] = useState({
    name: String,
    email: String,
    password: String,
    password_confirmation: String,
    client_id: Number
  })

  const [open, setOpen] = useState(false);
  const [openModalInativar, setOpenModalInativar] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = useState(false)

  function handleCreateClient({name, email, password, password_confirmation, client_id}) {
    api.post('', {
      name,
      email,
      password,
      password_confirmation,
      client_id
    })
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <ClientsView>
        <Header name='' />
        <PageTitle title='Clientes' subtitle='Clientes Smart Energia'/>
        <div className='buttons'>
        <button className='btn2' onClick={handleOpen}>Adicionar</button>
        <button className='btn1' onClick={() => setOpenModalInativar(true)}>Inativar</button>
        </div>
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
          <InputUpload />
          <br /><br />
        <FaqButton1  title='Cancelar' onClick={()=>console.log()} />
        <FaqButton2  title='Salvar' onClick={()=>console.log()}/>
        </Box>
        </Modal>
        <section>
          <ClientsTable />
        </section>
      </ClientsView>

      <ConfirmModal open={openModalInativar} handleIsClose={(value) => {setOpenModalInativar(value)}}>
        <ConfirmModalView>
          <BasicButton title='Confirmar' onClick={() => setOpenModalInativar(true)}/>
          <BasicButton title='Cancelar' onClick={() => setOpenModalInativar(true)}/>
        </ConfirmModalView>
      </ConfirmModal>
    </div>
  )
}
