import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

import Header from '../../components/header/Header'
import PageTitle from '../../components/pageTitle/PageTitle'
import RecentClientsTable from '../../components/administrativeTables/RecentClientsTable'
import NotificationsTable from '../../components/administrativeTables/NotificationsTable'
import getAPIClient from '../../services/ssrApi'
import { ClientsView } from '../../styles/layouts/clients/ClientsView'

export default function ManagersPage({ userName, recentClients, notifications }: any) {
  return (
    <ClientsView>
      <Head>
        <title>Smart Energia - Gerentes de Clientes</title>
      </Head>

      <Header name={userName} admin />
      <PageTitle title="Painel de Gerente" subtitle="Visualização limitada: clientes recentes e notificações" />

      <section>
        <RecentClientsTable clients={recentClients} />
      </section>

      {/* <section style={{ marginTop: 24 }}>
        <NotificationsTable notifications={notifications} onChange={() => {}} />
      </section> */}
    </ClientsView>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { ['@smartAuth-token']: token } = parseCookies(ctx)
  const { ['user-name']: userName } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  let recentClients = []
  let notifications = []

  try {
    const rc = await apiClient.get('/clients/recent')
    recentClients = rc.data.data ?? []
  } catch (err) {
    recentClients = []
  }

  try {
    const n = await apiClient.get('/notification')
    notifications = n.data.data ?? []
  } catch (err) {
    notifications = []
  }

  return {
    props: {
      userName,
      recentClients,
      notifications,
    }
  }
}
