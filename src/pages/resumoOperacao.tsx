import React, { useEffect } from 'react';
import Header from '../components/header/Header';
import PageTitle from '../components/pageTitle/PageTitle';
import BasicButton from '../components/buttons/basicButton/BasicButton';
import Sidebar from '../components/sidebar/Sidebar';
// import { dados } from '../services/DadosTabelaResumoOperacao';
import data from '../services/dados.json'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';

import { Pagination, TableView } from '../styles/layouts/ResumoOperacao/ResumoOperacaoView';
import Head from 'next/head';

export default function ResumoOperacao() {
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
    console.log(unidade)
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

      <FormControl fullWidth >
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


      <FormControl fullWidth >

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
            {/* <td className='tg-gceh'>{data.unidades.unidade1.name}</td>
            <td className='tg-uulg'>{data.unidades.unidade1.operacao}</td>
            <td className='tg-gceh'>{data.unidades.unidade1.montante}</td>
            <td className='tg-gceh'>{data.unidades.unidade1.contraparte}</td>
            <td className='tg-uulg'>{data.unidades.unidade1.preco}</td>
            <td className='tg-gceh'>{data.unidades.unidade1.valorNF}</td> */}
          {/* <tr>
            <td className='tg-hq65'>Unidade - 9500130</td>
            <td className='tg-0tzy'>Compra</td>
            <td className='tg-hq65'>110,348</td>
            <td className='tg-hq65'>EMEWE I5</td>
            <td className='tg-0tzy'>190,16</td>
            <td className='tg-hq65'>27.978,37</td>
          </tr>
          <tr>
            <td className="tg-gceh">Unidade - 9500130</td>
            <td className="tg-uulg">Compra</td>
            <td className="tg-gceh">13,074</td>
            <td className="tg-gceh">PACTO COMERCIALIZADORA I5</td>
            <td className="tg-gceh">300,36</td>
            <td className="tg-gceh">5.235,88</td>
          </tr>
          <tr>
            <td className='tg-hq65'>Unidade - 9500130</td>
            <td className='tg-0tzy'>Compra</td>
            <td className='tg-hq65'>133,117</td>
            <td className='tg-hq65'>COPEL COM I5</td>
            <td className='tg-0tzy'>300,36</td>
            <td className='tg-hq65'>41.651,42</td>
          </tr>
          <tr>
            <td className='tg-gceh'>Unidade - 9500130</td>
            <td className='tg-uulg'>Compra</td>
            <td className='tg-gceh'>120,138</td>
            <td className='tg-gceh'>EMEWE I5</td>
            <td className='tg-uulg'>234,67</td>
            <td className='tg-gceh'>30.460,59</td>
          </tr>
          <tr>
            <td className='tg-hq65'>Unidade - 9500130</td>
            <td className='tg-0tzy'>Compra</td>
            <td className='tg-hq65'>14,897</td>
            <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
            <td className='tg-0tzy'>300,36</td>
            <td className='tg-hq65'>5.965,95</td>
          </tr> */}
        </tbody>
      </table>
      <BasicButton title='Baixar PDF' />

      <Pagination>
        <p>Mostrando 1 a 10 de 30 Entradas</p>
        <p >Anterior <span className='number'>01</span>     <span className='numberColor'>02  ..  05</span>  <span className='number'>Proxima</span> </p>
      </Pagination>
    </TableView>
  )
}
