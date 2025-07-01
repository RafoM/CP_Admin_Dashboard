import api from './api';

export const getBlockchains = () => api.get('/blockchains');
export const createBlockchain = payload => api.post('/blockchains', payload);
export const updateBlockchain = ({ id, ...rest }) => api.put(`/blockchains/${id}`, rest);
export const deleteBlockchain = id => api.delete(`/blockchains/${id}`);
