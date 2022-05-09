import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import '../styles/globals.ts'

import { AppProps } from 'next/app'
import Sidebar from '../src/components/sidebar/Sidebar'
import { GlobalStyle } from '../styles/globals'
import { AppView } from '../styles/app/AppView'
import Home from '.'

function MyApp({ Component, pageProps }: AppProps) {
  const [ auth, setAuth ] = useState(false)

  const router = useRouter()
  const rota = router.pathname

  return (
    <AppView>
      <Home auth={rota} />
      <GlobalStyle />
      {
        rota != '/'?
          <>
            <Sidebar />
            <Component {...pageProps} />
          </>
          :
          null
      }
    </AppView>
  )
}

export default MyApp
