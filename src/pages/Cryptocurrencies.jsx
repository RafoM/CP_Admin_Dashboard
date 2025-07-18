import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
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
import AddCryptoModal from '../components/modals/AddCryptoModal';
import {
  fetchCryptocurrenciesRequest,
  updateCryptocurrencyRequest,
  deleteCryptocurrencyRequest,
} from '../redux/slices/cryptocurrenciesSlice';

const Cryptocurrencies = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.cryptocurrencies);
  const loading = useSelector(state => state.ui.loading);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: '' });

  useEffect(() => {
    dispatch(fetchCryptocurrenciesRequest());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = () => {
    if (!edit) return;
    if (window.confirm('Save changes to this cryptocurrency?')) {
      dispatch(updateCryptocurrencyRequest({ id: edit.id, name: edit.name, symbol: edit.symbol }));
      setEdit(null);
      setSnack({ open: true, message: 'Cryptocurrency updated' });
    }
  };

  const handleDelete = id => {
    if (window.confirm('Delete this cryptocurrency?')) {
      dispatch(deleteCryptocurrencyRequest(id));
      setSnack({ open: true, message: 'Cryptocurrency deleted' });
    }
  };

  const startEdit = c => setEdit({ ...c });

  return (
    <>
      <Typography variant="h4" gutterBottom>Cryptocurrencies</Typography>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }} disabled={loading}>
        Add
      </Button>
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
                  <Button size="small" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCryptoModal open={open} onClose={handleClose} />

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
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.message}
      />
    </>
  );
};

export default Cryptocurrencies;
