import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

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
        <div className='icon' >
          <p>
            olá, {name}
          </p>
        </div>
        {
          !admin && profile_picture?
          <Image src={profile_picture} height={100} width={108}/>
          :
          <Image src='https://kluppdevelopment.s3.sa-east-1.amazonaws.com/avatars/zcgw6O0FxZgxRmIs97WMcUddKurQJcIqSxBLStSc.png' height={75} width={108}/>
        }
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

