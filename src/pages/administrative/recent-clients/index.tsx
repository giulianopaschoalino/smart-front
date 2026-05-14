import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import Header from '../../../components/header/Header'
import PageTitle from '../../../components/pageTitle/PageTitle'
import RecentClientsTable from '../../../components/administrativeTables/RecentClientsTable'
import getAPIClient from '../../../services/ssrApi'
import { ClientsView } from '../../../styles/layouts/clients/ClientsView'

type RecentClient = {
  client_id: number
  name: string
  email: string
  last_used_at: string
}

type RecentClientsPageProps = {
  userName: string
  recentClients: RecentClient[]
}

export default function RecentClientsPage({ userName, recentClients }: RecentClientsPageProps) {
  return (
    <ClientsView>
      <Head>
        <title>Smart Energia - Clientes recentes</title>
      </Head>

      <Header name={userName} admin />
      <PageTitle
        title="Clientes recentes"
        subtitle="Clientes únicos ordenados pela última utilização do app"
      />

      <section>
        <RecentClientsTable clients={recentClients} />
      </section>
    </ClientsView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-role']: role } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  if (!token || role !== '1') {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  try {
    const { data } = await apiClient.get('/clients/recent')

    return {
      props: {
        userName,
        recentClients: data.data ?? []
      }
    }
  } catch {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
}
