import api from './api';

export const getPaymentMethods = params =>
  api.get('/admin/payment-methods', { params });

export const createPaymentMethod = payload =>
  api.post('/payment-methods', payload);

export const updatePaymentMethod = ({ id, ...rest }) =>
  api.put(`/payment-methods/${id}`, rest);

export const deletePaymentMethod = id =>
  api.delete(`/payment-methods/${id}`);
