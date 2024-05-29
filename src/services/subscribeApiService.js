import axios from 'axios';

const apiClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default {
  async subscribe(email) {
    return apiClient.post('/subscribers', { email });
  }
};