import Link from 'next/link'
import React from 'react'
import { LoginButtonView } from './LoginButtonView'

interface LoginButtonInterface {
  title: string
}

export default function LoginButton({ title }: LoginButtonInterface) {
  return (
    <Link href='/dashboard' >
      <LoginButtonView>
          {title}
      </LoginButtonView>
    </Link>
  )
}
