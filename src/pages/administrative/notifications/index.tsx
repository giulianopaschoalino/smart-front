import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader'
import NotificationsTable from '../../../components/administrativeTables/NotificationsTable';
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import CommonQuestionsCard from '../../../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../../../components/header/Header'
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'

export default function commonQuestions() {

  const [month, setMonth] = React.useState('');
  const [unidade, setUnidade] = React.useState('');

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };
  const handleChangeUnidade = (event: SelectChangeEvent) => {
    setUnidade(event.target.value);
  };

  return (
    <>
      <FaqView>
        <Head>
          <title>Smart Energia - FAQ</title>
        </Head>
        <Header />

        <NotificationsTable />
      </FaqView>
    </>
  )
}
