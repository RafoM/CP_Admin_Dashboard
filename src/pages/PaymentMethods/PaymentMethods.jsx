import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import PaymentMethodTable from '../../components/Table/PaymentMethodTable';
import AddPaymentMethodModal from '../../components/modals/AddPaymentMethodModal';
import {
  fetchBlockchainsRequest,
} from '../../redux/slices/blockchainsSlice';
import {
  fetchCryptocurrenciesRequest,
} from '../../redux/slices/cryptocurrenciesSlice';
import {
  fetchPaymentMethodsRequest,
  updatePaymentMethodRequest,
  deletePaymentMethodRequest,
} from '../../redux/slices/paymentMethodsSlice';
import '../../styles/pages/payment-methods.scss';

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);
  const blockchains = useSelector(state => state.blockchains.list);
  const cryptos = useSelector(state => state.cryptocurrencies.list);
  const methods = useSelector(state => state.paymentMethods.list);

  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: '' });

  const [filters, setFilters] = useState({
    blockchainId: '',
    cryptoId: '',
    status: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchBlockchainsRequest());
    dispatch(fetchCryptocurrenciesRequest());
    dispatch(fetchPaymentMethodsRequest({}));
  }, [dispatch]);

  const handleChangeFilter = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    dispatch(fetchPaymentMethodsRequest(filters));
  };

  const handleReset = () => {
    setFilters({ blockchainId: '', cryptoId: '', status: '' });
    setPage(0);
    setRowsPerPage(10);
    dispatch(fetchPaymentMethodsRequest({}));
  };

  const handleChangePage = (_e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const startEdit = m =>
    setEdit({
      id: m.id,
      blockchain_id: m.blockchain?.id || m.blockchain_id,
      crypto_id: m.crypto?.id || m.crypto_id,
      status: m.status,
    });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditSave = () => {
    if (!edit) return;
    if (window.confirm('Save changes to this payment method?')) {
      dispatch(
        updatePaymentMethodRequest({
          id: edit.id,
          blockchain_id: edit.blockchain_id,
          crypto_id: edit.crypto_id,
          status: edit.status,
        })
      );
      setEdit(null);
      setSnack({ open: true, message: 'Payment method updated' });
    }
  };

  const handleDelete = id => {
    if (window.confirm('Delete this payment method?')) {
      dispatch(deletePaymentMethodRequest(id));
      setSnack({ open: true, message: 'Payment method deleted' });
    }
  };

  return (
    <div className="payment-methods">
      <Typography variant="h4" gutterBottom>
        Payment Methods
      </Typography>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
      <Box className="filters">
        <FormControl size="small">
          <InputLabel id="blockchain-label">Blockchain</InputLabel>
          <Select
            labelId="blockchain-label"
            label="Blockchain"
            name="blockchainId"
            value={filters.blockchainId}
            onChange={handleChangeFilter}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {blockchains.map(b => (
              <MenuItem key={b.id} value={b.id}>
                {b.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="crypto-label">Crypto</InputLabel>
          <Select
            labelId="crypto-label"
            label="Crypto"
            name="cryptoId"
            value={filters.cryptoId}
            onChange={handleChangeFilter}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {cryptos.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small">
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            label="Status"
            name="status"
            value={filters.status}
            onChange={handleChangeFilter}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
        <Button onClick={handleReset} disabled={loading}>
          Reset
        </Button>
        <Button variant="contained" onClick={handleOpen} disabled={loading}>
          Add
        </Button>
      </Box>
      <PaymentMethodTable
        rows={methods}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        onEdit={startEdit}
        onDelete={handleDelete}
      />
      <AddPaymentMethodModal open={open} onClose={handleClose} />
      <Dialog open={!!edit} onClose={() => setEdit(null)}>
        <DialogTitle>Edit Payment Method</DialogTitle>
        {edit && (
          <>
            <DialogContent>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="edit-blockchain-label">Blockchain</InputLabel>
                <Select
                  labelId="edit-blockchain-label"
                  label="Blockchain"
                  value={edit.blockchain_id}
                  onChange={e => setEdit({ ...edit, blockchain_id: e.target.value })}
                >
                  {blockchains.map(b => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="edit-crypto-label">Crypto</InputLabel>
                <Select
                  labelId="edit-crypto-label"
                  label="Crypto"
                  value={edit.crypto_id}
                  onChange={e => setEdit({ ...edit, crypto_id: e.target.value })}
                >
                  {cryptos.map(c => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="edit-status-label">Status</InputLabel>
                <Select
                  labelId="edit-status-label"
                  label="Status"
                  value={edit.status}
                  onChange={e => setEdit({ ...edit, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEdit(null)}>Cancel</Button>
              <Button onClick={handleEditSave} variant="contained" disabled={loading}>Save</Button>
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
    </div>
  );
};

export default PaymentMethods;
