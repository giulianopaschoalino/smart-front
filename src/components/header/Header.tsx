import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';

import { HeaderView } from './HeaderView'
import { parseCookies } from 'nookies';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

interface headerInterface {
  name: string,
  admin?: boolean | undefined
}

export default function Header({ name, admin }: headerInterface) {
  return (
    <HeaderView>
      <section>
      </section>
      <section>
        {
          !admin?
          <Image src='/assets/png/copel.png' width={170} height={50} />
          :
          null
        }
        <div className='icon' >
          <p>
            olá, {name}
          </p>
        </div>
        <Avatar {...stringAvatar(name)} style={{border: 'white solid 4px', width: '47px', height: '47px'}}/>
      </section>
    </HeaderView>
  )
}
