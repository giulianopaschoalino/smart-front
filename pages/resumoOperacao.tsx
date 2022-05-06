import React from 'react';
import Sidebar from '../src/components/sidebar/Sidebar';

import { TableView} from  '../styles/layouts/ResumoOperacao/ResumoOperacaoView';



export default function ResumoOperacao() {
  return(


    <TableView>
      <Sidebar />
      <h1>Resumo de Operaçoes</h1>
      <h2>Operações detalhadas</h2>
      <h3>Seletor Mês</h3>
      <table className='tg' >
        <colgroup>
          <col style={{width: "106px"}}/>
          <col style={{width: "16px"}}/>
          <col style={{width: "119px"}}/>
          <col style={{width: "334px"}}/>
          <col style={{width: "111px"}}/>
          <col style={{width: "146px"}}/>
        </colgroup>

        <thead>
          <tr>
            <th className='tg-baqh'>Unidade</th>
            <th className='tg-baqh'>Operação</th>
            <th className='tg-baqh'>Montante(MWh)</th>
            <th className='tg-baqh'>Contraparte</th>
            <th className='tg-baqh'>Preço(R$/MWh)</th>
            <th className='tg-0lax'>Valor NF/Crédito (R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='tg-womg'>Unidade-19888</td>
            <td className='tg-womg'>comprar</td>
            <td className='tg-womg'>122.269</td>
            <td className='tg-womg'>COPEL COM I5</td>
            <td className='tg-womg'>234,67</td>
            <td className='tg-womg'>38.257,15</td>
          </tr>
          <tr>
            <th className='tg-baqh'>Unidade-19888</th>
            <th className='tg-baqh'>Comprar</th>
            <th className='tg-baqh'>122.269</th>
            <th className='tg-baqh'>PACTO COMERCIALIZADORA I5</th>
            <th className='tg-baqh'>234,67</th>
            <th className='tg-baqh'>38.257,15</th>
          </tr>

          <tr>
            <td className='tg-womg'>Unidade-19888</td>
            <td className='tg-womg'>Comprar</td>
            <td className='tg-womg'>122.269</td>
            <td className='tg-womg'>PACTO COMERCIALIZADORA I5</td>
            <td className='tg-womg'>234,67</td>
            <td className='tg-womg'>38.257,15</td>
          </tr>

          <tr>
            <td className='tg-baqh'>Unidade-19888</td>
            <td className='tg-baqh'>Comprar</td>
            <td className='tg-baqh'>122.269</td>
            <td className='tg-baqh'>PACTO COMERCIALIZADORA I5</td>
            <td className='tg-baqh'>234,67</td>
            <td className='tg-baqh'>38.257,15</td>
          </tr>

          <tr>
            <td className='tg-womg'>Unidade-19888</td>
            <td className='tg-womg'>Comprar</td>
            <td className='tg-womg'>122.269</td>
            <td className='tg-womg'>PACTO COMERCIALIZADORA I5</td>
            <td className='tg-womg'>234,67</td>
            <td className='tg-womg'>38.257,15</td>
          </tr>


        </tbody>


        </table >

    </TableView>

  )
}
