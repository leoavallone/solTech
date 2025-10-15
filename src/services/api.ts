import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://soltech-back.onrender.com',
});

export const loginClient = axios.create({
  baseURL: 'https://ocpp-css.com/api/v1', // URL diferente para login
});

export default apiClient;