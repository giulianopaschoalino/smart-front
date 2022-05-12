import React from 'react'
import { GradientButtonView } from './GradientButtonView'

interface GradientButtonInterface {
  title: string,
  description: string
  orange?: undefined | null | boolean,
  purple?: undefined | null | boolean,
  green?: undefined | null | boolean
}

export default function GradientButton({ title, description, orange, purple, green }: GradientButtonInterface) {
  return (
    <GradientButtonView color={orange? 'orange' : purple? 'purple' : green? 'green' : 'orange' } >
      <p>{title}</p>
      <p>{description}</p>
    </GradientButtonView>
  )
}
