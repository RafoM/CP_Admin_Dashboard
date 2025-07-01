import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {
  fetchCryptocurrenciesRequest,
  createCryptocurrencyRequest,
  updateCryptocurrencyRequest,
  deleteCryptocurrencyRequest,
} from '../redux/slices/cryptocurrenciesSlice';

const Cryptocurrencies = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.cryptocurrencies);
  const loading = useSelector(state => state.ui.loading);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchCryptocurrenciesRequest());
  }, [dispatch]);

  const handleCreate = e => {
    e.preventDefault();
    dispatch(createCryptocurrencyRequest({ name, symbol }));
    setName('');
    setSymbol('');
  };

  const handleUpdate = () => {
    if (!edit) return;
    dispatch(updateCryptocurrencyRequest({ id: edit.id, name: edit.name, symbol: edit.symbol }));
    setEdit(null);
  };

  const startEdit = c => setEdit({ ...c });

  return (
    <>
      <Typography variant="h4" gutterBottom>Cryptocurrencies</Typography>
      <form onSubmit={handleCreate} style={{ marginBottom: '1rem' }}>
        <TextField label="Name" value={name} onChange={e => setName(e.target.value)} size="small" sx={{ mr: 1 }} />
        <TextField label="Symbol" value={symbol} onChange={e => setSymbol(e.target.value)} size="small" sx={{ mr: 1 }} />
        <Button variant="contained" type="submit" disabled={loading}>Add</Button>
      </form>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>
                  <Button size="small" onClick={() => startEdit(row)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => dispatch(deleteCryptocurrencyRequest(row.id))}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!edit} onClose={() => setEdit(null)}>
        <DialogTitle>Edit Cryptocurrency</DialogTitle>
        {edit && (
          <>
            <DialogContent>
              <TextField
                label="Name"
                value={edit.name}
                onChange={e => setEdit({ ...edit, name: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Symbol"
                value={edit.symbol}
                onChange={e => setEdit({ ...edit, symbol: e.target.value })}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEdit(null)}>Cancel</Button>
              <Button onClick={handleUpdate} variant="contained" disabled={loading}>Save</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Cryptocurrencies;
