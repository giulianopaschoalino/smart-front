import React from 'react'
import { PageTitleView } from './PageTitleView'

interface PageTitleInterface {
  title: string,
  subtitle: string
}

export default function PageTitle({ title, subtitle }: PageTitleInterface) {
  return (
    <PageTitleView>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </PageTitleView>
  )
}
