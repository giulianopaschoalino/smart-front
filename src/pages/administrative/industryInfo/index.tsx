import Button from '@material-ui/core/Button'
import Head from 'next/head'
import React from 'react'

import AdministrativeHeader from '../../../components/administrativeHeader/AdministrativeHeader'
import BasicButton from '../../../components/buttons/basicButton/BasicButton'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { IndustryInfoView } from '../../../styles/layouts/industryInfo/IndustryInfoView'

export default function industryInfo() {
  return (
    <>
      <Head>
        <title>Smart Energia - Info de Setor</title>
      </Head>
      <AdministrativeHeader />
      <IndustryInfoView>
        <div className='title'>
          <PageTitle title='Info Setorial' subtitle='info setorial' />
        </div>
        <Button
          variant="contained"
          component="label"
          style={{width: '300px', margin: '30px'}}
        >
          Upload de dados
          <input
            type="file"
            hidden
          />
        </Button>
        <button>Baixar PDF</button>
      </IndustryInfoView>
    </>
  )
}
