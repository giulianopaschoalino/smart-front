import React from 'react'
import Banner from '../components/banner/Banner'
import Header from '../components/header/Header'
import BasicButton from '../components/buttons/basicButton/BasicButton';
import { NewsView, Button } from '../styles/layouts/news/NewsView'

export default function aboutUs() {
  return (
    <NewsView>
      <Header name='' />
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
        <legend> <BasicButton  title='Ver Mais...' /></legend>
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
        <legend> <BasicButton  title='Ver Mais...' /></legend>
        </fieldset>
        </Button>
      </section>
    </NewsView>
  )
}
