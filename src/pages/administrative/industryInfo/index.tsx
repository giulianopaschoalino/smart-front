import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'
import BasicButton from '../../../components/buttons/basicButton/BasicButton'
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { IndustryInfoView } from '../../../styles/layouts/industryInfo/IndustryInfoView'
import InputUploadPdf from '../../../components/inputUploadPdf/inputUpload';

export default function industryInfo({userName}: any) {
  return (
    <IndustryInfoView>
      <Head>
        <title>Smart Energia - Info de Setor</title>
      </Head>
      <Header name={userName} />
      <div className='title'>
        <PageTitle title='Info Setorial' subtitle='Realize o upload da última versão de info setorial' />
        <InputUploadPdf/>
      </div>

      <BasicButton onClick={("")} title='Atualizar'/>


    </IndustryInfoView>
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

