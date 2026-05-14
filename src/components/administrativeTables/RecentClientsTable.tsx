import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

type RecentClient = {
  client_id: number
  name: string
  email: string
  last_used_at: string
}

type RecentClientsTableProps = {
  clients: RecentClient[]
}

export default function RecentClientsTable({ clients }: RecentClientsTableProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Cliente</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>E-mail</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Último acesso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <TableRow key={client.client_id} hover>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.last_used_at || 'Sem registro'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Nenhum cliente encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}