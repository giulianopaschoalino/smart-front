import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'
import NotificationQuestionsCard from '../../components/NotificationQuestionsCard/NotificationQuestionsCard'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import { api } from '../../services/api'
import getAPIClient from '../../services/ssrApi'
import { FaqView } from '../../styles/layouts/commonQuestions/FaqView'

export default function Notifications({notificationData, userName}: any) {
  return (
    <FaqView>
      <Head>
        <title>Smart Energia - Notificações</title>
      </Head>
      <Header name={userName} />
      <PageTitle title='Notificações' subtitle='Aqui estão as notificações publicadas para você!' />
      <section className='CommonQuestionsSection' >
      {
        notificationData?
        notificationData.map((value, index ) => {
          return <>
            <NotificationQuestionsCard key={index} title={value.title} body={value.body}/>
            <hr />
          </>
        })
          :
        <p style={{alignSelf: 'center'}}>Você não tem notificações!</p>
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
