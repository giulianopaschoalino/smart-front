import Head from 'next/head'
import React from 'react'
import CommonQuestionsCard from '../../../components/faqQuestionsCard/FaqQuestionsCard'
import Header from '../../../components/header/Header'
import { NotificationView } from './notificationView'
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';


import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll'
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function commonQuestions() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <NotificationView>
      <Head>
        <title>Smart Energia - FAQ</title>
      </Head>
      <Header  name='' />
      <h1>Perguntas Frequentes</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>


      <button className='btn2' onClick={handleOpen}>Open modal</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
         <Box sx={style}>
          <h1>Disparar Notificações</h1>
          <Typography sx={{color:'gray', fontSize:12}}variant="h5" gutterBottom component="div">
          Pode ser que todas as notificaçõs demorem alguns minutos para estarem disponíveis</Typography>
          <br />
         <TextField id="outlined-basic" label="Título" sx={{width:700, ml:8}} variant="outlined" /> <br /><br />

         <Autocomplete
          multiple
          id="checkboxes-tags-demo"
          options={top100Films}
          disableCloseOnSelect
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      sx={{ml:8}}
      style={{ width: 700 }}
      renderInput={(params) => (
        <TextField {...params} label="Corpo/Conteúdo da notificação" placeholder="Corpo/Conteúdo da notificação" />
      )}
    />
      <div>
      <Checkbox sx={{ml:7}}
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon />}
      />
        <Typography sx={{color:'#1976D2', fontSize:12, ml:12, mt:-3.7}} >
        Disparar para todos os clientes</Typography>
        <Checkbox sx={{ml:7}}
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<RadioButtonCheckedIcon />}
      />
      <Typography sx={{color:'#1976D2', fontSize:12, ml:12, mt:-3.7}} >
      Disparar somente para alguns clientes</Typography>
</div>


         <FaqButton1  title='Cancelar' />
         <FaqButton2  title='Salvar' />
        </Box>




      </Modal>





    </NotificationView>


  )
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
];
