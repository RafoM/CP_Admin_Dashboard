import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../contexts/ThemeContext';

const Topbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { dark, toggle } = useContext(ThemeContext);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <IconButton color="inherit" onClick={toggle} sx={{ mr: 2 }}>
          {dark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout} data-testid="logout">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
