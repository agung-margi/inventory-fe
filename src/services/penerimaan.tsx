// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = '/api/v1/transaksi';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});


export const createPenerimaan = async (payload: any) => {
  return api.post("/penerimaan", payload);
};