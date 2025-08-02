// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = 'http://localhost:3300/api/v1/auth';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});



export const login = async (email: string, password: string) => {
  const response = await api.post(`/login`, { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post(`/register`, { email, password });
  return response.data;
};
export const logout = async () => {
  const response = await api.post(`/logout`);
  return response.data;
};

export const getcsrfToken = async() => {
    const res = await api.get('/csrf-token');
    axios.defaults.headers.common["X-CSRF-Token"] = res.data.csrfToken;
}