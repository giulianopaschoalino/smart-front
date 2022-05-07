import React from 'react'
import '../styles/globals.ts'

import { AppProps } from 'next/app'
import Sidebar from '../src/components/sidebar/Sidebar'
import { GlobalStyle } from '../styles/globals'
import { AppView } from '../styles/app/AppView'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppView>
      <GlobalStyle />
      <Sidebar />
      <Component {...pageProps} />
    </AppView>
  )
}

export default MyApp
