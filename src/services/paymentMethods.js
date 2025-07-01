import api from './api';

export const getPaymentMethods = params => api.get('/admin/payment-methods', { params });
