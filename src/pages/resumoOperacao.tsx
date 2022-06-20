import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
// import Teste from '../files/teste.csv';
import { CSVDownload, CSVLink } from "react-csv";

import BasicButton from '../components/buttons/basicButton/BasicButton';
import Header from '../components/header/Header';
import PageTitle from '../components/pageTitle/PageTitle';
import Sidebar from '../components/sidebar/Sidebar';
import { api } from '../services/api';
// import { dados } from '../services/DadosTabelaResumoOperacao';
import data from '../services/dados.json'
import getAPIClient from '../services/ssrApi';
import { Pagination, TableView } from '../styles/layouts/ResumoOperacao/ResumoOperacaoView';

export default function ResumoOperacao({tableData, userName}: any) {
  const csvData = tableData;

  const [month, setMonth] = useState('');
  const [unidade, setUnidade] = useState('');
  const [tableDataState, setTableDataState] = useState<any>([]);

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };
  const handleChangeUnidade = (event: SelectChangeEvent) => {
    setUnidade(event.target.value);
  };

  useEffect(() => {
    if (unidade!=='' || month!==''){
      api.post('/operation', {
        "filters": [
            {"type" : "=", "field": "mes", "value": `${month}/2022`},
            {"type" : "=", "field": "dados_te.cod_smart_unidade", "value": unidade}
          ]
      }).then(res => {
        setTableDataState(res.data.data)
      }).catch(res => {
        console.log(res)
      })
    } else {
      setTableDataState(tableData)
    }

  }, [month, unidade])

  return (
    <TableView>
      <Head>
        <title>Smart Energia - Resumo de Operação</title>
      </Head>
      <Header name={userName} />
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
            <MenuItem key={1} value={''}>Nenhum</MenuItem>
            {
              tableData.map((value) => {
                return <MenuItem key={1} value={value.cod_smart_unidade}>{value.cod_smart_unidade}</MenuItem>
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
            <MenuItem value={''}>Nenhum</MenuItem>
            <MenuItem value={'01'}>Janeiro</MenuItem>
            <MenuItem value={'02'}>Fevereiro</MenuItem>
            <MenuItem value={'03'}>Março</MenuItem>
            <MenuItem value={'04'}>Abril</MenuItem>
            <MenuItem value={'05'}>Maio</MenuItem>
            <MenuItem value={'06'}>Junho</MenuItem>
            <MenuItem value={'07'}>Julho</MenuItem>
            <MenuItem value={'08'}>Agosto</MenuItem>
            <MenuItem value={'09'}>Setembro</MenuItem>
            <MenuItem value={'10'}>Outubro</MenuItem>
            <MenuItem value={'11'}>Novembro</MenuItem>
            <MenuItem value={'12'}>Dezembro</MenuItem>
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
            tableDataState.map((value, index) => {
              return <>
                <tr>
                  <td key={index} className='tg-gceh'>{value.cod_smart_unidade}</td>
                  <td key={index} className='tg-uulg'>{value.operacao}</td>
                  <td key={index} className='tg-gceh'>{value.montante_nf}</td>
                  <td key={index} className='tg-gceh'>{value.contraparte}</td>
                  <td key={index} className='tg-uulg'>{value.nf_c_icms}</td>
                  <td key={index} className='tg-gceh'>{value.preco_nf}</td>
                </tr>
              </>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-id']: id } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let tableData = [];

  await apiClient.post('/operation', {
    "filters": []
  }).then(res => {
    console.log(res.data.data)
    tableData = res.data.data
  }).catch(res => {
    console.log(res)
  })

  console.log(tableData)

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
      tableData,
      userName
    }
  }
}
