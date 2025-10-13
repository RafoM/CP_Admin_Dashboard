import React from 'react';
import { NavLink } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import './Sidebar.scss';

const drawerWidth = 240;

const navItems = [
  { to: '/', label: 'Dashboard', icon: <DashboardIcon />, end: true },
  { to: '/users', label: 'Users', icon: <PeopleIcon /> },
  { to: '/payments', label: 'Payments', icon: <PaymentIcon /> },
  { to: '/referrals', label: 'Referrals', icon: <ShareIcon /> },
  { to: '/settings', label: 'Settings', icon: <SettingsIcon /> },
  { to: '/mnemonics', label: 'Mnemonics', icon: <DashboardIcon /> },
  { to: '/blockchains', label: 'Blockchains', icon: <PaymentIcon /> },
  { to: '/cryptocurrencies', label: 'Cryptocurrencies', icon: <CurrencyBitcoinIcon /> },
  { to: '/payment-methods', label: 'Payment Methods', icon: <PaymentIcon /> },
  { to: '/wallets', label: 'Wallets', icon: <AccountBalanceWalletIcon /> },
];

const Sidebar = () => (
  <Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Admin
      </Typography>
    </Toolbar>
    <List>
      {navItems.map(({ to, label, icon, end }) => (
        <ListItemButton
          key={label}
          component={NavLink}
          to={to}
          end={end}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
        </ListItemButton>
      ))}
    </List>
  </Drawer>
);

export default Sidebar;
