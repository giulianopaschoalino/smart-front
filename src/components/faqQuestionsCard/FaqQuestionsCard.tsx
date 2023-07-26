import { useState } from 'react'
import Image from 'next/image'
import getAPIClient from '../../services/ssrApi';
import { FaqQuestionsCardBody, FaqQuestionsCardHeader, CommonQuestionsCardView } from './FaqQuestionsCardView'

interface CommonsQuestionsCardInterface {
  question: string,
  answer: string,

}

export default function CommonsQuestionsCard({question, answer}: CommonsQuestionsCardInterface) {
  const [ showCardBody, setShowCardBody ] = useState<boolean>(false)
  return (

    <CommonQuestionsCardView onClick={() => setShowCardBody(!showCardBody)}>
      <FaqQuestionsCardHeader >
        <h4 >{question}</h4>

        <Image src={showCardBody? '/assets/less-icon.svg' : '/assets/plus-icon.svg' } width={32} height={32} onClick={() => setShowCardBody(!showCardBody)} />
      </FaqQuestionsCardHeader>

      <FaqQuestionsCardBody showCardBody={showCardBody} >
        <p>
          {answer}
        </p>
      </FaqQuestionsCardBody>
    </CommonQuestionsCardView>
  )
}
