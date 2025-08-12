import { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Button from "../../ui/button/Button.tsx";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getAllItem } from "../../../services/item.tsx";
import { getAllWarehouse } from "../../../services/warehouse.tsx";
import { createPermintaan } from "../../../services/permintaan.tsx";
import { toast } from "react-toastify";

type ItemFromAPI = {
  id: string;
  designator: string;
  nama_item: string;
  kategori: string;
  satuan: string;
};

type Item = {
  productId: string;
  name: string;
  qty: number;
  satuan: string;
};

interface Permintaan {
  tanggal: string | Date;
}

interface PropsType {
  permintaan?: Permintaan;
  onUpdate?: (data: {
    tanggal: string;
    tujuanWh: string;
    project: string;
    catatan: string;
    items: Item[];
  }) => void;
}

type Warehouse = {
  id: string;
  kode_wh: string;
  nama_wh: string;
  alamat: string;
};

export default function FormPermintaanComponents({
  permintaan,
  onUpdate,
}: PropsType) {
  const [products, setProducts] = useState<ItemFromAPI[]>([]);
  const tanggalRaw = permintaan?.tanggal ?? new Date();

  const parsedTanggal = new Date(tanggalRaw);
  const [tanggal, setTanggal] = useState<Date | null>(
    isNaN(parsedTanggal.getTime()) ? null : parsedTanggal
  );
  const [tujuanWh, setTujuanWh] = useState("");
  const [project, setProject] = useState("");
  const [catatan, setCatatan] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  // State untuk modal dan input item baru
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [qty, setQty] = useState("");
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState("");

  useEffect(() => {
    async function fetchWarehouses() {
      const response = await getAllWarehouse(); // pastikan fungsi ini ada di services
      setWarehouses(response.data);
    }
    fetchWarehouses();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getAllItem();
      setProducts(data.data);
    }
    fetchProducts();
  }, []);

  const handleAddItem = () => {
    const product = products.find((p) => p.id === selectedProductId);
    const qtyNumber = parseInt(qty);
    if (!product || !qty || isNaN(qtyNumber) || qtyNumber <= 0) return;

    const alreadyExists = items.some(
      (item) => item.productId === selectedProductId
    );
    if (alreadyExists) {
      toast.error("Item sudah ditambahkan sebelumnya");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        productId: selectedProductId,
        name: product.designator,
        qty: qtyNumber,
        satuan: product.satuan,
      },
    ]);
    setSelectedProductId("");
    setQty("");
    setShowModal(false);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tanggal || !selectedWarehouseId || !project || items.length === 0) {
      toast.error(
        "Tanggal, Tujuan Warehouse, Project, dan minimal 1 item harus diisi"
      );
      return;
    }

    // cari warehouse berdasarkan id, ambil kode_wh-nya
    const selectedWarehouse = warehouses.find(
      (wh) => wh.id === selectedWarehouseId
    );
    if (!selectedWarehouse) {
      toast.error("Warehouse tidak valid");
      return;
    }

    // mapping items sesuai dengan tipe yang diminta oleh createPermintaan
    const mappedItems = items.map((item) => ({
      designator: item.name,
      qty: item.qty,
    }));

    const dataToSend = {
      tanggal:
        tanggal instanceof Date
          ? tanggal.toISOString().split("T")[0]
          : tanggal ?? "",
      tujuanWh: selectedWarehouse.kode_wh,
      project,
      catatan,
      items: mappedItems,
    };
    try {
      await createPermintaan(dataToSend);
      toast.success("Permintaan berhasil dibuat!");

      // reset form
      setTanggal(null);
      setSelectedWarehouseId("");
      setProject("");
      setCatatan("");
      setItems([]);
    } catch (error) {
      alert("Gagal membuat permintaan: " + (error as Error).message);
    }
  };

  return (
    <ComponentCard title="Form Input Permintaan">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="tanggal">Tanggal</Label>

          <DatePicker
            id="tanggal"
            selected={tanggal} // pakai selected, bukan date
            onChange={(date: Date | null) => setTanggal(date)}
            placeholderText="Pilih tanggal"
            className="w-full border px-3 py-2 rounded text-gray-500"
            onKeyDown={(e) => e.preventDefault()}
            disabled
          />
        </div>

        <div>
          <Label htmlFor="tujuanWh">Tujuan Warehouse</Label>
          <select
            id="tujuanWh"
            value={selectedWarehouseId}
            onChange={(e) => setSelectedWarehouseId(e.target.value)}
            className="w-full border px-3 py-2 rounded dark:text-white"
          >
            <option value="">-- Pilih Warehouse --</option>
            {warehouses.map((wh) => (
              <option key={wh.id} value={wh.id}>
                {wh.kode_wh} - {wh.nama_wh}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="project">Project</Label>
          <Input
            id="project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            placeholder="Masukkan nama project"
          />
        </div>

        <div>
          <Label htmlFor="catatan">Catatan</Label>
          <Input
            id="catatan"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Masukkan catatan (optional)"
          />
        </div>

        <div>
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            onClick={() => setShowModal(true)}
          >
            Tambah Item
          </button>

          <ul className="mb-4 divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
  {/* Header */}
  <li className="grid grid-cols-4 gap-4 p-2 bg-gray-100 dark:bg-gray-800 font-semibold text-sm dark:text-white">
    <span>Designator</span>
    <span className="text-center">Qty</span>
    <span className="text-center">Satuan</span>
    <span className="text-center">Action</span>
  </li>

  {/* Data Items */}
  {items.map((item, i) => (
    <li
      key={i}
      className="grid grid-cols-4 gap-4 items-center p-2 text-sm dark:text-white"
    >
      {/* Designator */}
      <span>{item.name}</span>

      {/* Qty editable, posisinya center */}
      <input
        type="number"
        min={1}
        value={item.qty}
        onChange={(e) => {
          const newQty = parseInt(e.target.value);
          setItems((prev) =>
            prev.map((it, idx) =>
              idx === i ? { ...it, qty: isNaN(newQty) ? 0 : newQty } : it
            )
          );
        }}
        className="w-20 border rounded px-2 py-1 text-center mx-auto"
      />

      {/* Satuan */}
      <span className="text-center">{item.satuan}</span>

      {/* Tombol Hapus */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => handleRemoveItem(i)}
          className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100"
        >
          Hapus
        </button>
      </div>
    </li>
  ))}
</ul>

        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-md relative border-2">
              <h3 className="text-lg font-semibold mb-4">Tambah Item</h3>

              <label className="block mb-2">Pilih Produk</label>
              <select
                className="w-full border px-3 py-2 rounded mb-4"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value="">-- Pilih Produk --</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.designator}
                  </option>
                ))}
              </select>

              {selectedProductId && (
                <>
                  <label className="block mb-2">Qty</label>
                  <input
                    type="number"
                    min={1}
                    className="w-full border px-3 py-2 rounded mb-4"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Masukkan jumlah"
                  />
                </>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 border rounded"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                  disabled={!selectedProductId || !qty}
                  onClick={handleAddItem}
                >
                  Tambahkan
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4 space-x-2">
          <Button type="submit" variant="success">
            Submit
          </Button>
          <Button
            type="reset"
            variant="danger"
            onClick={() => {
              setTanggal(null);
              setTujuanWh("");
              setProject("");
              setCatatan("");
              setItems([]);
            }}
          >
            Clear
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
