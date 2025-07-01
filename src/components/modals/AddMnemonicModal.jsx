import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { createMnemonicRequest } from '../../redux/slices/mnemonicsSlice';

const AddMnemonicModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.ui.loading);

  const [name, setName] = useState('');
  const [showError, setShowError] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) {
      setShowError(true);
      return;
    }
    dispatch(createMnemonicRequest({ name }));
    onClose();
    setSnackOpen(true);
    setName('');
    setShowError(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Mnemonic</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
            error={showError && !name.trim()}
            helperText={showError && !name.trim() ? 'Name is required' : ''}
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
        message="Mnemonic created"
      />
    </>
  );
};

export default AddMnemonicModal;
