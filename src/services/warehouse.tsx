// buaktan service: src/services/auth.ts
import axios from 'axios';

const API_URL = '/api/v1/warehouse';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,// penting agar cookie dikirim dan diterima
});

export const getAllWarehouse = async (page = 1, limit = 20) => {
  const res = await api.get('/', {
    params: { page, limit }
  });

  return res.data;
};

// Get permintaan by ID
export const getWarehouseById = async (id: string) => {
  try {
    const res = await api.get(`/${id}`);
    return res.data; // langsung ambil "data" dari response
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Gagal mengambil data warehouse");
  }
};


export const updateWarehouse = async (id: string, data: {
  nama_wh: string;
  alamat: string;
}) => {
  try {
    const res = await api.put(`/${id}`, data);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || "Gagal memperbarui data warehouse");
  }
};

export const createWarehouse = async (data: {
  nama_wh: string;
  alamat: string;
}) => {
  try {
    const res = await api.post(`/`, data);
    console.log(res.data);
    return res.data;
  } catch (err: any) {
    console.error("Error creating warehouse:", err);
    throw new Error(err.response?.data?.message || "Gagal membuat data warehouse");
  }
};