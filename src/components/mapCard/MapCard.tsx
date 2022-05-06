import React from 'react'
import Image from 'next/image'
import { MapCardView } from './style'

interface MapCardInterface {
  title: string,
  subtitle: string,
  statistic: string,
  imgSource: string,
}

export default function MapCard({ title, subtitle, statistic, imgSource }: MapCardInterface) {

  return (
    <MapCardView>
      <Image src={imgSource} width={125} height={125} />
      <div>
        <h4>{title}</h4>
        <span>{subtitle}</span>
        <article>
          <Image src="/graphLineIcon.svg" width={20} height={20} />
          <p>{statistic}</p>
        </article>
      </div>
    </MapCardView>
  )
}
