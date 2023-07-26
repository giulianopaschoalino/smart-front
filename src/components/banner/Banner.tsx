import Image from 'next/image'

import { BannerView } from './BannerView'

interface BannerInterface {
  title: string,
  subtitle: string,
  imgSource: string
}

export default function Banner({ title, subtitle, imgSource }: BannerInterface) {
  return (
    <BannerView>
      <Image src={imgSource} layout='fill' />
      <div className='gradient' />
      <div className='text'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </BannerView>
  )
}
