import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AppProps } from 'next/app'
import NProgress from 'nprogress'

import Footer from '../components/footer/Footer'
import Sidebar from '../components/sidebar/Sidebar'
import { GlobalStyle } from '../styles/globals'
import { AppView } from '../styles/app/AppView'
import '../styles/nprogress/nprogress.css'
import '../styles/globals.ts'

import Home from '.'
import Head from 'next/head'
import VerifyEmail from './verifyEmail'
import ForgotPassword from './forgotPassword'

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
    <>
      <AppView>
        <Head>
          <link rel="icon" type="imagem/png" href="/assets/logose.png" />
          <meta name="viewport" content="viewport-fit=cover" />
        </Head>
        <Home />
        <VerifyEmail />
        <ForgotPassword />
        <GlobalStyle />
        {
          rota != '/' && rota != '/forgotPassword' && rota != '/verifyEmail'?
            <>
              <Sidebar />
              <Component {...pageProps} />

            </>
            :
            null
        }
      </AppView>
        <Footer />

    </>
  )
}

export default MyApp;
