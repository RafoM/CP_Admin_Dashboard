import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../redux/slices/authSlice';
import BasicForm from '../components/BasicForm';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <BasicForm onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </BasicForm>
    </div>
  );
};

export default Login;
