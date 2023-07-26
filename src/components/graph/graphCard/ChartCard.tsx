import Link from 'next/link';

import { ChartCardView } from './ChartCardView';

interface ChartCardInterface {
  title: string,
  subtitle: string,
  consumption?: number,
  className?: string,
  children?: React.ReactNode
}

export default function GraphCard({ title, subtitle, consumption, className, children }: ChartCardInterface) {
  return (
    <ChartCardView className={className} >
      <div className='content' >
        <div className='header'>
          <div>
            <h2>{title}</h2>
            <span style={{display:'block'}}>{subtitle}</span>
          </div>
        </div>
        {
          consumption?
            <aside>
              <div>
                <div className='info'><p>{consumption}</p></div>
                <h4>Consumo</h4>
                <label className='statusDot' />
              </div>
              <Link href='#'>{'Visualizar >'}</Link>
            </aside>
              :
            <></>
        }
      </div>
      {children}
    </ChartCardView>
  )
}
