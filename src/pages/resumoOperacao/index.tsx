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

import BasicButton from '../../components/buttons/basicButton/BasicButton';
import Header from '../../components/header/Header';
import PageTitle from '../../components/pageTitle/PageTitle';
import Sidebar from '../../components/sidebar/Sidebar';
import { api } from '../../services/api';
// import { dados } from '../services/DadosTabelaResumoOperacao';
import data from '../../services/dados.json'
import getAPIClient from '../../services/ssrApi';
import { Pagination, TableView } from '../../styles/layouts/ResumoOperacao/ResumoOperacaoView';

export default function ResumoOperacao({tableData, clientsData, userName, clientMonth}: any) {
  const csvData = tableData;

  const [month, setMonth] = useState('');
  const [unidade, setUnidade] = useState('');
  const [tableDataState, setTableDataState] = useState<any>([]);

  const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'ago', 'set', 'out', 'nov', 'dez']

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };
  const handleChangeUnidade = (event: SelectChangeEvent) => {
    setUnidade(event.target.value);
  };

  function downloadCSVFile(csv, filename) {
    const csv_file = new Blob(["\ufeff",csv], {type: "text/csv"});
    const download_link = document.createElement("a");
    download_link.download = filename;
    download_link.href = window.URL.createObjectURL(csv_file);
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
  }

  function htmlToCSV(html, filename) {
    const data = [];
    const rows = document.querySelectorAll("table tr");
    for (let i = 0; i < rows.length; i++) {
      const row = [], cols: any = rows[i].querySelectorAll("td, th");
      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      data.push(row.join(";"));
    }
    downloadCSVFile(data.join("\n"), filename);
  }

  useEffect(() => {
    if (unidade!=='' || month!==''){
      api.post('/operation/summary', month && !unidade? {
        "filters": [
          {"type" : "=", "field": "mes", "value": month}
        ]
      } :
      !month && unidade? {
        "filters": [
          {"type" : "=", "field": "dados_te.cod_smart_unidade", "value": unidade}
        ]
      } :
      month && unidade? {
        "filters": [
          {"type" : "=", "field": "mes", "value": month},
          {"type" : "=", "field": "dados_te.cod_smart_unidade", "value": unidade}
        ]
      } : {}
      ).then(res => {
        setTableDataState(res.data.data)
      }).catch(res => {
        // console.log(res)
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
      <Header name={userName}>
        <PageTitle title='Resumo de Operações' subtitle='Operações detalhadas' />
      </Header>
      <h3>Filtrar por Unidade e/ou Mês</h3>
      <div className='select'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-labels">Unidades</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unidade}
            label="Unidade"
            onChange={handleChangeUnidade}
          >
            <MenuItem key={1} value={''}>Todas</MenuItem>
            {
              clientsData.map((value) => {
                return <MenuItem key={1} value={value.cod_smart_unidade}>{value.cod_smart_unidade}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{mt: 2}}>
          <InputLabel id="demo-simple-select-label">Mês</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Month"
            onChange={handleChangeMonth}
          >
            <MenuItem value={''}>Todos</MenuItem>
            {
              clientMonth.map((value) => {
                return <MenuItem key={1} value={value.mes}>{monthLabels[parseFloat(value.mes.slice(3, 4))-1]}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </div>
      <table className="tg">
        <thead>
          <tr>
            <th className='tg-8oo6'>Mês </th>
            <th className='tg-8oo6'>Unidade </th>
            <th className='tg-8oo6'>Operação</th>
            <th className='tg-8oo6'>Contraparte</th>
            <th className='tg-8oo6'>Montante (MWh)</th>
            <th className='tg-8oo6'>ValorNF/Crédito(R$)</th>
            <th className='tg-8oo6'>Preço(R$/MWh)</th>
          </tr>
        </thead>
        <tbody>
          {
            tableDataState.sort((a, b) => {
              if (parseFloat(a.mes.slice(0,2)) > parseFloat(b.mes.slice(1,2))) return 1
              if (parseFloat(a.mes.slice(0,2)) < parseFloat(b.mes.slice(1,2))) return -1

              return 0
            }).map((value, index) => {
              return <>
                <tr>
                  <td key={index} className='tg-gceh'>{value.mes}</td>
                  <td key={index} className='tg-gceh'>{value.cod_smart_unidade}</td>
                  <td key={index} className='tg-uulg'>{value.operacao}</td>
                  <td key={index} className='tg-gceh'>{value.contraparte}</td>
                  <td key={index} className='tg-gceh'>{parseFloat(value.montante_nf).toLocaleString('pt-br')}</td>
                  <td key={index} className='tg-gceh'>{parseFloat(value.preco_nf).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                  <td key={index} className='tg-uulg'>{parseFloat(value.nf_c_icms).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                </tr>
              </>
            })
          }
        </tbody>
      </table>
      <div className='btn'>
        <BasicButton title='Baixar CSV' onClick={() => {
          const html = document.querySelector("table").outerHTML;
          htmlToCSV(html, "resumo_operacao.csv");
        }}/>
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
  let clientsData = [];
  let clientMonth = [];

  await apiClient.post('/operation/summary', {
    "filters": []
  }).then(res => {
    tableData = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/operation', {
    "filters": [],
    "fields": ["cod_smart_unidade"],
    "distinct": true
  }).then(res => {
    clientsData = res.data.data
  }).catch(res => {
    // console.log(res)
  })

  await apiClient.post('/operation', {
    "filters": [],
    "fields": ["mes"],
    "distinct": true
  }).then(res => {
    clientMonth = res.data.data
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
      tableData,
      clientsData,
      clientMonth,
      userName
    }
  }
}
