import Image from 'next/image'
import React from 'react'
import Banner from '../src/components/banner/Banner'
import Header from '../src/components/header/Header'
import { AboutUsView } from '../styles/layouts/aboutUs/AboutUsView'

export default function aboutUs() {
  return (
    <AboutUsView>
      <Header name='' />
      <Banner title='Quem Somos' subtitle='Soluções inteligentes em Gestão de Energia' imgSource='/assets/banners/aboutUsBanner.png' />

      <section>
        <p>A <strong>SMART ENERGIA</strong> é uma consultoria independente especializada em Gestão de Energia Elétrica, consolidada como uma das três maiores consultorias do Brasil.
          Devido à grande experiência em operações na CCEE – Câmara de Comercialização de Energia Elétrica e ANEEL, entrega resultados que superam as expectativas.</p>

        <p>Nasceu para gerenciar a compra de energia com inovação, transparência e imparcialidade sendo o elo forte e necessário entre os Consumidores e os
          Vendedores de energia. </p>

        <p>Baseada em sua experiência no setor elétrico adquirida desde 2001 e em mais de 900 unidades migradas, atua na negociação de contratos de compra e venda de
          energia, na Gestão de Energia no Mercado Livre e criação de produtos diferenciados para atender as necessidades específicas dos consumidores.</p>

        <p>Apoiada pela sólida experiência de seus gestores, conhecendo as premissas dos agentes de Comercialização e Geração para a compra e venda de energia,
          aplicamos as mesmas premissas a favor dos Consumidores, disponibilizando assim um diferencial único para a tomada de decisão e elaboração das estratégias de
          contratação de energia.</p>
        <ul>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Informação</li>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Economia</li>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Gestão de Energia</li>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Imparcialidade</li>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Previsão de Custos</li>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Experiência</li>
          <li><Image src='/assets/listIcon.svg' width={25} height={25} />Relacionamento</li>
        </ul>

        <article>
          <aside>
            <h2>Apoio a projetos sociais</h2>
            <div>
              <Image src='/assets/stamps/whiteStamp.png' width={200} height={200} />
              <Image src='/assets/stamps/blueStamp.png' width={200} height={200} />
            </div>
          </aside>
        </article>
      </section>
    </AboutUsView>
  )
}
