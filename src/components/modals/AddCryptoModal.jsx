import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { createCryptocurrencyRequest } from '../../redux/slices/cryptocurrenciesSlice';

const AddCryptoModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !symbol.trim()) {
      setShowErrors(true);
      return;
    }
    dispatch(createCryptocurrencyRequest({ name, symbol }));
    onClose();
    setSnackOpen(true);
    setName('');
    setSymbol('');
    setShowErrors(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Cryptocurrency</DialogTitle>
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
        message="Cryptocurrency created"
      />
    </>
  );
};

export default AddCryptoModal;
