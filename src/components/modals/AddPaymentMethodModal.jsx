import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { createPaymentMethodRequest } from '../../redux/slices/paymentMethodsSlice';

const AddPaymentMethodModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);
  const blockchains = useSelector(state => state.blockchains.list);
  const cryptos = useSelector(state => state.cryptocurrencies.list);

  const [blockchainId, setBlockchainId] = useState('');
  const [cryptoId, setCryptoId] = useState('');
  const [status, setStatus] = useState('active');
  const [showErrors, setShowErrors] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!blockchainId || !cryptoId) {
      setShowErrors(true);
      return;
    }
    dispatch(
      createPaymentMethodRequest({
        blockchain_id: Number(blockchainId),
        crypto_id: Number(cryptoId),
        status,
      })
    );
    onClose();
    setSnackOpen(true);
    setBlockchainId('');
    setCryptoId('');
    setStatus('active');
    setShowErrors(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Payment Method</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense" error={showErrors && !blockchainId}>
            <InputLabel id="add-blockchain-label">Blockchain</InputLabel>
            <Select
              labelId="add-blockchain-label"
              label="Blockchain"
              value={blockchainId}
              onChange={e => setBlockchainId(e.target.value)}
            >
              {blockchains.map(b => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" error={showErrors && !cryptoId}>
            <InputLabel id="add-crypto-label">Crypto</InputLabel>
            <Select
              labelId="add-crypto-label"
              label="Crypto"
              value={cryptoId}
              onChange={e => setCryptoId(e.target.value)}
            >
              {cryptos.map(c => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="add-status-label">Status</InputLabel>
            <Select
              labelId="add-status-label"
              label="Status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message="Payment method created"
      />
    </>
  );
};

export default AddPaymentMethodModal;

