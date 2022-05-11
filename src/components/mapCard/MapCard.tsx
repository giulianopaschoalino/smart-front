import React from 'react'
import Image from 'next/image'
import { MapCardView } from './style'

interface MapCardInterface {
  title: string,
  subtitle: string,
  statistic?: string,
  imgSource: string,
}

export default function MapCard({ title, subtitle, statistic, imgSource }: MapCardInterface) {

  return (
    <MapCardView>
      <Image src={imgSource} width={110} height={110} />
      <div>
        <h4>{title}</h4>
        <span>{subtitle}</span>
        <article>
          {
            statistic?
              <>
                <Image src="/graphLineIcon.svg" width={20} height={20} />
                <p>{statistic}</p>
              </>
              :
              null
          }
        </article>
      </div>
    </MapCardView>
  )
}
