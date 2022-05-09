import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { SidebarView } from './SidebarView'

export default function Sidebar() {
  const [ economiaDrawer, setEconomiaDrawer ] = useState(false)

  const [ viewModal, setViewModal ] = useState(false)

  const router = useRouter()

  console.log(router.pathname)

  return (
    <SidebarView economiaDrawer={economiaDrawer} modalOpen={viewModal} >
      <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
        <Image src='/assets/hamburgerModal.svg' width={25} height={25} />
      </div>
      <div className='imageNext'>
        <Image src='/assets/logo.svg' width={100} height={100} />
      </div>
      <ul>
        <li className={router.pathname=='/dashboard'? 'actualPath' : null} >{'Visão Geral'}</li>
        <li className={router.pathname=='/consumption'? 'actualPath' : null} >{'Consumo'}</li>
        <li>{'Resumo de Op. >'}</li>
        <li onClick={() => setEconomiaDrawer(!economiaDrawer)} >{'Economia >'}</li>
        <div className='economiaDrawer drawer' >
          <li>Economia Bruta</li>
          <li>Economia Acumulada</li>
          <li>Custo Estimado</li>
          <li>Custo R/MWh</li>
        </div>
        <li>{'Notícias >'}</li>
        <li>{'Info Setorial >'}</li>
        <li>{'SAQ >'}</li>
        <li>{'Sobre Nós >'}</li>
        <li>{'Notificação >'}</li>
        <li>{'Telemetria >'}</li>
      </ul>
      <aside>
        <p>Nossos Gerentes estão prontos para atendê-los</p>
        <div><h3>(xx) XXXX-XXXX</h3></div>
      </aside>
    </SidebarView>
  )
}
