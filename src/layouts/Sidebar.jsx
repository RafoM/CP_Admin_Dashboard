import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => (
  <aside className="sidebar">
    <h2 className="sidebar__title">Admin</h2>
    <nav>
      <ul>
        <li><NavLink to="/" end>Dashboard</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
        <li><NavLink to="/payments">Payments</NavLink></li>
        <li><NavLink to="/referrals">Referrals</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
