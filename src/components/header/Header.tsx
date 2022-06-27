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
}

export default function Header({name, admin}: headerInterface) {
  const { ['user-profile_picture']: profile_picture } = parseCookies()

  return (
    <HeaderView>
      <div className='icon' >
        <p>
          olá, {name}
        </p>
      </div>
      {
        !admin?
        <Image src={profile_picture} height={50} width={75}/>
        :
        null
      }
    </HeaderView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

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
      userName
    }
  }
}

