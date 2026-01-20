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

  const api = axios.create({
    // baseURL: 'https://api.smartenergia.com.br/api'
    // baseURL: 'https://api.smartenergia.klupp.com.br/api'
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://api.smartenergia.com.br/api'
        : 'http://127.0.0.1:8000/api'
  })

  api.interceptors.request.use((config) => {
    return config
  })

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
