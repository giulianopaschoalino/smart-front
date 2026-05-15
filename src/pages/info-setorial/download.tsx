import axios from 'axios'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import getAPIClient from '../../services/ssrApi'

export default function InfoSetorialDownload() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@smartAuth-token']: token } = parseCookies(ctx)

  if (!token || !ctx.res) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  try {
    const apiClient = getAPIClient(ctx)
    const { data } = await apiClient.get('/download')
    const pdfUrl = data?.data

    if (!pdfUrl) {
      return {
        redirect: {
          destination: '/info-setorial',
          permanent: false
        }
      }
    }

    const pdfResponse = await axios.get(pdfUrl, { responseType: 'stream' })

    ctx.res.setHeader('Content-Type', pdfResponse.headers['content-type'] || 'application/pdf')
    ctx.res.setHeader('Content-Disposition', 'inline; filename="informativo-setorial.pdf"')
    ctx.res.setHeader('Cache-Control', 'no-store')

    pdfResponse.data.pipe(ctx.res)

    return {
      props: {}
    }
  } catch {
    return {
      redirect: {
        destination: '/info-setorial',
        permanent: false
      }
    }
  }
}