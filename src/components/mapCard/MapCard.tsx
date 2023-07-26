
import Image from 'next/image'
import { MapCardView } from './MapCardView'

interface MapCardInterface {
  title: string,
  subtitle: string,
  statistic?: string,
  imgSource: string,
  date?: string
}

export default function MapCard({ title, subtitle, statistic, imgSource, date }: MapCardInterface) {
  const route = title==='R$/MWh'? '/consumption': `pld/${title.slice(0,2).toLocaleLowerCase()}-${title.slice(3,5).toLocaleLowerCase()}`

  return (
      <MapCardView statistic={statistic} >
        <Image src={subtitle==='SUL'? '/SUL.svg' : subtitle==='NORTE'? '/norte.svg' : subtitle==='NORDESTE'? '/nordeste.svg' : subtitle==='SUDESTE'? '/mapSample.svg' : imgSource} width={90} height={90}/>
        <div>
          <h4>{
            subtitle==='SUL'? 'S' : subtitle==='NORTE'? 'N' : subtitle==='NORDESTE'? 'NE' : subtitle==='SUDESTE'? 'SE/CO' : title
          }</h4>
          <span className='footer' >{subtitle}</span>
          {
            date?
              <span>{date}</span> :
              null
          }
          <article>
            {
              statistic?
                <>
                  <Image src="/graphLineIcon.svg" width={14} height={14} />
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
