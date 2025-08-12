import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ComponentCard from "../../common/ComponentCard.tsx";
import Button from "../../ui/button/Button.tsx";
import "react-datepicker/dist/react-datepicker.css";
import Label from "../../form/Label.tsx";
import Input from "../../form/input/InputField.tsx";
import {
  getWarehouseById,
  updateWarehouse,
} from "../../../services/warehouse.tsx";

type Warehouse = {
  id: string;
  kode_wh: string;
  nama_wh: string;
  alamat: string;
};

export default function ViewWarehouse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<{ nama_wh: string; alamat: string }>(
    {
      nama_wh: "",
      alamat: "",
    }
  );
  const [loading, setLoading] = useState(true);
  const [warehouse, setWarehouse] = useState<Warehouse | null>(null);

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Ambil data awal (produk, warehouse, dan permintaan)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getWarehouseById(id!);
        setWarehouse(res.data);
      } catch (err) {
        console.error("Gagal load data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    if (warehouse) {
      setEditData({
        nama_wh: warehouse.nama_wh || "",
        alamat: warehouse.alamat || "",
      });
    }
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    // Kembalikan data awal
    if (warehouse) {
      setEditData({
        nama_wh: warehouse.nama_wh || "",
        alamat: warehouse.alamat || "",
      });
    }
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      await updateWarehouse(id!, editData);
      setWarehouse((prev) => (prev ? { ...prev, ...editData } : prev));
      setIsEditing(false);
      setAlertMessage("Data berhasil disimpan!");

      // Hilangkan alert setelah 3 detik
      setTimeout(() => {
        setAlertMessage(null);
      }, 10000);
    } catch (error) {
      alert("Gagal menyimpan: " + (error as Error).message);
    }
  };

  return (
    <ComponentCard title="Detail Warehouse">
      <form className="space-y-6">
        {/* Kode Warehouse */}
        <div>
          <Label htmlFor="kodeWh">Kode Warehouse</Label>
          <div
            id="kodeWh"
            className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700"
          >
            {warehouse?.kode_wh || "-"}
          </div>
        </div>

        {/* Nama Warehouse */}
        <div>
          <Label htmlFor="namaWarehouse">Nama Warehouse</Label>
          {isEditing ? (
            <Input
              id="namaWarehouse"
              value={editData.nama_wh}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  nama_wh: e.target.value,
                }))
              }
            />
          ) : (
            <div className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700">
              {warehouse?.nama_wh || "-"}
            </div>
          )}
        </div>
        {/* Alamat Warehouse */}
        <div>
          <Label htmlFor="alamat">Alamat Warehouse</Label>
          {isEditing ? (
            <Input
              id="alamat"
              value={editData.alamat}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  alamat: e.target.value,
                }))
              }
            />
          ) : (
            <div className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-700">
              {warehouse?.alamat || "-"}
            </div>
          )}
        </div>

        {/* Tombol */}
        <div className="flex justify-end mt-4 gap-2">
          {isEditing ? (
            <>
              <Button type="button" variant="success" onClick={handleSaveClick}>
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="primary" onClick={handleEditClick}>
                Edit
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => navigate("/warehouse")}
              >
                Close
              </Button>
            </>
          )}
        </div>
      </form>
    </ComponentCard>
  );
}
