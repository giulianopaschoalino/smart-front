import React from 'react'
import { LoginButtonView } from './LoginButtonView'

interface LoginButtonInterface {
  title: string
}

export default function LoginButton({ title }: LoginButtonInterface) {
  return (
    <LoginButtonView>
      {title}
    </LoginButtonView>
  )
}
