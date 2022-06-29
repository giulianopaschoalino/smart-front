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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function index({userName}: any) {
  const editorRef = useRef(null);
  const [text, setText] = useState('');

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)
  const [openSnackError, setOpenSnackError] = useState<boolean>(false)

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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
      <Header name={userName} admin/>
      <PageTitle title='Sobre nós' subtitle='Alterar texto de sobre nós'/>
      <div style={{width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '30px', marginBottom: '10px'}}>
        <BasicButton title='Salvar Texto' onClick={() => handleRegisterAboutUs()}/>
      </div>

      <br />
      <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        onChange={value => console.log(value)}
        onEditorChange={(newText) => setText(newText)}
        initialValue='        <p>A <strong>SMART ENERGIA</strong> é uma consultoria independente especializada em Gestão de Energia Elétrica, consolidada como uma das três maiores consultorias do Brasil.
          Devido à grande experiência em operações na CCEE – Câmara de Comercialização de Energia Elétrica e ANEEL, entrega resultados que superam as expectativas.</p>

        <p>Nasceu para gerenciar a compra de energia com inovação, transparência e imparcialidade sendo o elo forte e necessário entre os Consumidores e os
          Vendedores de energia. </p>

        <p>Baseada em sua experiência no setor elétrico adquirida desde 2001 e em mais de 900 unidades migradas, atua na negociação de contratos de compra e venda de
          energia, na Gestão de Energia no Mercado Livre e criação de produtos diferenciados para atender as necessidades específicas dos consumidores.</p>

        <p>Apoiada pela sólida experiência de seus gestores, conhecendo as premissas dos agentes de Comercialização e Geração para a compra e venda de energia,
          aplicamos as mesmas premissas a favor dos Consumidores, disponibilizando assim um diferencial único para a tomada de decisão e elaboração das estratégias de
          contratação de energia.</p>
        <ul>
          <li>Informação</li>
          <li>Economia</li>
          <li>Gestão de Energia</li>
          <li>Imparcialidade</li>
          <li>Previsão de Custos</li>
          <li>Experiência</li>
          <li>Relacionamento</li>
        </ul>'
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
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

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
      userName
    }
  }
}
