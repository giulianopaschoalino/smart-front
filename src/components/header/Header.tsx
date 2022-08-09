import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

import { HeaderView } from './HeaderView'
import { parseCookies } from 'nookies';
import { GetServerSideProps } from 'next';
import getAPIClient from '../../services/ssrApi';

interface headerInterface {
  name: string,
  admin?: boolean | undefined
  logo?: string
  children?: React.ReactNode
}

export default function Header({name, admin, children}: headerInterface) {
  const { ['user-profile_picture']: profile_picture } = parseCookies()

  return (
    <HeaderView>
      <section>
        {children}
      </section>
      <section>
        {
          !admin && profile_picture?
          <div className='logoContainer'>
            <img src={profile_picture} alt=''/>
          </div>
          :
          <Image src='/assets/marca1.png' height={75} width={108}/>
        }
        <div className='icon'>
          <p>
            olá, {name}
          </p>
        </div>
      </section>
    </HeaderView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)
  const { ['user-profile_picture']: profile_picture } = parseCookies()

  let userData = [];

  await apiClient.get('/user').then(res => {
    userData = res.data.data
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
      userData,
      userName,
      profile_picture
    }
  }
}

