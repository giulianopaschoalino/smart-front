import TextField from '@mui/material/TextField';
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader';
import FaqTable from '../../../components/administrativeTables/FaqTable';
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import CommonQuestionsCard from '../../../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../../../components/header/Header'
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'

export default function commonQuestions() {
  return (
    <>
      <Head>
        <title>Smart Energia - FAQ</title>
      </Head>
      <FaqView>
        <Header name=''/>
        <FaqTable />
      </FaqView>
    </>
  )
}
