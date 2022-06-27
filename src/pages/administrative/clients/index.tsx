import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import ClientsTable from '../../../components/administrativeTables/ClientsTable'
import BasicButton from '../../../components/buttons/basicButton/BasicButton'
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1'
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2'
import Header from '../../../components/header/Header'

import { ClientsView } from '../../../styles/layouts/clients/ClientsView'
import PageTitle from '../../../components/pageTitle/PageTitle'
import ConfirmModal from '../../../components/modal/ConfirmModal'
import { ConfirmModalView } from '../../../styles/layouts/modals/confirmModalView'
import { api } from '../../../services/api'
import { parseCookies } from 'nookies'
import { GetServerSideProps } from 'next'
import getAPIClient from '../../../services/ssrApi'

import FormData from 'form-data'
import { InputUploadView } from '../../../components/inputUploadImg/inputUploadView'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

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
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function clients({ clients, userName }) {
  const formData = new FormData()

  const [client, setClient] = useState<any>({
    name: String,
    email: String,
    password: String,
    password_confirmation: String,
    client_id: Number
  })
  const [logo, setLogo] = useState(false)
  const [selectedClients, setSelectedClients] = useState([])

  const [imageURLS, setImageURLs] = useState([])
  const [images, setImages] = useState([] as any)
  const [open, setOpen] = useState(false)
  const [openModalInativar, setOpenModalInativar] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [openModal, setOpenModal] = useState(false)
  const [nivelAcess, setnivelAcess] = useState<any>(0);
  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)
  const [openSnackError, setOpenSnackError] = useState<boolean>(false)
  const [openSnackSuccessDelete, setOpenSnackSuccessDelete] =
    useState<boolean>(false)
  const [openSnackErrorDelete, setOpenSnackErrorDelete] =
    useState<boolean>(false)

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackError(false)
    setOpenSnackSuccess(false)
  }

  const handleCloseSnackDelete = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackErrorDelete(false)
    setOpenSnackSuccessDelete(false)
  }

  function onChange(e) {
    setLogo(e.target.files[0])
  }

  function handleCreateClient({
    name,
    email,
    password,
    password_confirmation,
    client_id
  }) {
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', password_confirmation)
    formData.append('client_id', client_id)
    formData.append('profile_picture', logo)
    formData.append('role', 0)
    api
      .post('/user', formData)
      .then((res) => {
        setOpenSnackSuccess(true)
        setOpenModalInativar(false)
        window.location.reload()
      })
      .catch((res) => {
        setOpenSnackError(true)
      })
  }

  async function handleDeleteClient(id: any) {
    await id.map((client) => {
      api
        .delete(`/user/${client}`)
        .then((res) => {
          setOpenSnackSuccessDelete(true)
          setOpenModalInativar(false)
          window.location.reload()
        })
        .catch((res) => setOpenSnackErrorDelete(true))
    })
  }

  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls: any = []
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    )
    setImageURLs(newImageUrls)
  }, [images])

  function onImageChange(e: any) {
    setImages([...e.target.files])
    setLogo(e.target.files[0])
    // console.log(e);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Snackbar
        open={openSnackSuccess}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          sx={{ width: '100%' }}
        >
          Cliente cadastrada com Sucesso!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackError}
        autoHideDuration={4000}
        onClose={handleCloseSnack}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="error"
          sx={{ width: '100%' }}
        >
          Cliente não cadastrado!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackSuccessDelete}
        autoHideDuration={4000}
        onClose={handleCloseSnackDelete}
      >
        <Alert
          onClose={handleCloseSnackDelete}
          severity="success"
          sx={{ width: '100%' }}
        >
          Cliente excluido com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSnackErrorDelete}
        autoHideDuration={4000}
        onClose={handleCloseSnackDelete}
      >
        <Alert
          onClose={handleCloseSnackDelete}
          severity="error"
          sx={{ width: '100%' }}
        >
          Cliente não excluido!
        </Alert>
      </Snackbar>

      <ClientsView>
        <Header name={userName} admin />
        <PageTitle title="Clientes" subtitle="Clientes Smart Energia" />
        <div className="buttons">
          <button className="btn2" onClick={handleOpen}>
            Adicionar
          </button>
          <button className="btn1" onClick={() => setOpenModalInativar(true)}>
            Inativar
          </button>
        </div>
        <section>
          <ClientsTable
            clients={clients}
            onChange={(value) => {
              setSelectedClients(value)
            }}
          />
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
          <Typography
            sx={{ color: 'gray', fontSize: 12 }}
            variant="h5"
            gutterBottom
            component="div"
          >
            Adicionar Cliente Smart Energia
          </Typography>
          <br />
          <TextField
            id="outlined-basic"
            label="Nome"
            sx={{ width: 350, ml: 5 }}
            onChange={(value) => {
              setClient({
                ...client,
                name: value.target.value
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="E-mail/Usuário"
            value={client.email}
            sx={{ width: 350, ml: 8 }}
            onChange={(value) => {
              setClient({
                ...client,
                email: value.target.value.toLowerCase()
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            sx={{ width: 350, ml: 5, mt: 2 }}
            onChange={(value) => {
              setClient({
                ...client,
                password: value.target.value
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Confirma Senha"
            sx={{ width: 350, ml: 8, mt: 2 }}
            onChange={(value) => {
              setClient({
                ...client,
                password_confirmation: value.target.value
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Codigo do Cliente Smart Energia"
            sx={{ width: 350, ml: 5, mt: 2 }}
            onChange={(value) => {
              setClient({
                ...client,
                client_id: value.target.value
              })
            }}
            variant="outlined"
          />
          <InputUploadView>
            <div className="imgContainer">
              <article>
                {imageURLS.map((imageSrc, index) => (
                  <Image
                    src={imageSrc}
                    key={index}
                    width={30}
                    height={30}
                    className="image"
                  />
                ))}
              </article>
            </div>
            <div className="update">
              <form action="">
                <div>
                  <label htmlFor="arquivo">
                    {' '}
                    <p className="TitleButton"> Enviar foto de Perfil </p>{' '}
                  </label>
                  <input
                    type="file"
                    name="arquivo"
                    id="arquivo"
                    onChange={onImageChange}
                  />
                </div>
              </form>
            </div>
          </InputUploadView>


          <div className='select'>

          <FormControl sx={{ width: 350, ml: 5, mt: 2 }}>
            <InputLabel id="demo-select-small">Nivel de acesso</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={nivelAcess}
              label="Unidade"
              onChange={value => setnivelAcess(value.target.value)}
              fullWidth
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={0}>Cliente</MenuItem>

            </Select>
          </FormControl>
        </div>

          <FaqButton1 title="Cancelar" onClick={() => setOpen(false)} />
          <FaqButton2
            title="Salvar"
            onClick={() => handleCreateClient(client)}
          />
        </Box>
      </Modal>

      <ConfirmModal
        open={openModalInativar}
        handleIsClose={(value) => {
          setOpenModalInativar(value)
        }}
      >
        <PageTitle
          title="Inativar Cliente(s)"
          subtitle="deseja realmente inativar os clientes selecionadas?"
        />
        <ConfirmModalView>
          <BasicButton
            title="Confirmar"
            onClick={() => handleDeleteClient(selectedClients)}
          />
          <BasicButton
            title="Cancelar"
            onClick={() => setOpenModalInativar(false)}
          />
        </ConfirmModalView>
      </ConfirmModal>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  let clients = []

  await apiClient
    .get('/user')
    .then((res) => {
      // console.log(res)
      clients = res.data.data
      // console.log(clients)
    })
    .catch((res) => {
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
      userName
    }
  }
}
