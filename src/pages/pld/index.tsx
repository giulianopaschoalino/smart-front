import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Header from '../../components/header/Header'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { GoBack, PldGraphView, PldTableView } from '../../styles/layouts/pld/PldView'

import RenderIf from '../../utils/renderIf'
import BasicButton from '../../components/buttons/basicButton/BasicButton';
import Chart from '../../components/graph/Chart';
import PageTitle from '../../components/pageTitle/PageTitle';
import Link from 'next/link';
import LineChart from '../../components/graph/LineChart';
import { LineBarChart } from '../../components/graph/LineBarChart';
import { EconomiaAcumulada } from '../../services/economiaAcumulada';
import { EvolucaoPld } from '../../services/evolucaoPld';

export default function region() {
  const router = useRouter()
  const { region } = router.query

  const [page, setPage] = useState<string>('table')
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    console.log(page)
  }, [page])

  return (
    <main style={{
      width: '100%',
    }}>
      <Header name='' />
      <RenderIf isTrue={page==='table'? true : false}>
        <Link href='/dashboard' >{'< voltar para visão geral'}</Link>
        <PageTitle title='Tabela de consumo Pld' subtitle=''/>
        <PldTableView>
          <table className="tg">
            <thead>
              <tr>
                <th className='tg-8oo6'>Mês</th>
                <th className='tg-8oo6'>Nordeste</th>
                <th className='tg-8oo6'>Norte</th>
                <th className='tg-8oo6'>Sudeste</th>
                <th className='tg-8oo6'>Sul</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='tg-gceh'>2101</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-hq65'>2102</td>
                <td className='tg-0tzy'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-0tzy'>xxxx</td>
              </tr>
              <tr>
                <td className="tg-gceh">2103</td>
                <td className="tg-uulg">xxxx</td>
                <td className="tg-gceh">xxxx</td>
                <td className="tg-gceh">xxxx</td>
                <td className="tg-gceh">xxxx</td>
              </tr>
              <tr>
                <td className='tg-hq65'>2104</td>
                <td className='tg-0tzy'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-0tzy'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>2105</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-hq65'>2106</td>
                <td className='tg-0tzy'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-0tzy'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>2107</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-hq65'>2108</td>
                <td className='tg-0tzy'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-0tzy'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>2109</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-hq65'>2110</td>
                <td className='tg-0tzy'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-0tzy'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>2111</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-hq65'>2112</td>
                <td className='tg-0tzy'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-hq65'>xxxx</td>
                <td className='tg-0tzy'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>2021</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Mín</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Max</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Desv Pad</td>
                <td className='tg-uulg'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-gceh'>xxxx</td>
                <td className='tg-uulg'>xxxx</td>
              </tr>
            </tbody>
          </table>
          <section>
            <article onClick={() => setPage('perMouth')}>
              <p>Valores Diarios: R$100,00</p>
            </article>
            <article onClick={() => setPage('perDate')}>
              <p>Valores Horários: R$100,00</p>
            </article>
          </section>
        </PldTableView>
      </RenderIf>

      <RenderIf isTrue={page==='perMouth'? true : false}>
        <GoBack onClick={() => setPage('table')}>{'< voltar para tabela pld'}</GoBack>
        <PageTitle title='Consumo por mês' subtitle=''/>
        <PldGraphView>
          <section className='toolsbar'>
            <div className='select'>
              <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                sx={{
                  width: '100%'
                }}
              >
                <MenuItem value={0}>Filial 3</MenuItem>
                <MenuItem value={10}>Filial 3</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </div>
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2015-08-09"/>
            <BasicButton title='Download (csv)' />
          </section>
          <LineBarChart data1={EvolucaoPld.data} data3={EvolucaoPld.data1} dataset1={'line'} dataset2={'barra1'} dataset3={'2021'} label={EvolucaoPld.label} title='Evolução PLD (R$/MWh)' subtitle='' />
        </PldGraphView>
      </RenderIf>

      <RenderIf isTrue={page==='perDate'? true : false}>
        <GoBack onClick={() => setPage('table')}>{'< voltar para tabela pld'}</GoBack>
        <PldGraphView>
          <PageTitle title='Consumo por dia' subtitle=''/>
          <section className='toolsbar'>
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2021-09-19"/>
            <BasicButton title='Download (csv)' />
          </section>
          <LineChart data1={EconomiaAcumulada.data3} data2={EconomiaAcumulada.data4} data3={EconomiaAcumulada.data5} data4={EconomiaAcumulada.data6} dataset1='NORDESTE' dataset2='NORTE' dataset3='SUDESTE' dataset4='SUL' title='PLD - 19/09/21' subtitle='' label={EconomiaAcumulada.label1} />
        </PldGraphView>
      </RenderIf>
    </main>
  )
}
