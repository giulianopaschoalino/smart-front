import Image from 'next/image'
import React, { useState } from 'react'
import { SidebarView } from './SidebarView'

export default function Sidebar() {
  const [ economiaDrawer, setEconomiaDrawer ] = useState(false)

  const [ viewModal, setViewModal ] = useState(false)

  return (
    <SidebarView economiaDrawer={economiaDrawer} modalOpen={viewModal} >
      <div className='hamburger' onClick={() => setViewModal(!viewModal)} >
        <Image src='/assets/hamburgerModal.svg' width={100} height={100} />
      </div>
      <Image src='/assets/logo.svg' width={100} height={100} className='imageNext' />
      <ul>
        <li>{'Visão Geral'}</li>
        <li>{'Consumo'}</li>
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
