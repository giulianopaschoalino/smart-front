import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import React from 'react'
import CommonQuestionsCard from '../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../components/header/Header'
import { api } from '../services/api'
import getAPIClient from '../services/ssrApi'
import { FaqView } from '../styles/layouts/commonQuestions/FaqView'


export default function commonQuestions({faqData}) {
  return (
    <FaqView>
      <Head>
        <title>Smart Energia - FAQ</title>
      </Head>
      <Header name='' />
      <h1>Perguntas Frequentes</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <section className='CommonQuestionsSection' >
      {
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
  console.log('teste')
  let faqData = [];


await apiClient.get('/faq').then(res => {
  faqData = res.data
}).catch(res => {
  console.log(res)
})
  console.table(faqData);

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
      faqData
    }
  }
}
