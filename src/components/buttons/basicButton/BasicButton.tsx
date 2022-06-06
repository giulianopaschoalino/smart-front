import React from 'react'

import { BasicButtonView } from './BasicButtonView'

interface BasicButtonInterface {
  title: string
  onClick: () => void
}

export default function BasicButton({title, onClick}: BasicButtonInterface) {
  return (
    <BasicButtonView onClick={() => onClick()}>{title}</BasicButtonView>
  )
}
