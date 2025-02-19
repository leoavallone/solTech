import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cs.ocpp-css.com/api/v1',
});

export const loginClient = axios.create({
  baseURL: 'https://cloud.ocpp-css.com', // URL diferente para login
});

export default apiClient;