import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { SidebarView } from './SidebarView'

export default function Sidebar() {
  const [ economiaDrawer, setEconomiaDrawer ] = useState(false)

  const [ viewModal, setViewModal ] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setViewModal(false)
  }, [router.pathname])

  return (
    <SidebarView economiaDrawer={economiaDrawer} modalOpen={viewModal} >
      <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
        <Image src='/assets/hamburgerModal.svg' width={60} height={60} />
      </div>
      <div className='imageNext'>
        <Image src='/assets/logo.svg' width={100} height={100} />
      </div>
      <ul>
        <Link href='/dashboard'><li className={router.pathname=='/dashboard'? 'actualPath' : null} ><Image src='/assets/sidebar/dashboardIcon.svg' width={25} height={25} />{'Visão Geral'}</li></Link>
        <li onClick={() => setEconomiaDrawer(!economiaDrawer)} className={router.pathname=='/grossSavings' || router.pathname=='/accumulatedSavings' || router.pathname=='/estimatedCost' || router.pathname=='/costIndicator' ? 'actualPath' : null } ><Image src='/assets/sidebar/economyIcon.svg' width={25} height={25} />{'Economia'}</li>
          <div className='economiaDrawer drawer' >
          <Link href='/grossSavings'><li>Economia Bruta</li></Link>
          <Link href='/accumulatedSavings'><li>Economia Acumulada</li></Link>
          <Link href='/estimatedCost'><li>Custo Estimado</li></Link>
          <Link href='/costIndicator'><li>Custo R/MWh</li></Link>
          </div>
        <Link href='/telemetria'><li className={router.pathname=='/telemetry'? 'actualPath' : null}><Image src='/assets/sidebar/telemetryIcon.svg' width={25} height={25} />{'Telemetria >'}</li></Link>
        <Link href='/resumoOperacao'><li className={router.pathname=='/resumoOperacao'? 'actualPath' : null} ><Image src='/assets/sidebar/summaryOperationsIcon.svg' width={25} height={25} />{'Resumo de Op. '}</li></Link>
        <Link href='/news'><li className={router.pathname=='/news'? 'actualPath' : null}><Image src='/assets/sidebar/newsIcon.svg' width={25} height={25} />{'Notícias >'}</li></Link>
        <Link href='#'><li className={router.pathname=='/sectorialInfo'? 'actualPath' : null}><Image src='/assets/sidebar/sectorialInfoIcon.svg' width={25} height={25} />{'Info Setorial >'}</li></Link>
        <Link href='/consumption'><li className={router.pathname=='/consumption'? 'actualPath' : null} ><Image src='/assets/sidebar/consumptionIcon.svg' width={25} height={25} />{'Consumo'}</li></Link>
        <Link href='/notifications'><li className={router.pathname=='/notification'? 'actualPath' : null}><Image src='/assets/sidebar/notificationsIcon.svg' width={25} height={25} />{'Notificação >'}</li></Link>
        <Link href='/aboutUs'><li className={router.pathname=='/aboutUs'? 'actualPath' : null}><Image src='/assets/sidebar/dashboardIcon.svg' width={25} height={25} />{'Sobre Nós >'}</li></Link>
        <Link href='/faq'><li className={router.pathname=='/faq'? 'actualPath' : null}><Image src='/assets/sidebar/saqIcon.svg' width={25} height={25} />{'FAQ >'}</li></Link>
        <Link href='/'><button><Image src='/assets/logout.svg' width={25} height={25} />{'Sair'}</button></Link>
      </ul>
      <aside>
        <p>Nossos Gerentes estão prontos para atendê-los</p>
        <div><h3>(xx) XXXX-XXXX</h3></div>
      </aside>
    </SidebarView>
  )
}
