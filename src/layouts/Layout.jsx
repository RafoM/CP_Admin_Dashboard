import React from 'react';
import { Outlet, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Payments from '../pages/Payments';
import Referrals from '../pages/Referrals';
import Settings from '../pages/Settings';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <Topbar />
        <div className="layout__page">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
