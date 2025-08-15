// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = '/api/v1/transaksi';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});


export const createPengeluaran = async (payload: any) => {
  return api.post("/pengeluaran", payload);
};

export const getPengeluaran = async (page = 1, limit = 20, kodeWh: string) => {
  return api.get('/pengeluaran', {
    params: { page, limit, kodeWh }
  });
};