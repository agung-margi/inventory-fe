// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = '/api/v1';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});


export const createItem = async (data: {
  designator: string;
  nama_item: string;
  kategori: string;
  satuan: string;
}) => {
  const response = await api.post('/item', data);
  return response.data;
};
export const getAllItem = async () => {
  const response = await api.get('/item');
  return response.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data; // { id, email, role, ... }
};

export const getStock = async(kodeWh:string) => {
  const res = await api.get('/stock', {
    params: { kodeWh: kodeWh }
  });
  return res.data;
}