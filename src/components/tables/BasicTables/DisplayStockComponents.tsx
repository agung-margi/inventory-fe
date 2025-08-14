import { useState, useEffect } from "react";
import Label from "../../form/Label";
import Select from "../../form/Select"; // Pastikan path sesuai
import { getStock } from "../../../services/item";
import { getMe } from "../../../services/auth";
import { getWarehouse } from "../../../services/warehouse";
import { toast } from "react-toastify";

export default function DisplayStockComponents() {
  const [stokWarehouse, setStokWarehouse] = useState<any[]>([]);
  const [namaWarehouse, setNamaWarehouse] = useState("");
  const [warehouses, setWarehouses] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>("");

  const payload = {
    warehouseId: selectedWarehouse,
  };

  useEffect(() => {
    const loadWarehouse = async () => {
      try {
        // Ambil kode_wh dari user (cookie HttpOnly lewat API)
        const meResponse = await getMe();
        const kodeWhUser = meResponse.data.kode_wh;

        // Ambil list warehouse
        const listResponse = await getWarehouse(kodeWhUser);
        const options = listResponse.data.map((wh: any) => ({
          value: wh.kode_wh,
          label: `${wh.kode_wh} - ${wh.nama_wh}`,
        }));

        setWarehouses(options);

        // Set default sesuai kode_wh dari user
        const defaultOption = options.find(
          (opt: any) => opt.value === kodeWhUser
        );
        setSelectedWarehouse(defaultOption ? defaultOption.value : "");
        setSelectedWarehouse(defaultOption);

        // Kalau mau langsung setNamaWarehouse
        if (defaultOption) {
          setNamaWarehouse(defaultOption.label);
        }
      } catch (error:any) {
       toast.error(error.response?.data?.message || "Gagal mengambil stok");
      }
    };

    loadWarehouse();
  }, []);

  // Function ambil stok via service
  const loadStokWarehouse = async (kodeWh: string) => {
  try {
    const res = await getStock(kodeWh); // service dipanggil

    if (res.status) {
      setStokWarehouse(res.data);
    } else {
      setStokWarehouse([]);
      toast.error(res.message || "Stock tidak ditemukan"); // ⬅ notif error
    }
  } catch (err: any) {
    setStokWarehouse([]);
    toast.error(err.response?.data?.message || "Gagal mengambil stok");
  }
};

  return (
    <div>
      {/* Dropdown pilih warehouse */}
      <Label htmlFor="warehouse">Nama Warehouse</Label>
      <Select
        options={warehouses}
        value={selectedWarehouse}
        onChange={(val: string) => {
          setSelectedWarehouse(val);
          if (val) {
            const kodeWh = val.split(" - ")[0]; // Ambil kode warehouse saja
            loadStokWarehouse(kodeWh);
          } else {
            setStokWarehouse([]);
          }
        }}
        placeholder="Pilih Warehouse..."
      />

      {/* Display stok warehouse */}
      {stokWarehouse.length > 0 && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="border px-3 py-2 text-left">Designator</th>
                <th className="border px-3 py-2 text-center">Satuan</th>
                <th className="border px-3 py-2 text-center">Available</th>
                <th className="border px-3 py-2 text-center">Transit</th>
              </tr>
            </thead>
            <tbody>
              {stokWarehouse.map((stok) => (
                <tr key={stok.id} className="text-sm">
                  <td className="border px-3 py-1">{stok.designator}</td>
                  <td className="border px-3 py-1 text-center">
                    {stok.satuan}
                  </td>
                  <td className="border px-3 py-1 text-center">
                    {stok.available}
                  </td>
                  <td className="border px-3 py-1 text-center">
                    {stok.transit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
