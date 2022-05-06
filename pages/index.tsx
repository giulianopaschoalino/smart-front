import React from 'react'
import Image from 'next/image';

import { LoginView} from  '../styles/layouts/Login/LoginView';


export default function Home() {
  return (
    <LoginView>
      <Image src='/assets/marca1.svg' width={600} height={700}/>
      <section className="container">
        <h1>Bem-Vindo</h1>
        <h2>Estratégias Inteligentes em Gestão de Energia</h2>
        <input type="text" placeholder='Login'/>
        <input type="text" placeholder='Senha'/>
        <span>Esqueceu a senha ?</span>
        <button>ENTRAR</button>

        <fieldset>
          <legend>Ou</legend>
        </fieldset>

        <p>+55(41) 3012-5900
        <br /> www.energiasmart.com.br</p>

      </section>
    </LoginView>
  )
}
