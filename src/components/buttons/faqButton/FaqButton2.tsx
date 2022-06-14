import React from 'react'

import { FaqButtonView2 } from './FaqButtonView2'

interface FaqButtonInterface {
  title: string
  onClick: () => void
}

export default function FaqButton2({title, onClick}: FaqButtonInterface) {
  return (
    <FaqButtonView2 onClick={() => onClick()}>{title}</FaqButtonView2>
  )
}
