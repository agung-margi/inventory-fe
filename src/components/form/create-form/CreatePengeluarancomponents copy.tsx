import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import DatePicker from "../date-picker.tsx";
import { useNavigate } from "react-router";
import Button from "../../ui/button/Button.tsx";
import {
  fetchPermintaan,
  getPermintaan,
  getPermintaanById,
} from "../../../services/permintaan.tsx";
// import Select from "../Select.tsx";
import Select from "react-select";

type Item = {
  productId: string;
  name: string;
  qty: number;
};

export default function CreatePengeluaranComponents() {
  const [nama, setNama] = useState("");
  const [permintaanList, setPermintaanList] = useState<any[]>([]);
  const [selectedPermintaanId, setSelectedPermintaanId] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [isSearchable, setIsSearchable] = useState(true);
  const navigate = useNavigate();

  // Ambil list permintaan saat mount
  useEffect(() => {
    const loadPermintaan = async () => {
      try {
        const data = await getPermintaan();
        console.log("Permintaan List:", data);
        setPermintaanList(data.data);
      } catch (err) {
        console.error("Gagal fetch permintaan:", err);
      }
    };
    loadPermintaan();
  }, []);

  // Ambil detail permintaan saat user pilih
  useEffect(() => {
    if (!selectedPermintaanId) return;

    const loadDetail = async () => {
      try {
        const detail = await getPermintaanById(selectedPermintaanId);
        console.log("Detail Permintaan:", detail.data.permintaan);
        // Mapping ke state items
        const mappedItems = detail.data.detail.map((it: any) => ({
          productId: it.designator,
          name: it.name || it.designator, // fallback kalau name tidak ada
          qty: it.qty,
        }));

        setItems(mappedItems);
      } catch (err) {
        console.error("Gagal fetch detail permintaan:", err);
      }
    };
    loadDetail();
  }, [selectedPermintaanId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      namaWarehouse: nama,
      permintaanId: selectedPermintaanId,
      items,
    });
    // navigate("/Transaksi");
  };

  return (
    <ComponentCard title="Create Pengeluaran">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="tanggal-pengeluaran">Tanggal Pengeluaran</Label>
          <DatePicker id="tanggal-pengeluaran" placeholder="Pilih Tanggal" />
        </div>

        <div>
          <Label htmlFor="name">Nama Warehouse</Label>
          <Input
            type="text"
            id="name"
            placeholder="Masukan Nama Warehouse"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="penerima">Penerima</label>
          <input
            type="text"
            id="penerima"
            placeholder="Masukan nama penerima"
            className="w-full border px-3 py-2 rounded mb-4"
          />
        </div>

        {/* Dropdown pilih permintaan */}
        <Select
          value={
            permintaanList
              .map((p) => ({
                value: p.id,
                label: `${p.id}`,
              }))
              .find((opt) => opt.value === selectedPermintaanId) || null
          }
          onChange={(option) => setSelectedPermintaanId(option?.value || "")}
          options={permintaanList.map((p) => ({
            value: p.id,
            label: `${p.id}`,
          }))}
          isSearchable
          placeholder="Pilih Permintaan..."
        />

        {/* Tabel item dari permintaan */}
        {items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item, i) => (
              <li key={i} className="border p-2 rounded shadow">
                <strong>{item.name}</strong> - Qty diminta: {item.qty}
                {/* Bisa tambahkan input di sini kalau mau ubah qty */}
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end mt-4 space-x-2">
          <Button type="submit" variant="success">
            Submit
          </Button>
          <Button type="reset" variant="danger">
            Clear
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
