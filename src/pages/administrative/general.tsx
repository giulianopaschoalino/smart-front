import { SelectChangeEvent } from '@mui/material/Select';
import { Editor } from '@tinymce/tinymce-react'
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import React, { useRef, useState } from 'react'
import BasicButton from '../../components/buttons/basicButton/BasicButton';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pageTitle/PageTitle';
import { api } from '../../services/api';
import { GeneralView } from '../../styles/layouts/general/GeneralView'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';
import getAPIClient from '../../services/ssrApi';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function index({userName, initialText}: any) {
  const editorRef = useRef(null);
  const [text, setText] = useState('');

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)
  const [openSnackError, setOpenSnackError] = useState<boolean>(false)

  const handleChange = (event: SelectChangeEvent) => {
    setText(event.target.value);
  };

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

  async function handleRegisterAboutUs() {
    await api.post('/aboutUs', {
      about: text
    })
    .then(res => setOpenSnackSuccess(true))
    .catch(res => setOpenSnackError(false))
  }

  return (
    <GeneralView>
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
          Cadastrado com Sucesso!
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
          Não cadastrado!
        </Alert>
      </Snackbar>
      <Header name={userName} admin>
        <PageTitle title='Sobre nós' subtitle='Alterar texto de sobre nós'/>
      </Header>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '30px', marginBottom: '10px'}}>
        <BasicButton title='Salvar Texto' onClick={() => handleRegisterAboutUs()}/>
      </div>

      <br />
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        onEditorChange={(newText) => setText(newText)}
        initialValue={initialText[0]?.about}
        init={{
          height: 500,
          width: '100%',
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </GeneralView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let initialText = []

  await apiClient.get('/aboutUs').then(res => {
    initialText = res.data.data
    // console.log(res.data.data)
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
      userName,
      initialText
    }
  }
}


