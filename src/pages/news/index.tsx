import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'
import { Router } from 'next/router';
import { parseCookies } from 'nookies';
import React from 'react'

import Banner from '../../components/banner/Banner'
import BasicButton from '../../components/buttons/basicButton/BasicButton';
import Header from '../../components/header/Header'
import getAPIClient from '../../services/ssrApi';
import { Button, NewsView } from '../../styles/layouts/news/NewsView'

export default function aboutUs({userName, news}: any) {
  console.log(news.channel.item)

  return (
    <NewsView>
      <Head>
        <title>Smart Energia - Noticias</title>
      </Head>
      {/* <Header name={userName} /> */}
      <Banner title='Notícias' subtitle='Tudo de importante no setor de energia' imgSource='/assets/banners/news.png'/>

      {
        news.channel.item.map(data => {

          return <>
            <section>
              <h2 dangerouslySetInnerHTML={{__html: data.pubDate.slice(0, -5)}} />
              <strong dangerouslySetInnerHTML={{__html: data.title}} />
              <strong>ANEEL APROVA REAJUSTE TARIFÁRIO ANUAL DA ENERGISA SERGIPE DE 16,46 % PARA O CONSUMIDOR RESIDENCIAL</strong>
              <br />
              <br />
              {
                <p dangerouslySetInnerHTML={{__html: data.description}} className='description'/>
              }
              <Button>
              <fieldset>
              <legend> <BasicButton title='Ver Mais...' onClick={() => window.open(data.guid)}/></legend>
              </fieldset>
              </Button>
            </section>
          </>
        })
      }

      <a href='https://www.energiasmart.com.br/noticias/'
      target={"_blank"}
      rel={"noreferrer"}><BasicButton title='Noticias Atualizadas' onClick={() => console.log()}/></a>
    </NewsView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let news = [];

  await apiClient.get('/news').then(res => {
    news = res.data.data
  }).catch(res => {
    console.log(res)
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
      news
    }
  }
}
