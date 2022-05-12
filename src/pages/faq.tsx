import React from 'react'
import CommonQuestionsCard from '../src/components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../src/components/header/Header'
import { FaqView } from '../styles/layouts/commonQuestions/FaqView'

export default function commonQuestions() {
  return (
    <FaqView>
      <Header name='' />
      <h1>Perguntas Frequentes</h1>
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
