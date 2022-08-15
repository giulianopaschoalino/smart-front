import React from 'react'
import { AccumulatedEconomyTitleView } from './AccumulatedEconomyTitleView'

export default function AccumulatedEconomyTitle({value}: {value: string}) {
  return <AccumulatedEconomyTitleView>Economia Acumulada:<p>R${parseFloat(value).toLocaleString('pt-br',{currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2})}</p></AccumulatedEconomyTitleView>
}
