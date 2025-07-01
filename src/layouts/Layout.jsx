import React from 'react';
import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Payments from '../pages/Payments';
import Referrals from '../pages/Referrals';
import Settings from '../pages/Settings';
import Mnemonics from '../pages/Mnemonics';
import Blockchains from '../pages/Blockchains';
import './Layout.scss';

const drawerWidth = 240;

const Layout = () => {
  return (
    <Box sx={{ display: 'flex' }} className="layout">
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/mnemonics" element={<Mnemonics />} />
          <Route path="/blockchains" element={<Blockchains />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
