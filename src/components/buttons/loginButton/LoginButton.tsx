import React from 'react'
import Link from 'next/link'
import RenderIf from '../../../utils/renderIf'
import { LoginButtonView } from './LoginButtonView'

interface LoginButtonInterface {
  title: string,
  link?: boolean | undefined,
  onClick?: () => void
}

export default function LoginButton({ title, link, onClick }: LoginButtonInterface) {
  return (
    <>
      <RenderIf isTrue={link? true : false}>
        <Link href='/dashboard' >
          <LoginButtonView>
            {title}
          </LoginButtonView>
        </Link>
      </RenderIf>
      <RenderIf isTrue={link? false : true}>
          <LoginButtonView onClick={() => onClick()}>
            {title}
          </LoginButtonView>
      </RenderIf>
    </>
  )
}
