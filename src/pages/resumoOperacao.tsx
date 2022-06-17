import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Head from 'next/head';
import React, { useEffect } from 'react';
// import Teste from '../files/teste.csv';
import { CSVDownload, CSVLink } from "react-csv";

import BasicButton from '../components/buttons/basicButton/BasicButton';
import Header from '../components/header/Header';
import PageTitle from '../components/pageTitle/PageTitle';
import Sidebar from '../components/sidebar/Sidebar';
// import { dados } from '../services/DadosTabelaResumoOperacao';
import data from '../services/dados.json'
import { Pagination, TableView } from '../styles/layouts/ResumoOperacao/ResumoOperacaoView';

export default function ResumoOperacao() {
  const csvData = [
    // ["firstname", "lastname", "email"],
    // ["Ahmed", "Tomi", "ah@smthing.co.com"],
    // ["Raed", "Labes", "rl@smthing.co.com"],
    // ["Yezzi", "Min l3b", "ymin@cocococo.com"],



      [ "value", "unidade1", "name", "Unidade-1",  "operacao", "Compra", "montante", "130,00", "contraparte", "cOPEL COM I5", "preco", "234,67", "valorNF", "38.257,15" ],
      [ "value", "unidade2", "name", "Unidade-2",  "operacao", "Compra", "montante", "20,00", "contraparte",  "EMEWE I5", "preco", "234,67", "valorNF", "38.257,15"],
      [ "value", "unidade3", "name", "Unidade-3",  "operacao", "Compra", "montante", "30,00", "contraparte",  "EMEWE I5", "preco", "234,67", "valorNF", "38.257,15" ],
      [ "value", "unidade4", "name", "Unidade-4",  "operacao", "Compra", "montante", "40,00", "contraparte",  "COPEL COM I5", "preco", "234,67", "valorNF", "38.257,15" ],
      [ "value", "unidade5", "name", "Unidade-5",  "operacao", "Compra", "montante", "500,00","contraparte", "COPEL COM I5", "preco", "234,67", "valorNF", "38.257,15" ],
      [ "value", "unidade6", "name", "Unidade-6", "operacao", "Compra", "montante", "300,00", "contraparte", "COPEL COM I5", "preco","234,67", "valorNF", "965,95" ]

  ];

  const [month, setMonth] = React.useState('');
  const [unidade, setUnidade] = React.useState('');

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };
  const handleChangeUnidade = (event: SelectChangeEvent) => {
    setUnidade(event.target.value);
  };

  useEffect(() => {
    // console.log(data.unidades)
    // data.unidades.map((value) => {
    //   console.log(`olha o valor ${value.name}`)
    // })
    // console.log(unidade)
    console.log(data.unidades.filter((value, index)=> value.value.includes(unidade)))
  }, [month, unidade])

  return(
    <TableView>
      <Head>
        <title>Smart Energia - Resumo de Operação</title>
      </Head>
      <Header name='' />
      <PageTitle title='Resumo de Operaçoes' subtitle='Operações detalhadas' />

      <h3>Seletor Mês</h3>
      <div className='select'>
        <FormControl fullWidth  >
          <InputLabel id="demo-simple-select-labels">Unidades</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unidade}
            label="Unidade"
            onChange={handleChangeUnidade}
          >
            <MenuItem key={1} value={''}></MenuItem>
            {
              data.unidades.map((value) => {
                return <MenuItem key={1} value={value.value}>{value.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ml:1}} >
          <InputLabel id="demo-simple-select-label">Mês</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            onChange={handleChangeMonth}
          >
            <MenuItem value={15}>Janeiro</MenuItem>
            <MenuItem value={20}>Fevereiro</MenuItem>
            <MenuItem value={30}>Março</MenuItem>
            <MenuItem value={30}>Abril</MenuItem>
            <MenuItem value={30}>Março</MenuItem>
            <MenuItem value={30}>Maio</MenuItem>
            <MenuItem value={30}>Junho</MenuItem>
            <MenuItem value={30}>Julho</MenuItem>
            <MenuItem value={30}>Agosto</MenuItem>
            <MenuItem value={30}>Setembro</MenuItem>
            <MenuItem value={30}>Outubro</MenuItem>
            <MenuItem value={30}>Novembro</MenuItem>
            <MenuItem value={30}>Dezembro</MenuItem>
          </Select>
        </FormControl>
      </div>
      <table className="tg">
        <thead>
          <tr>
            <th className='tg-8oo6'>Unidade </th>
            <th className='tg-8oo6'>Operação</th>
            <th className='tg-8oo6'>Montante (MWh)</th>
            <th className='tg-8oo6'>Contraparte</th>
            <th className='tg-8oo6'>Preço(R$/MWh)</th>
            <th className='tg-8oo6'>ValorNF/Crédito(R$)</th>
          </tr>
        </thead>
        <tbody>
          {
            data.unidades.filter((value, index)=> value.value.includes(unidade)).map((value, index) => {
              if (index%2===0) {
                return <tr key={index}>
                    <td key={index} className='tg-gceh'>{value.name}</td>
                    <td key={index} className='tg-uulg'>{value.operacao}</td>
                    <td key={index} className='tg-gceh'>{value.montante}</td>
                    <td key={index} className='tg-gceh'>{value.contraparte}</td>
                    <td key={index} className='tg-uulg'>{value.preco}</td>
                    <td key={index} className='tg-gceh'>{value.valorNF}</td>
                  </tr>
              } else {
                return <tr key={index}>
                <td key={index} className='tg-hq65'>{value.name}</td>
                <td key={index} className='tg-0tzy'>{value.operacao}</td>
                <td key={index} className='tg-hq65'>{value.montante}</td>
                <td key={index} className='tg-hq65'>{value.contraparte}</td>
                <td key={index} className='tg-0tzy'>{value.preco}</td>
                <td key={index} className='tg-hq65'>{value.valorNF}</td>
              </tr>
              }
            })
          }
        </tbody>
      </table>
      <div className='btn'>
        <CSVLink data={csvData} filename="Arquivo_Teste_Smart_Energia">

        <BasicButton title='Baixar CSV' onClick={() => console.log()}/>
        </CSVLink>
      </div>
    </TableView>
  )
}
