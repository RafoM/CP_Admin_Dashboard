import api from './api';

export const getMnemonics = () => api.get('/mnemonics');
export const createMnemonic = payload => api.post('/mnemonics', payload);
