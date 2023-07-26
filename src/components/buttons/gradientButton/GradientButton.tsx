import { Router } from 'next/router'
import { GradientButtonView } from './GradientButtonView'
import { useRouter } from 'next/router'


interface GradientButtonInterface {
  title: string,
  description: string
  orange?: undefined | null | boolean,
  purple?: undefined | null | boolean,
  green?: undefined | null | boolean,
  link?: any,
  onClick?: () => void
}

export default function GradientButton({ title, description, orange, purple, green, onClick }: GradientButtonInterface) {
  function handleClick() {
    onClick()
  }

  return (
    <GradientButtonView color={orange? 'orange' : purple? 'purple' : green? 'green' : 'orange'} onClick={() => handleClick()}>
      <p></p>
      <p>{description}</p>
    </GradientButtonView>
  )
}
