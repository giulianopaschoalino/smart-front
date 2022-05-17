import React from 'react'
import { ChartTitleView } from './ChartView'

interface ChartTitleInterface{
  title: string,
  subtitle: string,
}

export default function ChartTitle({ title, subtitle }: ChartTitleInterface) {
  return (
    <ChartTitleView>
      <h3>{title}</h3>
      <p>{subtitle}</p>
    </ChartTitleView>
  )
}
