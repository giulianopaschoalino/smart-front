import React, { useState } from 'react'
import Image from 'next/image'

import { FaqQuestionsCardBody, FaqQuestionsCardHeader, CommonQuestionsCardView } from './FaqQuestionsCardView'

export default function CommonsQuestionsCard() {
  const [ showCardBody, setShowCardBody ] = useState<boolean>(false)
  return (
    <CommonQuestionsCardView>
      <FaqQuestionsCardHeader>
        <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit?</h4>
        <Image src={showCardBody? '/assets/less-icon.svg' : '/assets/plus-icon.svg' } width={32} height={32} onClick={() => setShowCardBody(!showCardBody)} />
      </FaqQuestionsCardHeader>

      <FaqQuestionsCardBody showCardBody={showCardBody} >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Consequat porta faucibus elementum pharetra varius
        </p>
      </FaqQuestionsCardBody>
    </CommonQuestionsCardView>
  )
}
