import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'
import CommonQuestionsCard from '../../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import { api } from '../../services/api'
import getAPIClient from '../../services/ssrApi'
import { FaqView } from '../../styles/layouts/commonQuestions/FaqView'


export default function commonQuestions({faqData, userName}) {
  return (
    <FaqView>
      <Head>
        <title>Smart Energia - FAQ</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Perguntas Frequentes' subtitle='Aqui estão algumas das perguntas que mais recebemos!' />
      </Header>
      <section className='CommonQuestionsSection' >
      {
        faqData.length<1?
        <p>Nenhuma pergunta no momento!</p>
          :
        faqData.map((value, index ) => {
          return <>
            <CommonQuestionsCard key={index} question={value.question} answer={value.answer}/>
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

  let faqData = [];

  await apiClient.get('/faq').then(res => {
    faqData = res.data.data
  }).catch(res => {
    // console.log(res)
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
      faqData,
      userName
    }
  }
}
