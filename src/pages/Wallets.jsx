import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddWalletModal from '../components/modals/AddWalletModal';
import { fetchWalletsRequest } from '../redux/slices/walletsSlice';

const Wallets = () => {
  const dispatch = useDispatch();
  const walletsState = useSelector(state => state.wallets);
  const { list = [], error } = walletsState || {};
  const wallets = Array.isArray(list) ? list : [];
  const loading = useSelector(state => state.ui.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchWalletsRequest());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography variant="h4" gutterBottom>Wallets</Typography>
      {loading && <LinearProgress sx={{ mb: 2 }} />}
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }} disabled={loading}>
        Add Wallet
      </Button>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Mnemonic ID</TableCell>
              <TableCell>Wallet Index</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Blockchain</TableCell>
              <TableCell>Crypto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wallets.map(wallet => (
              <TableRow key={`${wallet.id}-${wallet.wallet_index}`} hover>
                <TableCell>{wallet.id}</TableCell>
                <TableCell>{wallet.mnemonic_id}</TableCell>
                <TableCell>{wallet.wallet_index}</TableCell>
                <TableCell>{wallet.address}</TableCell>
                <TableCell>{wallet.blockchain}</TableCell>
                <TableCell>{wallet.crypto}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddWalletModal open={open} onClose={handleClose} />
    </>
  );
};

export default Wallets;
