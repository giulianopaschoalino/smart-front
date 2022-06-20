import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ClientsTable from '../../../components/administrativeTables/ClientsTable';
import BasicButton from '../../../components/buttons/basicButton/BasicButton'
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';
import Header from '../../../components/header/Header'
import InputUpload from '../../../components/inputUplaod/inputUpload';
import { ClientsView } from '../../../styles/layouts/clients/ClientsView';
import PageTitle from '../../../components/pageTitle/PageTitle';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { ConfirmModalView } from '../../../styles/layouts/modals/confirmModalView';
import { api } from '../../../services/api';
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import getAPIClient from '../../../services/ssrApi';

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function clients({clients}) {
  const [client, setClient] = useState<any>({
    name: String,
    email: String,
    password: String,
    password_confirmation: String,
    client_id: Number
  })
  const [selectedClients, setSelectedClients] = useState([])

  const [open, setOpen] = useState(false);
  const [openModalInativar, setOpenModalInativar] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openModal, setOpenModal] = useState(false)

  //
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);
  const [openSnackSuccessDelete, setOpenSnackSuccessDelete] = useState<boolean>(false);
  const [openSnackErrorDelete, setOpenSnackErrorDelete] = useState<boolean>(false);

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackError(false);
    setOpenSnackSuccess(false);
  };

  const handleCloseSnackDelete = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackErrorDelete(false);
    setOpenSnackSuccessDelete(false);
  };
  //

  function handleCreateClient({name, email, password, password_confirmation, client_id}) {
    api.post('/user', {
      name,
      email,
      password,
      password_confirmation,
      client_id
    }).then(res => {
      setOpenSnackSuccess(true)
      setOpenModalInativar(false)
      window.location.reload()
    }).catch(res => {
      setOpenSnackError(true)
    })
  }
  async function handleDeleteClient(id: any) {
    await id.map(client => {
      api.delete(`/user/${client}`).then(res => {
        setOpenSnackSuccessDelete(true)
        setOpenModalInativar(false)
        window.location.reload()
      }).catch(res => setOpenSnackErrorDelete(true))
    })
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <Snackbar open={openSnackSuccess} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          notificação cadastrada com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Notificação não cadastrada!
        </Alert>
      </Snackbar>

      <Snackbar open={openSnackSuccessDelete} autoHideDuration={4000} onClose={handleCloseSnackDelete}>
        <Alert onClose={handleCloseSnackDelete} severity="success" sx={{ width: '100%' }}>
          notificação excluida com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackErrorDelete} autoHideDuration={4000} onClose={handleCloseSnackDelete}>
        <Alert onClose={handleCloseSnackDelete} severity="error" sx={{ width: '100%' }}>
          Notificação não excluida!
        </Alert>
      </Snackbar>

      <ClientsView>
        <Header name='' />
        <PageTitle title='Clientes' subtitle='Clientes Smart Energia'/>
        <div className='buttons'>
        <button className='btn2' onClick={handleOpen}>Adicionar</button>
        <button className='btn1' onClick={() => setOpenModalInativar(true)}>Inativar</button>
        </div>
        <section>
          <ClientsTable clients={clients} onChange={value => {
            setSelectedClients(value)
          }}/>
        </section>
      </ClientsView>

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
        <TextField id="outlined-basic" label="Nome" sx={{width:350, ml:5}} onChange={(value) => {
          setClient({
            ...client,
            name: value.target.value
          })
        }} variant="outlined" />
        <TextField id="outlined-basic" label="E-mail/Usuário" sx={{width:350, ml:8}} onChange={(value) => {
          setClient({
            ...client,
            email: value.target.value
          })
        }} variant="outlined" />
        <TextField id="outlined-basic" label="Senha" sx={{width:350, ml:5, mt:2}} onChange={(value) => {
          setClient({
            ...client,
            password: value.target.value
          })
        }} variant="outlined" />
        <TextField id="outlined-basic" label="Confirma Senha" sx={{width:350, ml:8, mt:2}} onChange={(value) => {
          setClient({
            ...client,
            password_confirmation: value.target.value
          })
        }} variant="outlined" />
        <TextField id="outlined-basic" label="Codigo do Cliente Smart Energia" sx={{width:350, ml:5, mt:2}} onChange={(value) => {
          setClient({
            ...client,
            client_id: value.target.value
          })
        }} variant="outlined" />
        <InputUpload />
        <br /><br />
      <FaqButton1  title='Cancelar' onClick={() => console.log()} />
      <FaqButton2  title='Salvar' onClick={() => handleCreateClient(client)}/>
      </Box>
      </Modal>
      <ConfirmModal open={openModalInativar} handleIsClose={(value) => {setOpenModalInativar(value)}}>
        <PageTitle title='Excluir Cliente' subtitle='deseja realmente excluir os clientes selecionadas?'/>
        <ConfirmModalView>
          <BasicButton title='Confirmar' onClick={() => handleDeleteClient(selectedClients)}/>
          <BasicButton title='Cancelar' onClick={() => setOpenModalInativar(true)}/>
        </ConfirmModalView>
      </ConfirmModal>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let clients = [];

  await apiClient.get('/user').then(res => {
    // console.log(res)
    clients = res.data.data
    // console.log(clients)
  }).catch(res => {
    // console.log(res)
  })

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
      clients,
    }
  }
}
