import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'

import AdministrativeHeader from '../../components/administrativeHeader/AdministrativeHeader';
import ClientsTable from '../../components/administrativeTables/ClientsTable';
import BasicButton from '../../components/buttons/basicButton/BasicButton'
import ConfirmModal from '../../components/modal/ConfirmModal';
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle'
import { ClientsModalView, ClientsView, ConfirmModalView } from '../../styles/layouts/clients/ClientsView'

export default function clients() {
  const [openModal, setOpenModal] = useState(false)
  const [openModalInativar, setOpenModalInativar] = useState(false)

  const rows = [
    { id: 1, codigoCliente: 'Unidade - 9500130', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 2, codigoCliente: 'Unidade - 9500130', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 3, codigoCliente: 'Unidade - 9500130', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 4, codigoCliente: 'Unidade - 9500689', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 5, codigoCliente: 'Unidade - 9500689', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 6, codigoCliente: 'Unidade - 9500689', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 7, codigoCliente: 'Unidade - 9500130', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
    { id: 8, codigoCliente: 'Unidade - 9500130', clientName: 'FraCopelnces', units: 'clique para ver unidades', age: 'ativo' },
    { id: 9, codigoCliente: 'Unidade - 9500130', clientName: 'Copel', units: 'clique para ver unidades', age: 'ativo' },
  ];

  const columns: GridColDef[] = [
    { field: 'codigoCliente', headerName: 'Código Cliente', width: 180 },
    { field: 'clientName', headerName: 'Nome do cliente', width: 130 },
    { field: 'units', headerName: 'Unidade', width: 130 },
    { field: 'status', headerName: 'Status', width: 90 },
  ];

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <AdministrativeHeader />
      <ClientsView>
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
