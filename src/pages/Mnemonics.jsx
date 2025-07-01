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
import {
  fetchMnemonicsRequest,
  createMnemonicRequest,
} from '../redux/slices/mnemonicsSlice';

const Mnemonics = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.mnemonics);
  const loading = useSelector(state => state.ui.loading);
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(fetchMnemonicsRequest());
  }, [dispatch]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name) return;
    dispatch(createMnemonicRequest({ name }));
    setName('');
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>Mnemonics</Typography>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          size="small"
          sx={{ mr: 1 }}
        />
        <Button variant="contained" type="submit" disabled={loading}>Add</Button>
      </form>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map(row => (
              <TableRow key={row.id} hover>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Mnemonics;
