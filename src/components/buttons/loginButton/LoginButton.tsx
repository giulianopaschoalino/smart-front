import Link from 'next/link'
import React from 'react'

import RenderIf from '../../../utils/renderIf'
import { LoginButtonView } from './LoginButtonView'

interface LoginButtonInterface {
  title: string,
  link?: boolean | undefined,
  onClick: () => void
}

export default function LoginButton({ title, link, onClick }: LoginButtonInterface) {
  return (
    <>
      <RenderIf isTrue={link? true : false}>
        <Link href='/dashboard'>
          <LoginButtonView onClick={() => onClick()}>
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
