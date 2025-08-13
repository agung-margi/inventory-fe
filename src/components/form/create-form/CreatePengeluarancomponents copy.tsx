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
import { jwtDecode } from "jwt-decode";
import { getMe } from "../../../services/auth.tsx";
import {
  getAllWarehouse,
  getWarehouse,
  getWarehouseById,
} from "../../../services/warehouse.tsx";

type Item = {
  productId: string;
  name: string;
  qty: number;
  qtyDipenuhi: number;
  qtyDiminta: number;
};

type TokenPayload = {
  id: string;
  role: string;
  kode_wh: string;
  iat: number;
  exp: number;
};

export default function CreatePengeluaranComponents() {
  const [nama, setNama] = useState("");
  const [permintaanList, setPermintaanList] = useState<any[]>([]);
  const [selectedPermintaanId, setSelectedPermintaanId] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const [namaWarehouse, setNamaWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // Ambil list permintaan saat mount
  useEffect(() => {
    const loadPermintaan = async () => {
      try {
        // Ambil kode_wh dari user (cookie HttpOnly lewat API)
        const meResponse = await getMe();
        const kodeWhUser = meResponse.data.kode_wh;

        const data = await getPermintaan(kodeWhUser);
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
        const response = await getPermintaanById(selectedPermintaanId);
        console.log("Detail Permintaan:", response.data.detail);
        const mappedItems = response.data.detail.map((it: any) => ({
          productId: it.designator,
          name: it.name || it.designator,
          qtyDiminta: it.qty, // dari API
          // qtyDipenuhi: it.qty, // default sama, tapi bisa user ubah
        }));

        console.log("Mapped Items:", mappedItems);
        setItems(mappedItems);
      } catch (err) {
        console.error("Gagal fetch detail permintaan:", err);
      }
    };
    loadDetail();
  }, [selectedPermintaanId]);
  useEffect(() => {
    const loadWarehouse = async () => {
      try {
        // Ambil kode_wh dari user (cookie HttpOnly lewat API)
        const meResponse = await getMe();
        const kodeWhUser = meResponse.data.kode_wh;

        // Ambil list warehouse
        const listResponse = await getWarehouse(kodeWhUser);
        console.log("List Warehouse:", listResponse);
        const options = listResponse.data.map((wh: any) => ({
          value: wh.kode_wh,
          label: `${wh.kode_wh} - ${wh.nama_wh}`,
        }));

        setWarehouses(options);

        // Set default sesuai kode_wh dari user
        const defaultOption =
          options.find((opt: any) => opt.value === kodeWhUser) || null;
        setSelectedWarehouse(defaultOption);

        // Kalau mau langsung setNamaWarehouse
        if (defaultOption) {
          setNamaWarehouse(defaultOption.label);
        }
      } catch (error) {
        console.error("Gagal ambil warehouse:", error);
      }
    };

    loadWarehouse();
  }, []);

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
          <Label htmlFor="warehouse">Nama Warehouse</Label>
          <Select
            id="warehouse"
            options={warehouses}
            value={selectedWarehouse}
            onChange={(option) => setSelectedWarehouse(option)}
            placeholder="Pilih Warehouse..."
            isSearchable
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
          <div>
            <ul className="mb-4 divide-y divide-gray-200 border border-gray-200 rounded-lg">
              {/* Header */}
              <li className="grid grid-cols-3 gap-4 p-2 bg-gray-100 font-semibold text-sm text-center">
                <span>Designator</span>
                <span>Qty Diminta</span>
                <span>Qty Dipenuhi</span>
              </li>

              {/* Rows */}
              {items.map((item, i) => (
                <li
                  key={i}
                  className="grid grid-cols-3 gap-4 items-center p-2 text-sm text-center"
                >
                  {/* Designator / Nama Produk */}
                  <span>{item.name}</span>

                  {/* Qty Diminta (readonly) */}
                  <input
                    type="number"
                    value={item.qtyDiminta}
                    readOnly
                    className="w-20 border rounded px-2 py-1 text-center mx-auto bg-gray-100"
                  />

                  {/* Qty Dipenuhi (editable) */}
                  <input
                    type="number"
                    min={0}
                    max={item.qtyDiminta}
                    value={item.qtyDipenuhi || 0}
                    onChange={(e) => {
                      const newQty = parseInt(e.target.value) || 0;
                      setItems((prev) =>
                        prev.map((it, idx) =>
                          idx === i ? { ...it, qtyDipenuhi: newQty } : it
                        )
                      );
                    }}
                    className="w-20 border rounded px-2 py-1 text-center mx-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
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
