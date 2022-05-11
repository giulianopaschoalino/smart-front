import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'


import Sidebar from '../src/components/sidebar/Sidebar'
import { GlobalStyle } from '../styles/globals'
import { AppView } from '../styles/app/AppView'
import '../styles/nprogress/nprogress.css'
import '../styles/globals.ts'

import Home from '.'

import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const rota = router.pathname

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <AppView>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
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
