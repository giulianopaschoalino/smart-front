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
    </div>
  )
}
