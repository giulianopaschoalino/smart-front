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
import ConfirmModal from '../../../components/modal/ConfirmModal';
import { ConfirmModalView } from '../../../styles/layouts/modals/confirmModalView';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


type FaqInterface = {
  question: string;
  answer: string;
}

export default function Sidebar({faqData, userName} : any ) {
  const [openModalInativar, setOpenModalInativar] = useState<boolean>(false)
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

  async function handleDeleteNotification(id: any) {
    await id.map((value) => {
      api.delete(`/faq/${value.id}`).then(res => {
        setOpenSnackSuccessDelete(true)
        setOpenModalInativar(false)
        window.location.reload()
      }).catch(res => setOpenSnackErrorDelete(true))
    })
  }

  const [faq, setFaq] = useState<FaqInterface>({
    question: '',
    answer : '',
  })

  const [selectedfaq, setSelectedfaq] = useState([])

  async function handleRegisterNewFaq({question, answer}: FaqInterface) {
    await api.post('/faq', {
      "question": question,
      "answer": answer,
    }).then(res => {
      setOpenSnackSuccess(true)
      window.location.reload()
    }).catch(res => setOpenSnackError(true))
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <FaqView>
    <Header name={userName}/>

      <PageTitle title='Perguntas Frequentes' subtitle='Perguntas Frequentes'/>

      <Snackbar open={openSnackSuccess} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
          Pergunta cadastrada com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Pergunta não cadastrada!
        </Alert>
      </Snackbar>

      <Snackbar open={openSnackSuccessDelete} autoHideDuration={4000} onClose={handleCloseSnackDelete}>
        <Alert onClose={handleCloseSnackDelete} severity="success" sx={{ width: '100%' }}>
          Pergunta excluida com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openSnackErrorDelete} autoHideDuration={4000} onClose={handleCloseSnackDelete}>
        <Alert onClose={handleCloseSnackDelete} severity="error" sx={{ width: '100%' }}>
          Pergunta não excluida!
        </Alert>
      </Snackbar>

      <div className='buttons'>
      <button className='btn2' value="Refresh Page"onClick={handleOpen} >Adicionar</button>
      <button className='btn1' onClick={() => setOpenModalInativar(true)}>Inativar</button>


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
      <FaqTable questionData={faqData} onChange={value => setSelectedfaq(value)}/>

      <ConfirmModal open={openModalInativar} handleIsClose={(value) => {setOpenModalInativar(value)}}>
        <PageTitle title='Excluir notificação' subtitle='deseja realmente excluir as notificações selecionadas?'/>
        <ConfirmModalView>
          <BasicButton title='Confirmar' onClick={() => handleDeleteNotification(selectedfaq)}/>
          <BasicButton title='Cancelar' onClick={() => setOpenModalInativar(false)}/>
        </ConfirmModalView>
      </ConfirmModal>

    </FaqView>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let faqData = [];

  await apiClient.get('/faq').then(res => {
    faqData = res.data.data
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
      faqData,
      userName
    }
  }
}
