// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = '/api/v1/transaksi';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});

export const fetchPermintaan = async (page = 1, limit = 20) => {
  const res = await axios.get('/api/v1/transaksi/permintaan', {
    params: { page, limit }
  });

  return res.data.data;
}


export const getPermintaan = async (tujuanWh: string) => {
  const res = await api.get('/permintaan', {
    params: { tujuanWh, status: "approved" }
  });

  return res.data.data;
}
export const createPermintaan = async (data: {
  tanggal: string;
  tujuanWh: string;
  project: string;
  catatan: string;
  items: { designator: string; qty: number }[];
}) => {
  const response = await api.post(`/permintaan`, data);
console.log(response.data);
  return response.data;
};


// Get permintaan by ID
export const getPermintaanById = async (id: string) => {
  try {
    const res = await api.get(`/permintaan/${id}`);
    return res.data; // langsung ambil "data" dari response
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Gagal mengambil data permintaan");
  }
};

// Get permintaan by ID
export const approvePermintaan = async (id: string) => {
  try {
    const res = await api.put(`/permintaan/${id}/approve`);
    return res.data; // langsung ambil "data" dari response
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Gagal mengambil data permintaan");
  }
};