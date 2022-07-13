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
import { Pagination, TableBodyView, TableHeader, TableView } from '../../styles/layouts/ResumoOperacao/ResumoOperacaoView';

import Fab from '@mui/material/Fab';

import NavigationIcon from '@mui/icons-material/Navigation';

export default function ResumoOperacao({tableData, clients, userName, clientMonth}: any) {
  const csvData = tableData;

  const [month, setMonth] = useState('');
  const [unidade, setUnidade] = useState(clients[0].cod_smart_unidade);
  const [tableDataState, setTableDataState] = useState<any>([]);

  const { ['user-id']: id } = parseCookies()

  const handleChangeMonth = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };
  const handleChangeUnidade = (event: SelectChangeEvent) => {
    setUnidade(event.target.value);
  };

  const [ pageYPosition, setPageYPosition ] = useState(0);

  function getPageYAfterScroll(){
    setPageYPosition(window.scrollY);
    console.log(window.scrollY)
  }

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
    console.log(unidade)
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
      }).catch(res => console.log(res))
    } else {
      setTableDataState(tableData)
    }
  }, [month, unidade])

  useEffect(() => {
    window?.addEventListener('scroll', getPageYAfterScroll);
  }, [])

  return (
    <TableView>
      <Head>
        <title>Smart Energia - Resumo de Operação</title>
      </Head>
      <Header name={userName}>
        <PageTitle title='Resumo de Operações' subtitle='Operações de compra e venda - Mensal' />
      </Header>
      <TableHeader>
        <article id='select'>
          <div className='select'>
            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-labels">Unidades</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={unidade}
                  label="Unidade"
                  onChange={handleChangeUnidade}
                  fullWidth
                >
                  <MenuItem key={1} value={''}>Todas</MenuItem>
                  {
                    clients.map((value) => {
                      return <MenuItem key={value.cod_smart_unidade} value={value.cod_smart_unidade}>{value.unidade}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mês</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={month}
                  label="Month"
                  onChange={handleChangeMonth}
                  fullWidth
                >
                  <MenuItem value={''}>Todos</MenuItem>
                  {
                    clientMonth.sort((a, b) => {
                      if (parseFloat(a.mes.slice(0, 2)) < parseFloat(b.mes.slice(0, 2)))
                      if (parseFloat(a.mes.slice(3, 7)) > parseFloat(b.mes.slice(3, 7))) return -1
                      else return 1
                      if (parseFloat(a.mes.slice(0, 2)) > parseFloat(b.mes.slice(0, 2)))
                      if (parseFloat(a.mes.slice(3, 7)) < parseFloat(b.mes.slice(3, 7))) return 1
                      else return -1

                      return 0
                    }).map((value) => {
                      return <MenuItem key={value.mes} value={value.mes}>{value.mes}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>
          </div>
        </article>
        <article>
          <BasicButton title='Baixar CSV' onClick={() => {
            const html = document.querySelector("table").outerHTML;
            htmlToCSV(html, "resumo_operacao.csv");
          }}/>
        </article>
      </TableHeader>
      <TableBodyView>
        <table className="tg">
          <thead>
            <tr>
              <th className='tg-8oo6'>Mês </th>
              <th className='tg-8oo6'>Unidade </th>
              <th className='tg-8oo6'>Operação</th>
              <th className='tg-8oo6'>Contraparte</th>
              <th className='tg-8oo6'>Montante (MWh)</th>
              <th className='tg-8oo6'>Preço(R$/MWh)</th>
              <th className='tg-8oo6'>ValorNF/Crédito(R$)</th>
            </tr>
          </thead>
          <tbody>
            {
              tableDataState?.map((value, index) => {
                if (value.mes.slice(4,7) != '2020')
                return <tr>
                    <td key={value.mes} className='tg-gceh'>{value.mes}</td>
                    <td key={value.cod_smart_unidade} className='tg-gceh'>{value.cod_smart_unidade}</td>
                    <td key={value.operacao} className='tg-gceh'>{value.operacao}</td>
                    <td key={value.contraparte} className='tg-gceh'>{value.contraparte}</td>
                    <td key={value.montante_nf} className='tg-gceh'>{parseFloat(value.montante_nf).toLocaleString('pt-br')}</td>
                    <td key={value.preco_nf} className='tg-gceh'>{parseFloat(value.preco_nf).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                    <td key={value.nf_c_icms} className='tg-gceh'>{parseFloat(value.nf_c_icms).toLocaleString('pt-br',{style: 'currency', currency: 'BRL', minimumFractionDigits: 2})}</td>
                  </tr>
              })
            }
          </tbody>
        </table>
      </TableBodyView>
      {pageYPosition > 300 && <a href="#select" style={{position: 'fixed', right: '50px', bottom: '100px'}}>
        <Fab aria-label="add">
          <NavigationIcon />
        </Fab>
      </a>}
    </TableView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-client_id']: client_id } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  let tableData = [];
  let clientMonth = [];

  await apiClient.post('/operation/summary', {
    "filters": []
  }).then(res => {
    tableData = res.data.data
  })

  let clients = [];

  await apiClient.post('/operation', {
    "filters": [
      {"type" : ">=", "field":"dados_te.mes", "value":1, "interval": "year"}
    ],
    "fields": ["mes"],
    "distinct": true
  }).then(res => {
    clientMonth = res.data.data
  })

  await apiClient.post('/units', {
		"filters": [
			{"type" : "=", "field": "dados_cadastrais.cod_smart_cliente", "value": client_id},
			{"type" : "not_in", "field": "dados_cadastrais.codigo_scde", "value":["0P"]}
		],
		"fields": [
			"unidade",
			"cod_smart_unidade",
			"codigo_scde"],
		"distinct": true
  }).then(res => {
    console.log(res.data)
    clients = res.data.data
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
      clients,
      clientMonth,
      userName
    }
  }
}
