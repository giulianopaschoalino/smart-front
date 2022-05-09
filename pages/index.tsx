import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'


import { LoginView} from  '../styles/layouts/login/LoginView';
import { truncateSync } from 'fs';

interface HomeInterface {
  auth: any
}

export default function Home({ auth }: HomeInterface) {

  const router = useRouter()
  const rota = router.pathname

  return (
    <LoginView auth={rota} >
      <Image src='/assets/marca1.svg' width={600} height={700}/>
      <section className="container">
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em Gestão de Energia</h2>
        <input type="text" placeholder='Login'/>
        <input type="text" placeholder='Senha'/>
        <span>Esqueceu a senha ?</span>
        <Link href='/dashboard' >
          <button>ENTRAR</button>
        </Link>

        <fieldset>
          <legend>Ou</legend>
        </fieldset>

        <p>+55(41) 3012-5900
        <br /> www.energiasmart.com.br</p>

      </section>
    </LoginView>
  )
}
