import React from 'react'
import { AccumulatedEconomyTitleView } from './AccumulatedEconomyTitleView'

export default function AccumulatedEconomyTitle({value}: {value: string}) {
  return <AccumulatedEconomyTitleView>Economia Acumulada:<p>R${value}</p></AccumulatedEconomyTitleView>
}
