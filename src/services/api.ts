import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://soltech-back.onrender.com',
  //baseURL: 'http://localhost:3333'
});

export const loginClient = axios.create({
  baseURL: 'https://ocpp-css.com/api/v1', // URL diferente para login
});

export const cloudOcpp = axios.create({
  baseURL: 'https://cs.ocpp-css.com/api/v1', // URL diferente para login
});


export default apiClient;