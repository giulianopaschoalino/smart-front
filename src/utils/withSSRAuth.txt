// import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
// import { parseCookies } from 'nookies'
// import getAPIClient from '../services/ssrApi'
// import { getHomeRouteByRole } from './accessRoutes'

// export function withSSRAuth<P extends { [key: string]: any } = { [key: string]: any }>(
//   gssp: GetServerSideProps<P>
// ): GetServerSideProps<P> {
//   return async (ctx: GetServerSidePropsContext) => {
//     const cookies = parseCookies(ctx)
//     const token = cookies['@smartAuth-token']

//     if (!token) {
//       return {
//         redirect: {
//           destination: '/',
//           permanent: false
//         }
//       }
//     }

//     // verify token server-side to catch invalid/expired tokens
//     try {
//       const api = getAPIClient(ctx)
//       await api.get('/user')
//     } catch (err: any) {
//       const status = err?.response?.status
//       // if unauthorized or forbidden, redirect based on role cookie when available
//       if (status === 401 || status === 403) {
//         const role = cookies['user-role']
//         const destination = role ? getHomeRouteByRole(Number(role)) : '/'
//         return {
//           redirect: {
//             destination,
//             permanent: false
//           }
//         }
//       }

//       // other errors: still proceed to original GSSP to allow pages to handle gracefully
//     }

//     return await gssp(ctx)
//   }
// }

// export default withSSRAuth

// export function withSSRGuest<P extends { [key: string]: any } = { [key: string]: any }>(
//   gssp: GetServerSideProps<P>
// ): GetServerSideProps<P> {
//   return async (ctx: GetServerSidePropsContext) => {
//     const cookies = parseCookies(ctx)
//     const token = cookies['@smartAuth-token']

//     if (token) {
//       // already authenticated, redirect to home
//       const role = cookies['user-role']
//       const destination = role ? getHomeRouteByRole(Number(role)) : '/'
//       return {
//         redirect: {
//           destination,
//           permanent: false
//         }
//       }
//     }

//     return await gssp(ctx)
//   }
// }
