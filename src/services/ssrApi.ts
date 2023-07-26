import axios from "axios";
import * as express from 'express';
import * as next from 'next';
import { parseCookies } from "nookies";

export default function getAPIClient(ctx?: Pick<next.NextPageContext, 'req'> | {
  req: next.NextApiRequest;
} | {
  req: express.Request;
} | null | undefined) {

  const { '@smartAuth-token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://api.energiasmart.com.br/api'
    // baseURL: 'https://api.energiasmart.klupp.com.br/api'
  })

  api.interceptors.request.use(config => {
      return config;
    },
  );

  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api
}
