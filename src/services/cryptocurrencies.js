import api from './api';

export const getCryptocurrencies = () => api.get('/cryptos');
export const createCryptocurrency = payload => api.post('/cryptos', payload);
export const updateCryptocurrency = ({ id, ...rest }) => api.put(`/cryptos/${id}`, rest);
export const deleteCryptocurrency = id => api.delete(`/cryptos/${id}`);
