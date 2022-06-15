import React, { useState } from 'react'
import Image from 'next/image'
import getAPIClient from '../../services/ssrApi';
import { FaqQuestionsCardBody, FaqQuestionsCardHeader, CommonQuestionsCardView } from './NotificationQuestionsCardView'

interface CommonsQuestionsCardInterface {
  title: string,
  body: string,

}

export default function NotificationQuestionsCard({title, body}: CommonsQuestionsCardInterface) {
  const [ showCardBody, setShowCardBody ] = useState<boolean>(false)
  return (

    <CommonQuestionsCardView>
      <FaqQuestionsCardHeader>
        <h4>{title}</h4>
        <Image src={showCardBody? '/assets/less-icon.svg' : '/assets/plus-icon.svg' } width={32} height={32} onClick={() => setShowCardBody(!showCardBody)} />
      </FaqQuestionsCardHeader>

      <FaqQuestionsCardBody showCardBody={showCardBody} >
        <p>
          {body}
        </p>
      </FaqQuestionsCardBody>
    </CommonQuestionsCardView>
  )
}
