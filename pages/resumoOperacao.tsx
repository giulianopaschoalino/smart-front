import React from 'react';
import BasicButton from '../src/components/buttons/basicButton/BasicButton';
import Sidebar from '../src/components/sidebar/Sidebar';

import { TableView } from '../styles/layouts/ResumoOperacao/ResumoOperacaoView';

export default function ResumoOperacao() {
  return(
    <TableView>
      <Header name='' />
      <PageTitle title='Resumo de Operaçoes' subtitle='Operações detalhadas' />

      <h3>Seletor Mês</h3>
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
  <tr>
    <td className='tg-gceh'>Unidade - 9500130</td>
    <td className='tg-uulg'>Compra</td>
    <td className='tg-gceh'>122,269</td>
    <td className='tg-gceh'>COPEL COM I5</td>
    <td className='tg-uulg'>234,67</td>
    <td className='tg-gceh'>38.257,15</td>
  </tr>
  <tr>
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
  </tr>
</tbody>
</table>

<BasicButton title='Enviar PDF' />
<p>Mostando de 1 a 10 de 30 Entradas</p>

    </TableView>


  )
}
