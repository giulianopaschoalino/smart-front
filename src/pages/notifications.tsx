import React from 'react'
import CommonQuestionsCard from '../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../components/header/Header'
import PageTitle from '../components/pageTitle/PageTitle'
import { FaqView } from '../styles/layouts/commonQuestions/FaqView'

export default function Notifications() {
  return (
    <FaqView>
      <Header name='' />
      <PageTitle title='Notifications' subtitle='' />
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <section className='CommonQuestionsSection' >
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
        <CommonQuestionsCard />
        <hr />
      </section>
    </FaqView>
  )
}
