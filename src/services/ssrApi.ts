import axios from 'axios'
import * as express from 'express'
import * as next from 'next'
import { parseCookies } from 'nookies'

export default function getAPIClient(
  ctx?:
    | Pick<next.NextPageContext, 'req'>
    | {
        req: next.NextApiRequest
      }
    | {
        req: express.Request
      }
    | null
    | undefined
) {
  const { '@smartAuth-token': token } = parseCookies(ctx)
  const requestHost =
    ctx && 'req' in ctx ? ctx.req.headers.host : typeof window !== 'undefined' ? window.location.host : ''

  const apiBaseUrl = requestHost?.includes('app.dev.smartenergia.com.br')
    ? process.env.NEXT_PUBLIC_API_URL_DEV ?? 'https://app.dev.smartenergia.com.br/api'
    : process.env.NEXT_PUBLIC_API_URL_PROD ?? 'https://app.smartenergia.com.br/api'

  const api = axios.create({
    baseURL: apiBaseUrl
  })

  api.interceptors.request.use((config) => {
    return config
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
