import Avatar from '@mui/material/Avatar'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react'

import { AdministrativeHeaderView } from './AdministrativeHeaderView';

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
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function AdministrativeHeader() {
  const [unity, setUnity] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUnity(event.target.value);
  };

  return (
    <AdministrativeHeaderView>
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
      <FormControl sx={{mr: '20px', minWidth: 180, minHeight: '80px'}}>
        <Select
          value={unity}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">Administrativo</MenuItem>
          <MenuItem value={10}>Copel</MenuItem>
          <MenuItem value={20}>Cliente 1</MenuItem>
          <MenuItem value={30}>Cliente 2</MenuItem>
        </Select>
      </FormControl>
      <Avatar {...stringAvatar('José Corte')} />
    </section>
  </AdministrativeHeaderView>
  )
}
