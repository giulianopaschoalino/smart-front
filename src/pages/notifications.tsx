import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'
import NotificationQuestionsCard from '../components/NotificationQuestionsCard/NotificationQuestionsCard'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { api } from '../services/api'
import getAPIClient from '../services/ssrApi'
import { FaqView } from '../styles/layouts/commonQuestions/FaqView'

export default function Notifications({notificationData, userName}: any) {
  return (
    <FaqView>
      <Head>
        <title>Smart Energia - Notificações</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Notifications' subtitle='' />
      <p>Aqui estão as notificaões publicadas para voce!</p>
      <section className='CommonQuestionsSection' >
      {
        notificationData.map((value, index ) => {
          return <>
            <NotificationQuestionsCard key={index} title={value.title} body={value.body}/>
            <hr />
          </>
        })
      }
      </section>
    </FaqView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let notificationData = [];

  await apiClient.get('/notification').then(res => {
    console.log(res)
    notificationData = res.data.data
  }).catch(res => {
    console.log(res)
  })

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
      notificationData,
      userName
    }
  }
}
