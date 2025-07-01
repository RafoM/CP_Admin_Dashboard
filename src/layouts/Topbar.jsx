import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './Topbar.scss';

const Topbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <header className="topbar">
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Topbar;
