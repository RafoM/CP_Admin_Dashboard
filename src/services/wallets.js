import api from './api';

export const getWallets = () => api.get('/wallets');

export const generateWallets = payload => api.post('/generate-wallets', payload);
