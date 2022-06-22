import Head from 'next/head'
import React from 'react'
import BasicButton from '../components/buttons/basicButton/BasicButton'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { IndustryInfoView } from '../styles/layouts/industryInfo/IndustryInfoView'

export default function industryInfo() {
  return (
    <IndustryInfoView>
      <Head>
        <title>Smart Energia - Info de Setor</title>
      </Head>
      <Header name='' />
      <div className='title'>
        <PageTitle title='Info Setorial' subtitle='Clique em "Baixar PDF", para fazer download do PDF' />
      </div>
      <button>Baixar PDF</button>
    </IndustryInfoView>
  )
}
