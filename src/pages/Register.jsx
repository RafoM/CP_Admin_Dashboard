import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../redux/slices/authSlice';
import BasicForm from '../components/BasicForm';

const Register = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(registerRequest({ email, password }));
  };

  return (
    <div className="auth-page">
      <h1>Register</h1>
      <BasicForm onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </BasicForm>
    </div>
  );
};

export default Register;
