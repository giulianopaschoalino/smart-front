import React from 'react'
import BasicButton from '../src/components/buttons/basicButton/BasicButton'
import GradientButton from '../src/components/buttons/gradientButton/GradientButton'
import Graph from '../src/components/graph/Chart'

export default function areaTest() {
  return (
    <>
      <Graph title='Indicador de custo' />
      <GradientButton title='GRÁFICO' description='Gerar gráficos com os dados selecionados' orange />
    </>
  )
}
