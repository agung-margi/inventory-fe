import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Button from "../../ui/button/Button.tsx";
import "react-datepicker/dist/react-datepicker.css";
import {
  approvePermintaan,
  getPermintaanById,
} from "../../../services/permintaan.tsx";

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

type Warehouse = {
  id: string;
  kode_wh: string;
  nama_wh: string;
  alamat: string;
};

export default function ApprovePermintaanForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [permintaan, setPermintaan] = useState<any>(null);

  // Ambil data awal (produk, warehouse, dan permintaan)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getPermintaanById(id!);
        setPermintaan(res.data);
      } catch (err) {
        console.error("Gagal load data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleApprove = async () => {
    if (!id) return;

    if (permintaan?.status === "approved") {
      alert("Permintaan ini sudah di-approve!");
      return;
    }

    try {
      await approvePermintaan(id); // 🔹 panggil API approve
      alert("Permintaan berhasil di-approve!");
      // contoh: redirect ke daftar permintaan
      navigate("/permintaan");
    } catch (error) {
      alert("Gagal approve: " + (error as Error).message);
    }
  };

  return (
    <ComponentCard title="Form Approve Permintaan">
      <form className="space-y-6">
        <div>
          <Label htmlFor="tanggal">Tanggal</Label>
          <div
            id="tanggal"
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
          >
            {permintaan
              ? new Date(permintaan.tanggal).toLocaleDateString("id-ID")
              : "-"}
          </div>
        </div>

        <div>
          <Label htmlFor="tujuanWh">Tujuan Warehouse</Label>
          <div
            id="tujuanWh"
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
          >
            {permintaan?.tujuanWh || "-"}
          </div>
        </div>

        <div>
          <Label htmlFor="project">Project</Label>
          <Input
            id="project"
            value={permintaan?.project || ""}
            onChange={() => {}}
          />
        </div>

        <div>
          <Label htmlFor="catatan">Catatan</Label>
          <Input
            id="catatan"
            value={permintaan?.catatan || ""}
            onChange={() => {}}
          />
        </div>

        <div>
          <ul className="mb-4 divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <li className="grid grid-cols-2 gap-4 p-2 bg-gray-100 font-semibold text-sm text-center">
              <span>Designator</span>
              <span className="text-center">Qty</span>
            </li>

            {permintaan?.detail?.map((item: any, i: number) => (
              <li
                key={i}
                className="grid grid-cols-2 gap-4 items-center p-2 text-sm text-center"
              >
                <span>{item.designator}</span>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  readOnly
                  className="w-20 border rounded px-2 py-1 text-center mx-auto bg-gray-100"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <Button
            type="button"
            variant="success"
            onClick={handleApprove}
            disabled={permintaan?.status === "approved"}
          >
            Approve
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => navigate("/permintaan")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </ComponentCard>
  );
}
