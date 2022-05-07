import React from 'react'
import { BasicButtonView } from './BasicButtonView'

interface BasicButtonInterface {
  title: string
}

export default function BasicButton({ title }: BasicButtonInterface) {
  return (
    <BasicButtonView>{title}</BasicButtonView>
  )
}
