import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { useState, useMemo } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

type RecentClient = {
  client_id: number
  name: string
  email: string
  last_used_at: string
}

type RecentClientsTableProps = {
  clients: RecentClient[]
}

function parseDateDMY(value?: string) {
  if (!value) return null
  // expected format: dd/mm/YYYY HH:ii:ss
  const [datePart, timePart] = value.split(' ')
  if (!datePart) return null
  const [d, m, y] = datePart.split('/').map((s) => parseInt(s, 10))
  if (!d || !m || !y) return null
  let hours = 0
  let minutes = 0
  let seconds = 0
  if (timePart) {
    const parts = timePart.split(':').map((s) => parseInt(s, 10))
    hours = parts[0] || 0
    minutes = parts[1] || 0
    seconds = parts[2] || 0
  }
  return new Date(y, m - 1, d, hours, minutes, seconds)
}

type Order = 'asc' | 'desc'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const av = (a as any)[orderBy]
  const bv = (b as any)[orderBy]

  if (orderBy === 'last_used_at') {
    const da = parseDateDMY(av as unknown as string)
    const db = parseDateDMY(bv as unknown as string)
    if (!da && !db) return 0
    if (!da) return 1
    if (!db) return -1
    return db.getTime() - da.getTime()
  }

  if (bv < av) {
    return -1
  }
  if (bv > av) {
    return 1
  }
  return 0
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: any
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

export default function RecentClientsTable({ clients }: RecentClientsTableProps) {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<string>('name')
  const [search, setSearch] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  // Filter clients by search (name or email) and by date range (based on last_used_at)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return clients.filter((c) => {
      if (term) {
        const inName = c.name?.toLowerCase().includes(term)
        const inEmail = c.email?.toLowerCase().includes(term)
        if (!inName && !inEmail) return false
      }

      if (fromDate || toDate) {
        const d = parseDateDMY(c.last_used_at)
        if (!d) return false
        if (fromDate) {
          const from = new Date(fromDate + 'T00:00:00')
          if (d < from) return false
        }
        if (toDate) {
          const to = new Date(toDate + 'T23:59:59')
          if (d > to) return false
        }
      }

      return true
    })
  }, [clients, search, fromDate, toDate])

  const sorted = stableSort(filtered, getComparator(order, orderBy as any))

  function exportCsv(rows: RecentClient[]) {
    if (!rows || rows.length === 0) return
    const headers = ['Cliente', 'E-mail', 'Último acesso']
    const csvRows = [headers.join(',')]
    for (const r of rows) {
      const cols = [r.name ?? '', r.email ?? '', r.last_used_at ?? '']
      const escaped = cols.map((c) => `"${String(c).replace(/"/g, '""')}"`)
      csvRows.push(escaped.join(','))
    }
    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const stamp = new Date().toISOString().slice(0,10)
    a.href = url
    a.download = `recent-clients-${stamp}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            label="Pesquisar nome ou e-mail"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 240 }}
          />
          <TextField
            label="Data início"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
          <TextField
            label="Data fim"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
          <Button onClick={() => { setSearch(''); setFromDate(''); setToDate('') }} size="small">
            Limpar
          </Button>
          <Button
            startIcon={<FileDownloadIcon />}
            onClick={() => exportCsv(filtered)}
            variant="outlined"
            size="small"
          >
            Exportar CSV
          </Button>
        </Stack>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={orderBy === 'name' ? order : false}>
              <TableSortLabel
                active={orderBy === 'name'}
                direction={orderBy === 'name' ? order : 'asc'}
                onClick={() => handleRequestSort('name')}
              >
                Cliente
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'email' ? order : false}>
              <TableSortLabel
                active={orderBy === 'email'}
                direction={orderBy === 'email' ? order : 'asc'}
                onClick={() => handleRequestSort('email')}
              >
                E-mail
              </TableSortLabel>
            </TableCell>
            <TableCell sortDirection={orderBy === 'last_used_at' ? order : false}>
              <TableSortLabel
                active={orderBy === 'last_used_at'}
                direction={orderBy === 'last_used_at' ? order : 'asc'}
                onClick={() => handleRequestSort('last_used_at')}
              >
                Último acesso
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.length > 0 ? (
            sorted.map((client) => (
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