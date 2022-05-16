import React, { useEffect, useState } from 'react'
import Image from 'next/Image'
import { useRouter } from 'next/router'

import Header from '../../components/header/Header'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { PldGraphView, PldTableView } from '../../styles/layouts/pld/PldView'

import RenderIf from '../../utils/renderIf'
import BasicButton from '../../components/buttons/basicButton/BasicButton';
import Chart from '../../components/graph/Chart';

export default function region() {
  const router = useRouter()
  const { region } = router.query

  const [page, setPage] = useState<number>(1)
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
      <RenderIf isTrue={page===1? true : false}>
        <PldTableView>
          <section className='images' >
            <Image src='/assets/logo.svg' width={150} height={150} />
            <Image src='/assets/logo.svg' width={150} height={150} />
          </section>
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
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>122,269</td>
                <td className='tg-gceh'>COPEL COM I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>110,348</td>
                <td className='tg-hq65'>EMEWE I5</td>
                <td className='tg-0tzy'>190,16</td>
              </tr>
              <tr>
                <td className="tg-gceh">Unidade - 9500130</td>
                <td className="tg-uulg">Compra</td>
                <td className="tg-gceh">13,074</td>
                <td className="tg-gceh">PACTO COMERCIALIZADORA I5</td>
                <td className="tg-gceh">300,36</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>133,117</td>
                <td className='tg-hq65'>COPEL COM I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>120,138</td>
                <td className='tg-gceh'>EMEWE I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>14,897</td>
                <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>120,138</td>
                <td className='tg-gceh'>EMEWE I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>14,897</td>
                <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>120,138</td>
                <td className='tg-gceh'>EMEWE I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>14,897</td>
                <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>120,138</td>
                <td className='tg-gceh'>EMEWE I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>14,897</td>
                <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>120,138</td>
                <td className='tg-gceh'>EMEWE I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>14,897</td>
                <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
              <tr>
                <td className='tg-gceh'>Unidade - 9500130</td>
                <td className='tg-uulg'>Compra</td>
                <td className='tg-gceh'>120,138</td>
                <td className='tg-gceh'>EMEWE I5</td>
                <td className='tg-uulg'>234,67</td>
              </tr>
              <tr>
                <td className='tg-hq65'>Unidade - 9500130</td>
                <td className='tg-0tzy'>Compra</td>
                <td className='tg-hq65'>14,897</td>
                <td className='tg-hq65'>PACTO COMERCIALIZADORA I5</td>
                <td className='tg-0tzy'>300,36</td>
              </tr>
            </tbody>
          </table>

          <section>
            <article>
              <p>Valores Diarios: </p>
              <p>R$100,00</p>
            </article>
            <article>
              <p>Valores Horários: </p>
              <p>R$100,00</p>
            </article>
          </section>
        </PldTableView>
      </RenderIf>

      <RenderIf isTrue={page===2? true : false}>
        <PldGraphView>
          <section className='images' >
            <Image src='/assets/logo.svg' width={150} height={150} />
            <Image src='/assets/logo.svg' width={150} height={150} />
          </section>
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
          <Chart title='' />
        </PldGraphView>
      </RenderIf>

      <RenderIf isTrue={page===3? true : false}>
        <PldGraphView>
          <section className='images' >
            <Image src='/assets/logo.svg' width={150} height={150} />
            <Image src='/assets/logo.svg' width={150} height={150} />
          </section>
          <section className='toolsbar'>
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" value="2015-08-09"/>
            <BasicButton title='Download (csv)' />
          </section>
          <Chart title='' />
        </PldGraphView>
      </RenderIf>

      <footer>
        <label onClick={() => page>1? setPage(page-1) : null} >voltar {page} </label>
        <label onClick={() => page<3? setPage(page+1) : null} >avançar</label>
      </footer>
    </main>
  )
}
