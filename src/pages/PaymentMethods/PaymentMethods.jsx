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
import PaymentMethodTable from '../../components/Table/PaymentMethodTable';
import {
  fetchBlockchainsRequest,
} from '../../redux/slices/blockchainsSlice';
import {
  fetchCryptocurrenciesRequest,
} from '../../redux/slices/cryptocurrenciesSlice';
import { fetchPaymentMethodsRequest } from '../../redux/slices/paymentMethodsSlice';
import '../../styles/pages/payment-methods.scss';

const PaymentMethods = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);
  const blockchains = useSelector(state => state.blockchains.list);
  const cryptos = useSelector(state => state.cryptocurrencies.list);
  const methods = useSelector(state => state.paymentMethods.list);

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
      </Box>
      <PaymentMethodTable
        rows={methods}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default PaymentMethods;
