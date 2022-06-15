import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Head from 'next/head'
import React from 'react'

import NotificationsTable from '../../../components/administrativeTables/NotificationsTable'
import BasicButton from '../../../components/buttons/basicButton/BasicButton';
import FaqButton1 from '../../../components/buttons/faqButton/FaqButton1';
import FaqButton2 from '../../../components/buttons/faqButton/FaqButton2';
import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import { api }  from '../../../services/api';
import { FaqView } from '../../../styles/layouts/commonQuestions/FaqView'
import { NotificationView } from './notificationView'

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
    <FaqView>
      <Head>
        <title>Smart Energia - Notificações</title>
      </Head>
      <Header name=''/>
      <PageTitle title='Notificações' subtitle='Notificações'/>

      <div className='buttons'>
      <button className='btn2' onClick={handleOpen}>Disparar nova</button>

      </div>
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

          <FaqButton1  title='Cancelar' onClick={function (): void {
              throw new Error('Function not implemented.');
            } } />
          <FaqButton2  title='Salvar' onClick={function (): void {
              throw new Error('Function not implemented.');
            } } />
        </Box>
      </Modal>
      <NotificationsTable />
    </FaqView>
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
