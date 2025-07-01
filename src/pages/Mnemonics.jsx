import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddMnemonicModal from '../components/modals/AddMnemonicModal';
import {
  fetchMnemonicsRequest,
} from '../redux/slices/mnemonicsSlice';

const Mnemonics = () => {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.mnemonics);
  const loading = useSelector(state => state.ui.loading);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMnemonicsRequest());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography variant="h4" gutterBottom>Mnemonics</Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }} disabled={loading}>
        Add
      </Button>
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
      <AddMnemonicModal open={open} onClose={handleClose} />
    </>
  );
};

export default Mnemonics;
