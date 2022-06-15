import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'

import AdministrativeHeader from '../../components/administrativeHeader/AdministrativeHeader';
import ClientsTable from '../../components/administrativeTables/ClientsTable';
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import Header from '../../components/header/Header'
import ConfirmModal from '../../components/modal/ConfirmModal';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle'
import { ClientsModalView, ClientsView } from '../../styles/layouts/clients/ClientsView'
import { ConfirmModalView } from '../../styles/layouts/modals/confirmModalView';

export default function clients() {
  const [openModal, setOpenModal] = useState(false)
  const [openModalInativar, setOpenModalInativar] = useState(false)

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <ClientsView>
        <Header name='' />
        <PageTitle title='Clientes' subtitle='Clientes Smart Energia'/>

        <section>
          <BasicButton title='Adicionar' onClick={() => setOpenModal(true)}/>
          <BasicButton title='Inativar' onClick={() => setOpenModalInativar(true)}/>
        </section>

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

      <Modal open={openModal} handleIsClose={(value) => {setOpenModal(value)}}>
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
      </Modal>

      <ConfirmModal open={openModalInativar} handleIsClose={(value) => {setOpenModalInativar(value)}}>
        <ConfirmModalView>
          <BasicButton title='Confirmar' onClick={() => setOpenModalInativar(true)}/>
          <BasicButton title='Cancelar' onClick={() => setOpenModalInativar(true)}/>
        </ConfirmModalView>
      </ConfirmModal>
    </div>
  )
}
