import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Head from 'next/head'
import React, { useState } from 'react'

import NotificationsTable from '../../../components/administrativeTables/NotificationsTable'
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { api } from '../../../services/api';
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import getAPIClient from '../../../services/ssrApi';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Notifications from '../../notifications';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface NotificationInterface {
  title: string,
  body: string,
  users: object[]
}

export default function notification({clients, notifications}) {

  const [notification, setNotification] = useState<NotificationInterface>({
    title: '',
    body: '',
    users: []
  })

  const [open, setOpen] = useState<boolean>(false);
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false);
  const [openSnackError, setOpenSnackError] = useState<boolean>(false);

  const [radiusValue, setRadiusValue] = useState<string>('all');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackError(false);
  };


  async function handleRegisterNewNotification({title, body, users}: NotificationInterface) {
    await api.post('/notification', {
      title,
      body,
      users
    }).then(res => setOpenSnackSuccess(true)).catch(res => setOpenSnackError(true))
  }

  return (
    <FaqView>
      <Head>
        <title>Smart Energia - Notificações</title>
      </Head>
      <Header name=''/>
      <PageTitle title='Notificações' subtitle='Notificações'/>

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

      <div className='buttons'>
      <button className='btn2' onClick={handleOpen}>Disparar nova</button>

      </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <h1>Disparar Notificações</h1>
        <Typography sx={{color:'gray', fontSize:12}}variant="h5" gutterBottom component="div">
        Pode ser que todas as notificaçõs demorem alguns minutos para estarem disponíveis</Typography>
        <br />
        <TextField id="outlined-basic" label="Título" sx={{width:700, ml:8}} onChange={(value) => {
          setNotification({
            ...notification,
            title: value.target.value
          })
        }} variant="outlined" /> <br /><br />
        <TextField id="outlined-basic" label="Corpo/Conteúdo da notificação" sx={{width:700, ml:8}} onChange={(value) => {
          setNotification({
            ...notification,
            body: value.target.value
          })
        }} variant="outlined" /> <br /><br />

          <div>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel value="all" control={<Radio />} checked={radiusValue==='all'? true : false}onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  setRadiusValue(value.target.value)
                }} label="Disparar para todos os clientes" />
                <FormControlLabel value="some" control={<Radio />} checked={radiusValue==='some'? true : false} onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  setRadiusValue(value.target.value)
                }} label="Disparar somente para alguns clientes" />
              </RadioGroup>
            </FormControl>
          </div>

          {
            radiusValue === 'some'?
            <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={clients}
            disableCloseOnSelect
            onChange={(event: any, newValue: any) => {
              setNotification({...notification, users: newValue.map((el) => {return {"user_id": el.id}})});
            }}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
                value={option.name}
              />
                {option.name}
              </li>
              )}
              sx={{ml:8}}
              style={{ width: 700 }}
              renderInput={(params) => (
                <TextField {...params} label="Clientes" placeholder="Selecionar clientes"/>
                )}
            /> :
            null
          }

          <FaqButton1  title='Cancelar' onClick={() => {console.log()}} />
          <FaqButton2  title='Salvar' onClick={() => {
            handleRegisterNewNotification(notification)
          }} />
        </Box>
      </Modal>
      <NotificationsTable notifications={notifications}/>
    </FaqView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let clients = [];
  let notifications = [];

  await apiClient.get('/user').then(res => {
    clients = res.data
  }).catch(res => {
    console.log(res)
  })

  await apiClient.get('/notification').then(res => {
    notifications = res.data
  }).catch(res => {
    console.log(res)
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
      notifications
    }
  }
}
