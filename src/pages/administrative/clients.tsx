import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import Modal from '@mui/material/Modal';
import PageTitle from '../../components/pageTitle/PageTitle'
import { ClientsView } from '../../styles/layouts/clients/ClientsView'
import Box from '@mui/material/Box';
import FaqButton1 from '../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../components/buttons/faqButton/FaqButton2';
import AdministrativeHeader from '../../components/administrativeHeader/AdministrativeHeader';
import ClientsTable from '../../components/administrativeTables/ClientsTable';
import Header from '../../components/header/Header'


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
  const [openModalInativar, setOpenModalInativar] = useState(false)



  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <ClientsView>
        <Header name='' />
        <PageTitle title='Clientes' subtitle='Clientes Smart Energia'/>
          {/* <BasicButton title='Adicionar' onClick={handleOpen}/> */}
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
        <FaqButton1  title='Cancelar' onClick={()=>console.log()} />
        <FaqButton2  title='Salvar' onClick={()=>console.log()}/>
        </Box>
        </Modal>
        <section>
          {/* <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
          /> */}
          <ClientsTable />
        </section>
      </ClientsView>
      {/* <Modal open={openModal} handleIsClose={(value) => {setOpenModal(value)}}>
        <ClientsModalView>
          <PageTitle title='Adicionar Cliente' subtitle='Adicionar Cliente Smart Energia'/>
          <article>
            <TextField id="outlined-basic" label="Nome" variant="outlined" style={{width: '90%', marginRight: '20px'}}/>
            <TextField id="outlined-basic" label="email" variant="outlined" style={{width: '90%', marginRight: '20px'}}/>
            <TextField id="outlined-basic" label="senha" variant="outlined" style={{width: '90%', marginRight: '20px'}}/>
            <TextField id="outlined-basic" label="código" variant="outlined" style={{width: '90%', marginRight: '20px'}}/>
            <BasicButton title='Criar Cliente' onClick={() => console.log()}/>
            <Button
              variant="contained"
              component="label"
              style={{width: '300px'}}
            >
              Logo
              <input
                type="file"
                hidden
              />
            </Button>
          </article>
        </ClientsModalView>
      </Modal> */}

      {/* <ConfirmModal open={openModalInativar} handleIsClose={(value) => {setOpenModalInativar(value)}}>
        <ConfirmModalView>
          <BasicButton title='Confirmar' onClick={() => setOpenModalInativar(true)}/>
          <BasicButton title='Cancelar' onClick={() => setOpenModalInativar(true)}/>
        </ConfirmModalView>
      </ConfirmModal> */}

    </div>
  )
}
