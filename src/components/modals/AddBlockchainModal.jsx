import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { createBlockchainRequest } from '../../redux/slices/blockchainsSlice';

const AddBlockchainModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [walletSupported, setWalletSupported] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !symbol.trim()) {
      setShowErrors(true);
      return;
    }
    dispatch(
      createBlockchainRequest({
        name,
        symbol,
        wallet_generation_supported: walletSupported,
      }),
    );
    onClose();
    setSnackOpen(true);
    setName('');
    setSymbol('');
    setWalletSupported(false);
    setShowErrors(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Blockchain</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            error={showErrors && !name.trim()}
            helperText={showErrors && !name.trim() ? 'Name is required' : ''}
          />
          <TextField
            margin="dense"
            label="Symbol"
            fullWidth
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            error={showErrors && !symbol.trim()}
            helperText={showErrors && !symbol.trim() ? 'Symbol is required' : ''}
          />
          <Select
            value={walletSupported}
            onChange={e => setWalletSupported(e.target.value === 'true')}
            fullWidth
            margin="dense"
          >
            <MenuItem value={false}>Wallet Generation Disabled</MenuItem>
            <MenuItem value={true}>Wallet Generation Enabled</MenuItem>
          </Select>
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
        message="Blockchain created"
      />
    </>
  );
};

export default AddBlockchainModal;
