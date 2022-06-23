import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React, { useContext, useEffect, useState } from 'react'

import Home from '.'
// import Footer from '../components/footer/Footer'
import Sidebar from '../components/sidebar/Sidebar'
import { AuthContext, AuthProvider } from '../contexts/AuthContext'
import { AppView } from '../styles/app/AppView'
import { GlobalStyle } from '../styles/globals'
import ForgotPassword from './forgotPassword'
import VerifyEmail from './verifyEmail'

import '../styles/globals.ts'
import '../styles/nprogress/nprogress.css'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import getAPIClient from '../services/ssrApi'

export function MyApp({ Component, pageProps, notificationsCount }: AppProps | any) {
  const router = useRouter()
  const rota = router.pathname

  console.log('notifications: ', notificationsCount)

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
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default MyApp;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  let notificationsCount

  await apiClient.post('/download').then(res => {
    console.log(res)
  }).catch(res => console.log(res))

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      notificationsCount
    }
  }
}
