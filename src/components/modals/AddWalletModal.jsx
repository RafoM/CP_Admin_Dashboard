import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { createWalletsRequest } from '../../redux/slices/walletsSlice';

const AddWalletModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);

  const [blockchain, setBlockchain] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [name, setName] = useState('');
  const [count, setCount] = useState('');
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [showErrors, setShowErrors] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const resetForm = () => {
    setBlockchain('');
    setMnemonic('');
    setName('');
    setCount('');
    setPaymentMethodId('');
    setShowErrors(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!blockchain.trim() || !mnemonic.trim() || !name.trim() || !count || !paymentMethodId.trim()) {
      setShowErrors(true);
      return;
    }

    dispatch(
      createWalletsRequest({
        blockchain,
        mnemonic,
        name,
        count: Number(count),
        paymentMethodId,
      }),
    );
    onClose();
    setSnackOpen(true);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Wallets</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Blockchain"
            fullWidth
            value={blockchain}
            onChange={e => setBlockchain(e.target.value)}
            error={showErrors && !blockchain.trim()}
            helperText={showErrors && !blockchain.trim() ? 'Blockchain is required' : ''}
          />
          <TextField
            margin="dense"
            label="Mnemonic"
            fullWidth
            value={mnemonic}
            onChange={e => setMnemonic(e.target.value)}
            error={showErrors && !mnemonic.trim()}
            helperText={showErrors && !mnemonic.trim() ? 'Mnemonic is required' : ''}
          />
          <TextField
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
            label="Count"
            type="number"
            fullWidth
            value={count}
            onChange={e => setCount(e.target.value)}
            error={showErrors && !count}
            helperText={showErrors && !count ? 'Count is required' : ''}
          />
          <TextField
            margin="dense"
            label="Payment Method ID"
            fullWidth
            value={paymentMethodId}
            onChange={e => setPaymentMethodId(e.target.value)}
            error={showErrors && !paymentMethodId.trim()}
            helperText={showErrors && !paymentMethodId.trim() ? 'Payment Method ID is required' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={loading}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        message="Wallet creation requested"
      />
    </>
  );
};

export default AddWalletModal;
