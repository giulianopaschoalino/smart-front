import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import React from 'react'
import Banner from '../../components/banner/Banner'
import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import getAPIClient from '../../services/ssrApi'
import { AboutUsView } from '../../styles/layouts/aboutUs/AboutUsView'

export default function aboutUs({userName, text}) {
  return (
    <main style={{width: '100%'}}>
      <Head>
        <title>Smart Energia - Sobre nós</title>
      </Head>

      <Header name={userName}>
        <PageTitle title='Quem Somos' subtitle='Soluções inteligentes em Gestão de Energia'/>
      </Header>
      <AboutUsView>
        {/* <Banner title='Quem Somos' subtitle='Soluções inteligentes em Gestão de Energia' imgSource='/assets/banners/aboutUsBanner.png' /> */}

        <section dangerouslySetInnerHTML={{__html: text[0]?.about}}/>
        <article>
          <aside>
            <h2>Apoio a projetos sociais</h2>
            <div>
              <Image src='/assets/stamps/whiteStamp.png' width={200} height={200} />
              <Image src='/assets/stamps/blueStamp.png' width={200} height={200} />
            </div>
          </aside>
        </article>
      </AboutUsView>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let text = []

  await apiClient.get('/aboutUs').then(res => {
    text = res.data.data
  }).catch(res => {
    // console.log(res)
  })

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
      userName,
      text
    }
  }
}

