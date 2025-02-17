import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://cs.ocpp-css.com/api/v1',
});

export default apiClient;