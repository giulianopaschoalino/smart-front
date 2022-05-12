import React from 'react'
import Image from 'next/image';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

import { HeaderView } from './HeaderView'

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

interface headerInterface {
  name: string
}

export default function Header({ name }: headerInterface) {

  return (
    <HeaderView>
      <section>
        <TextField
          id="outlined-textarea"
          label="Encontre na Página"
          placeholder="Encontre na Página"
          multiline
          fullWidth
        />
      </section>
      <section>
        <Image src='/assets/png/copel.png' width={170} height={50} />
        <div className='icon' >
          olá, {'josé'}
        </div>
        <Avatar {...stringAvatar('José Corte')} />
      </section>
    </HeaderView>
  )
}
