import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Select from "../Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons/index.ts";
import DatePicker from "../date-picker.tsx";
import { register } from "../../../services/auth.tsx";
import { useNavigate } from "react-router";
import Button from "../../ui/button/Button.tsx";

// Define the Item type
type Item = {
  productId: string;
  name: string;
  qty: number;
};

type Product = {
  id: string;
  name: string;
};

const products: Product[] = [
  { id: "1", name: "Produk A" },
  { id: "2", name: "Produk B" },
  { id: "3", name: "Produk C" },
];

export default function CreatePengeluaranAGComponents() {
  const [nama, setNama] = useState("");

  const [items, setItems] = useState<Item[]>([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedProductId, setSelectedProductId] = useState('');
   const [qty, setQty] = useState('');
 
   const handleAddItem = () => {
     const selectedProduct = products.find(p => p.id === selectedProductId);
     if (!selectedProduct || !qty) return;
 
     setItems(prev => [
       ...prev,
       {
         productId: selectedProductId,
         name: selectedProduct.name,
         qty: parseInt(qty),
       },
     ]);
 
     // Reset
     setSelectedProductId('');
     setQty('');
     setShowModal(false);
   };
  const navigate = useNavigate();




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    // await register(nama, alamat);
    // navigate("/Transaksi");
    console.log(nama, items, qty)
  };

  return (
    <ComponentCard title="Pengeluaran AG">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
            <div>
            <Label htmlFor="input">Tanggal Pengeluaran</Label>
            <DatePicker
              id="tanggal-pengeluaran"
              placeholder="Pilih Tanggal"
            />
          </div>

          <div>
            <Label htmlFor="input">Nama Warehouse</Label>
            <Input type="text" id="name" placeholder="Masukan Nama Warehouse" value={nama}
              onChange={(e) => setNama(e.target.value)} />
          </div>

           <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowModal(true)}
      >
        Tambah Item
      </button>
            <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="border p-2 rounded shadow">
            <strong>{item.name}</strong> - {item.qty} pcs
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div className="transition-opacity duration-300 ease-in-out fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">   
            <h3 className="text-lg font-semibold mb-4">Tambah Item</h3>

            <label className="block mb-2">Pilih Produk</label>
            <select
              className="w-full border px-3 py-2 rounded mb-4"
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
            >
              <option value="">-- Pilih Produk --</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            {selectedProductId && (
              <>
                <label className="block mb-2">Qty</label>
                <input
                  type="number"
                  className="w-full border px-3 py-2 rounded mb-4"
                  value={qty}
                  onChange={e => setQty(e.target.value)}
                  min={1}
                />
              </>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Batal
              </button>
              <button
                onClick={handleAddItem}
                className="px-4 py-2 bg-green-600 text-white rounded"
                disabled={!selectedProductId || !qty}
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
            <Button type="reset" variant="danger">
              Clear
            </Button>
          </div>
        </form>
      </div>
    </ComponentCard>
  );
}