import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { DashboardView } from '../styles/layouts/Dashboard/DashboardView'

export default function Dashboard() {
  return (
    <div style={{
      'display': 'flex'
    }}>
      <div className='sideBar' style={{
        'width': '35rem',
        'height': '146vh',
        'backgroundColor': 'grey'
      }}></div>
      <DashboardView>
        <header>
          <input />
          <figure>
            <Image src='/copel.svg' width={125} height={125} />
            <div>
              <figure />
            </div>
          </figure>
        </header>
        <h1>Visão Geral</h1>
        <span>Bem Vindo a Smart Energia</span>
        <section className="cardSection" >
          <figure>
            <Image src="/moneyIcon.svg" width={125} height={125} />
            <div>
              <h4>R$/MWh</h4>
              <span>abril / 22</span>
            </div>
          </figure>
          <figure>
            <Image src="/mapSample.svg" width={125} height={125} />
            <div>
              <h4>SE/CO</h4>
              <span>Sudeste</span>
              <figure>
                <Image src="/graphLineIcon.svg" width={20} height={20} />
                <p> R$ 273,54</p>
              </figure>
            </div>
          </figure>
          <figure>
            <Image src="/mapSample.svg" width={125} height={125} />
            <div>
              <h4>SE/CO</h4>
              <span>Sudeste</span>
              <figure>
                <Image src="/graphLineIcon.svg" width={20} height={20} />
                <p> R$ 273,54</p>
              </figure>
            </div>
          </figure>
          <figure>
            <Image src="/mapSample.svg" width={125} height={125} />
            <div>
              <h4>SE/CO</h4>
              <span>Sudeste</span>
              <figure>
                <Image src="/graphLineIcon.svg" width={20} height={20} />
                <p> R$ 273,54</p>
              </figure>
            </div>
          </figure>
          <figure>
            <Image src="/mapSample.svg" width={125} height={125} />
            <div>
              <h4>SE/CO</h4>
              <span>Sudeste</span>
              <figure>
                <Image src="/graphLineIcon.svg" width={20} height={20} />
                <p> R$ 273,54</p>
              </figure>
            </div>
          </figure>
        </section>

        <section className='dashboard'>
          <article>
            <div>
              <h4>Consumo</h4>
              <span>Gráfico de Consumo</span>
              <></>
            </div>
            <aside className='asideConsumo'>
              <div className='asideConsumoContent' >
                <div className='count' >
                  <h4>25</h4>
                </div>
                <h5>consumo</h5>
                <div className='statusDot' ></div>
              </div>
              <Link href="#">{"Visualizar >"}</Link>
            </aside>
            <div className='graph' />
          </article>

          <article>
            <div>
              <h4>Indicador de custo</h4>
              <span>Valores em R$/ MWh</span>
              <></>
            </div>
            <div className='graph' />
          </article>

          <article>
            <div>
              <h4>Consumo</h4>
              <span>Gráfico de Consumo</span>
              <></>
            </div>
            <div className='graphBig' />
          </article>
        </section>
      </DashboardView>
    </div>
  )
}
