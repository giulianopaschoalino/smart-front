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
        {/* <section dangerouslySetInnerHTML={{__html: text[0]?.about}}/> */}
        <section>
          <p>A SMART ENERGIA é uma consultoria independente especializada em Gestão de Energia Elétrica, consolidada como uma das três maiores consultorias do Brasil.</p>
          <p>Devido à grande experiência em operações na CCEE – Câmara de Comercialização de Energia Elétrica e ANEEL, entrega resultados que superam as expectativas.</p>
          <p>Nasceu para gerenciar a compra de energia com inovação, transparência e imparcialidade sendo o elo forte e necessário entre os Consumidores e os Agentes Vendedores de energia.</p>
          <p>Baseada em sua experiência no setor elétrico adquirida desde 2001 e em mais de 900 unidades migradas, atua na negociação de contratos de compra e venda de energia, na Gestão de Energia no Mercado Livre e criação de produtos diferenciados para atender as necessidades específicas dos consumidores.</p>
          <p>Apoiada pela sólida experiência de seus gestores, conhecendo as premissas dos agentes de Comercialização e Geração para a compra e venda de energia, aplicamos as mesmas premissas a favor dos Consumidores, disponibilizando assim um diferencial único para a tomada de decisão e elaboração das estratégias de contratação de energia.</p>
          <ul>
            <li>Informação</li>
            <li>Economia</li>
            <li>Gestão de Energia</li>
            <li>Imparcialidade</li>
            <li>Previsão de Custos</li>
            <li>Experiência</li>
            <li>Relacionamento</li>
          </ul>
        </section>
        <div className='image'>
          <Image src='/assets/banners/aboutUs.jpg' width={280} height={180}/>
        </div>
        <article>
          <aside>
            <h2>Apoio a projetos sociais</h2>
            <div>
              <Image src='/assets/stamps/whiteStamp.png' width={140} height={140} />
              <Image src='/assets/stamps/blueStamp.png' width={140} height={140} />
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
