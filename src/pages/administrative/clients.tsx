import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useState } from 'react'

import BasicButton from '../../components/buttons/basicButton/BasicButton'
import Modal from '../../components/modal/Modal';
import PageTitle from '../../components/pageTitle/PageTitle'
import { ClientsModalView, ClientsView } from '../../styles/layouts/clients/ClientsView'

export default function clients() {
  const [openModal, setOpenModal] = useState(false)

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];

  return (
    <>
      <ClientsView>
        <PageTitle title='Clientes' subtitle='Clientes Smart Energia'/>

        <section>
          <BasicButton title='Adicionar' onClick={() => setOpenModal(true)}/>
          <BasicButton title='Inativar' onClick={() => {throw new Error('fixing...')}}/>
        </section>

        <section>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={6}
            rowsPerPageOptions={[6]}
            checkboxSelection
          />
        </section>
      </ClientsView>

      <Modal open={openModal} handleIsClose={(value) => {setOpenModal(value)}}>
        <ClientsModalView>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: '300px'}}/>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: '300px'}}/>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: '300px'}}/>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: '300px'}}/>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" style={{width: '300px'}}/>
          <Button
            variant="contained"
            component="label"
          >
            Upload File
            <input
              type="file"
              hidden
            />
          </Button>
        </ClientsModalView>
      </Modal>
    </>
  )
}
