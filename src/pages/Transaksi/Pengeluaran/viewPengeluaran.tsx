import { useState, useEffect } from "react";

import Select from "react-select";
import { useNavigate, useParams } from "react-router";
import { getPengeluaranById } from "../../../services/pengeluaran.tsx";
import Label from "../../../components/form/Label.tsx";
import DatePicker from "../../../components/form/date-picker.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Button from "../../../components/ui/button/Button.tsx";

type Item = {
  designator: string;
  name: string;
  qty: number;
  qtyDipenuhi: number;
  qtyDiminta: number;
};

export default function ViewPengeluaranComponents() {
    const navigate = useNavigate();
  const { id } = useParams(); // ambil id dari URL
  const [items, setItems] = useState<Item[]>([]);
  const [penerima, setPenerima] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [tanggal, setTanggal] = useState<Date | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadPengeluaran = async () => {
      try {
        const response = await getPengeluaranById(id);
        console.log("Response pengeluaran:", response.data.data);
        const data = response.data.data;

        // Set data warehouse
        setSelectedWarehouse({
          value: data.warehouseId,
          label: `${data.warehouseId} - ${data.warehouse?.nama_wh || ""}`,
        });

        setTanggal(new Date(data.tanggal));
        setPenerima(data.penerima.nama || "-");
        setKeterangan(data.keterangan || "-");

       // Map items dari detail pengeluaran
      const mappedItems =
        data.detail?.map((it: any) => ({
          designator: it.designator,
          name: it.name || it.designator, // kalau ada nama item, pakai
          qtyDiminta: it.qty || 0,        // pakai qty dari detail
          qtyDipenuhi: it.qty || 0,       // bisa disesuaikan
        })) || [];

      setItems(mappedItems);

      } catch (err) {
        console.error("Gagal fetch pengeluaran:", err);
      }
    };

    loadPengeluaran();
  }, [id]);

  return (
    <ComponentCard title="View Pengeluaran">
      <div className="space-y-6">
        <div>
          <Label htmlFor="tanggal-pengeluaran">Tanggal Pengeluaran</Label>
          <input
            type="text"
            id="tanggal-pengeluaran"
            value={tanggal ? tanggal.toLocaleDateString() : ""}
            readOnly
            className="w-full border px-3 py-2 rounded mb-4 bg-gray-100"
          />
        </div>

        <div>
          <Label htmlFor="warehouse">Nama Warehouse</Label>
          <Select id="warehouse" value={selectedWarehouse} isDisabled />
        </div>

        <div>
          <Label htmlFor="penerima">Penerima</Label>
          <Input type="text" id="penerima" value={penerima} disabled />
        </div>

        <div>
          <Label htmlFor="keterangan">Keterangan</Label>
          <Input type="text" id="keterangan" value={keterangan} disabled />
        </div>

        {/* Tabel item */}
        {items.length > 0 && (
          <ul className="mb-4 divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <li className="grid grid-cols-3 gap-4 p-2 bg-gray-100 font-semibold text-sm text-center">
              <span>Designator</span>
              <span>Qty Diminta</span>
              <span>Qty Dipenuhi</span>
            </li>

            {items.map((item, i) => (
              <li
                key={i}
                className="grid grid-cols-3 gap-4 items-center p-2 text-sm text-center"
              >
                <span>{item.name}</span>
                <input
                  type="number"
                  value={item.qtyDiminta}
                  readOnly
                  className="w-20 border rounded px-2 py-1 text-center mx-auto bg-gray-100"
                />
                <input
                  type="number"
                  value={item.qtyDipenuhi}
                  readOnly
                  className="w-20 border rounded px-2 py-1 text-center mx-auto bg-gray-100"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="danger"
          onClick={() => navigate("/pengeluaran")}
        >
          Close
        </Button>
      </div>
    </ComponentCard>
  );
}
