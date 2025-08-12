// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = '/api/v1/auth';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});

export const register = async (
  nama: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  role: string
) => {
  try {
  const response = await api.post(`/register`, {
    nama,
    email,
    phone,
    password,
    confirmPassword,
    role
  });
  return response.data;
} catch (error: any) {
  console.error("Register error:", error.response?.data || error.message);
  throw error;
}
};

export const login = async (email: string, password: string) => {
  const response = await api.post(`/login`, { email, password });
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

export const getMe = async () => {
  const res = await api.get("/me");
  return res.data; // { id, email, role, ... }
};


export const getAllUser = async (page = 1, limit = 20) => {
  const res = await api.get('/user', {
    params: { page, limit }
  });

  return res.data;
}