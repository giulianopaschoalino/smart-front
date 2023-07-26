import { FaqButtonView1 } from './FaqButtonView1'

interface FaqButtonInterface {
  title: string
  onClick: () => void
}

export default function FaqButton1({title, onClick}: FaqButtonInterface) {
  return (
    <FaqButtonView1 onClick={() => onClick()}>{title}</FaqButtonView1>
  )
}
