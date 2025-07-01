import api from './api';

export const getCryptocurrencies = () => api.get('/cryptocurrencies');
export const createCryptocurrency = payload => api.post('/cryptocurrencies', payload);
export const updateCryptocurrency = ({ id, ...rest }) => api.put(`/cryptocurrencies/${id}`, rest);
export const deleteCryptocurrency = id => api.delete(`/cryptocurrencies/${id}`);
