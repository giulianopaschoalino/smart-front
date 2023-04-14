import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import Modal from '@mui/material/Modal';

import { FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import FormData from 'form-data';
import { InputUploadView } from '../inputUploadImg/inputUploadView';

import { api } from '../../services/api';
import FaqButton1 from '../buttons/faqButton/FaqButton1';
import FaqButton2 from '../buttons/faqButton/FaqButton2';
import { StyledStatus, TableView } from './TableView';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'scroll'
};
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Data {
  clientCode: number,
  name: string,
  unity: string,
  status: string,
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: any,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: any, comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data | string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'clientCode',
    numeric: false,
    disablePadding: true,
    label: 'código do cliente',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'name',
  },
  {
    id: 'unity',
    numeric: false,
    disablePadding: false,
    label: 'unity',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'status',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ClientsTableInterface {
  clients: any,
  onChange: any
}

export default function ClientTable({ clients, onChange }: ClientsTableInterface) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data | string>('asc');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [dense, setDense] = useState<boolean>(false);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const [openSnackError, setOpenSnackError] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const [openModalInativar, setOpenModalInativar] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [units, setUnits] = useState([])

  function getClientUnits(client_id: number) {
    api.post('/units', {
      "filters": [
        { "type": "=", "field": "dados_cadastrais.cod_smart_cliente", "value": client_id }
      ],
      "fields": ["unidade"],
      "distinct": true
    }).then(res => setUnits(res.data.data)).catch(res => {
      setOpenSnackError(true)
    })

    return units
  }

  const handleCloseSnack = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackError(false);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = clients.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, code: string) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (code: any) => selected.indexOf(code.toString()) !== -1;

  useEffect(() => {
    onChange(selected)
  }, [selected])

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clients.length) : 0;

  const formData = new FormData()

  const [clientEdit, setClientEdit] = useState<any>({
    name: String,
    email: String,
    password: String,
    password_confirmation: String,
    client_id: Number
  })
  const [logo, setLogo] = useState(false)
  const [imageURLS, setImageURLs] = useState([])
  const [images, setImages] = useState([] as any)
  const [nivelAcess, setnivelAcess] = useState<any>(2);
  const [openEditUserModal, setOpenEditUserModal] = useState<any>(false);

  const [selectedClient, setSelectedClient] = useState<any>(2);

  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls: any = []
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    )
    setImageURLs(newImageUrls)
  }, [images])

  function onImageChange(e: any) {
    setImages([...e.target.files])
    setLogo(e.target.files[0])
  }

  const [openSnackSuccess, setOpenSnackSuccess] = useState<boolean>(false)

  function handleUpdateClient({
    name,
    email,
    password,
    password_confirmation,
    client_id
  }, id) {
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('password_confirmation', password_confirmation)
    formData.append('client_id', client_id)
    formData.append('profile_picture', logo)
    formData.append('role', nivelAcess)

    api.put(`/user/${id}`, formData)
      .then((res) => {
        setOpenSnackSuccess(true)
        setOpenModalInativar(false)
        // window.location.reload()
      })
      .catch((res) => {
        setOpenSnackError(true)
      })
  }

  return (
    <TableView>
      <Snackbar open={openSnackError} autoHideDuration={4000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
          Não foi possivel encontrar unidades do client!
        </Alert>
      </Snackbar>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={clients.length}
            />
            <TableBody>
              {stableSort(clients, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id.toString())}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        Client - {row.client_id}
                      </TableCell>
                      <TableCell align="left" style={{ cursor: 'pointer' }} onClick={() => {
                        setOpenEditUserModal(true)
                        setSelectedClient(row)
                        setClientEdit(row)
                      }}>{row.name}</TableCell>
                      <TableCell align="left" style={{ cursor: 'pointer' }} onClick={() => {
                        setOpen(true)
                        getClientUnits(row.client_id)
                        setSelectedClient(row)
                      }}>clique aqui para ver as unidades</TableCell>
                      <TableCell align="left"><StyledStatus status={row.deleted_at ? 'inativo' : 'ativo'}> {row.deleted_at ? 'inativo' : 'ativo'}</StyledStatus></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={openEditUserModal}
        onClose={() => setOpenEditUserModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>Editar Cliente - {selectedClient.name}</h1>
          <Typography
            sx={{ color: 'gray', fontSize: 12 }}
            variant="h5"
            gutterBottom
            component="div"
          >
            Adicionar Cliente Smart Energia
          </Typography>
          <br />
          <TextField
            id="outlined-basic"
            label="Nome"
            sx={{ width: 350, ml: 5 }}
            onChange={(value) => {
              setClientEdit({
                ...clientEdit,
                name: value.target.value
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="E-mail/Usuário"
            value={clientEdit.email}
            sx={{ width: 350, ml: 8 }}
            onChange={(value) => {
              setClientEdit({
                ...clientEdit,
                email: value.target.value.toLowerCase()
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Senha"
            sx={{ width: 350, ml: 5, mt: 2 }}
            onChange={(value) => {
              setClientEdit({
                ...clientEdit,
                password: value.target.value
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Confirma Senha"
            sx={{ width: 350, ml: 8, mt: 2 }}
            onChange={(value) => {
              setClientEdit({
                ...clientEdit,
                password_confirmation: value.target.value
              })
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-basic"
            label="Codigo do Cliente Smart Energia"
            sx={{ width: 350, ml: 5, mt: 2 }}
            onChange={(value) => {
              setClientEdit({
                ...clientEdit,
                client_id: value.target.value
              })
            }}
            variant="outlined"
          />
          <InputUploadView>
            <div className="imgContainer">
              <article>
                {imageURLS.map((imageSrc, index) => {
                  return <Image
                    src={imageSrc}
                    key={index}
                    width={30}
                    height={30}
                    className="image"
                  />
                })}
              </article>
            </div>
            <div className="update">
              <form action="">
                <div>
                  <label htmlFor="arquivo">
                    {' '}
                    <p className="TitleButton"> Enviar foto de Perfil </p>{' '}
                  </label>
                  <input
                    type="file"
                    name="arquivo"
                    id="arquivo"
                    onChange={onImageChange}
                  />
                </div>
              </form>
            </div>
          </InputUploadView>

          <div className='select'>

            <FormControl sx={{ width: 350, ml: 5, mt: 2 }}>
              <InputLabel id="demo-select-small">Nivel de acesso</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={nivelAcess}
                label="Unidade"
                onChange={value => setnivelAcess(value.target.value)}
                fullWidth
              >
                <MenuItem value={1}>Administrador</MenuItem>
                <MenuItem value={2}>Cliente</MenuItem>

              </Select>
            </FormControl>
          </div>

          <FaqButton1 title="Cancelar" onClick={() => setOpenEditUserModal(false)} />
          <FaqButton2
            title="Salvar"
            onClick={() => handleUpdateClient(clientEdit, selectedClient.id)}
          />
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            units.map((units, index) => {
              return <>
                <li style={{
                  listStyle: 'none'
                }} key={index}>{units.unidade}</li>
                <hr />
              </>
            })
          }
        </Box>
      </Modal>
    </TableView>
  );
}
