import React, { useState } from 'react';

const products = [
  { id: '8aee1d2d-94df-41cb-a72e-2190bd0f7c9f', name: 'Besi Hollow 4x4' },
  { id: '78be5e1e-519a-4427-84f1-8b3c5e19d2ad', name: 'Cat Tembok Putih' },
  { id: '4a97b5ce-399e-4d7a-98b5-3a5f54845a17', name: 'Semen 50kg' },
];

export default function ItemForm() {
  const [items, setItems] = useState([]);
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

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Pengeluaran Proyek Tower 5</h2>

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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
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
    </div>
  );
}
