import { useState, useEffect } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { getMe } from "../../../services/auth";
import { getWarehouse } from "../../../services/warehouse";
import { createPenerimaan } from "../../../services/penerimaan";
import Label from "../Label";
import Button from "../../ui/button/Button";
import { getAllItem } from "../../../services/item";

export default function CreatePenerimaanComponents() {
  const [warehouses, setWarehouses] = useState<{ value: string; label: string }[]>([]);
  const [designatorOptions, setDesignatorOptions] = useState<{ value: string; label: string; satuan: string }[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<{ value: string; label: string } | null>(null);
  const [sumber, setSumber] = useState("");
  const [jenis, setJenis] = useState("");
  const [items, setItems] = useState([{ designator: "", qty: 0, satuan: "" }]);

  // Load warehouse
  useEffect(() => {
    const loadWarehouse = async () => {
      try {
        const meResponse = await getMe();
        const kodeWhUser = meResponse.data.kode_wh;

        const listResponse = await getWarehouse(kodeWhUser);
        const options = listResponse.data.map((wh: any) => ({
          value: wh.kode_wh,
          label: `${wh.kode_wh} - ${wh.nama_wh}`,
        }));

        setWarehouses(options);
      } catch (err) {
        toast.error("Gagal mengambil warehouse");
      }
    };
    loadWarehouse();
  }, []);

  // Load designator
  useEffect(() => {
    const loadDesignators = async () => {
      try {
        const res = await getAllItem(); // asumsi format [{ designator, satuan }]
        const opts = res.data.map((d: any) => ({
          value: d.designator,
          label: d.designator,
          satuan: d.satuan,
        }));
        setDesignatorOptions(opts);
      } catch (err) {
        toast.error("Gagal mengambil designator");
      }
    };
    loadDesignators();
  }, []);

  const handleAddItem = () => {
    setItems([...items, { designator: "", qty: 0, satuan: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleChangeItem = (index: number, field: string, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSelectDesignator = (index: number, selected: any) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      designator: selected.value,
      satuan: selected.satuan, // otomatis isi satuan
    };
    setItems(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      warehouseId: selectedWarehouse?.value,
      sumber,
      jenis,
      items,
    };

    try {
      await createPenerimaan(payload);
      toast.success("Penerimaan berhasil dibuat");
      setSumber("");
      setJenis("");
      setSelectedWarehouse(null);
      setItems([{ designator: "", qty: 0, satuan: "" }]);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal membuat penerimaan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-lg">
      <div>
        <Label>Warehouse</Label>
        <Select
          options={warehouses}
          value={selectedWarehouse}
          onChange={(opt) => setSelectedWarehouse(opt)}
          placeholder="Pilih Warehouse..."
        />
      </div>

      <div>
        <Label>Sumber</Label>
        <input
          type="text"
          value={sumber}
          onChange={(e) => setSumber(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="Masukkan sumber barang"
        />
      </div>

      <div>
        <Label>Jenis</Label>
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Pilih jenis...</option>
          <option value="vendor">Vendor</option>
          <option value="internal">Internal</option>
        </select>
      </div>

      <div>
        <Label>Items</Label>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 mb-2">
            {/* Dropdown designator */}
            <Select
              options={designatorOptions}
              value={designatorOptions.find((opt) => opt.value === item.designator) || null}
              onChange={(selected) => handleSelectDesignator(index, selected)}
              placeholder="Pilih Designator..."
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.qty}
              onChange={(e) => handleChangeItem(index, "qty", parseInt(e.target.value) || 0)}
              className="border px-2 py-1 rounded"
            />
            <input
              type="text"
              placeholder="Satuan"
              value={item.satuan}
              readOnly
              className="border px-2 py-1 rounded bg-gray-100"
            />
            <div className="flex items-center space-x-1">
              {items.length > 1 && (
                <Button type="button" variant="danger" onClick={() => handleRemoveItem(index)}>
                  Hapus
                </Button>
              )}
              {index === items.length - 1 && (
                <Button type="button" variant="primary" onClick={handleAddItem}>
                  +
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" variant="success">
          Simpan
        </Button>
      </div>
    </form>
  );
}
