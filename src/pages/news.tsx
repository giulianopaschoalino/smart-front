import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link'
import { parseCookies } from 'nookies';
import React from 'react'

import Banner from '../components/banner/Banner'
import BasicButton from '../components/buttons/basicButton/BasicButton';
import Header from '../components/header/Header'
import getAPIClient from '../services/ssrApi';
import { Button, NewsView } from '../styles/layouts/news/NewsView'

export default function aboutUs({userName, news}: any) {
  console.log(news)
  return (
    <NewsView>
      <Head>
        <title>Smart Energia - Noticias</title>
      </Head>
      <Header name={userName} />
      <Banner title='Notícias' subtitle='Tudo de importante no setor de energia' imgSource='/assets/banners/news.png' />

      <section>
        <h2>19 Abril 2022</h2>
        <strong>ANEEL APROVA REAJUSTE TARIFÁRIO ANUAL DA ENERGISA SERGIPE DE 16,46 % PARA O CONSUMIDOR RESIDENCIAL</strong>
        <br />
        <br />
        <p>A Agência Nacional de Energia Elétrica (ANEEL) aprovou, nesta terça-feira (19/04) o reajuste tarifário anual da Energisa Sergipe – Distribuidora de Energia S.A (ESE).
          As novas tarifas da empresa, que atende cerca de e 825 mil unidades consumidoras no Sergipe, entram em vigor nesta sexta, 22/04, com reajuste de 16,46 % para
          o consumidor residencial. <br />
          Os itens que mais impactaram a correção foram os encargos setoriais, os custos de distribuição, a retirada dos componentes financeiros..</p>
        <Button>
        <fieldset>
        <legend> <BasicButton title='Ver Mais...' onClick={() => console.log()}/></legend>
        </fieldset>
        </Button>

          <h2>19 Abril 2022</h2>
        <strong>NEEL APROVA REAJUSTE MÉDIO DE 20,36% NA TARIFA DE ENERGIA NO RN</strong>
        <br />
        <br />
        <p>A Agência Nacional de Energia Elétrica (ANEEL) aprovou, nesta terça-feira (19/04) o reajuste tarifário anual da Energisa Sergipe – Distribuidora de Energia S.A (ESE).
          As novas tarifas da empresa, que atende cerca de e 825 mil unidades consumidoras no Sergipe, entram em vigor nesta sexta, 22/04, com reajuste de 16,46 % para
          o consumidor residencial. <br />
          Os itens que mais impactaram a correção foram os encargos setoriais, os custos de distribuição, a retirada dos componentes financeiros..</p>
        <Button>
        <fieldset>
        <legend> <BasicButton title='Ver Mais...' onClick={() => console.log()}/></legend>
        </fieldset>
        </Button>
      </section>

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

  let news;

  await axios.get('https://www.energiasmart.com.br/noticias/feed/').then(res => {
    news = res.data
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
