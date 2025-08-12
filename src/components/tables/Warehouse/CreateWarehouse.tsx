import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import { useNavigate } from "react-router";
import Button from "../../ui/button/Button.tsx";
import { createWarehouse } from "../../../services/warehouse.tsx";
import Label from "../../form/Label.tsx";
import Input from "../../form/input/InputField.tsx";

type Warehouse = {
  nama_wh: string;
  alamat: string;
};

export default function WarehouseForm() {
  const navigate = useNavigate();
  const [namaWh, setNamaWh] = useState("");
  const [alamatWh, setAlamatWh] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaWh || !alamatWh) {
      alert("Nama Warehouse dan Alamat harus diisi");
      return;
    }

    try {
      await createWarehouse({
        nama_wh: namaWh,
        alamat: alamatWh,
      });
      alert("Warehouse berhasil dibuat");
      navigate("/warehouse");
    } catch (error) {
      console.error("Error creating warehouse:", error);
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : String(error);
      alert("Gagal membuat warehouse: " + errorMessage);
      return;
    }
  };

  return (
    <ComponentCard title="Create Item">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="input">Nama Warehouse</Label>
            <Input
              type="text"
              id="name"
              placeholder="Warehouse Site A"
              value={namaWh}
              onChange={(e) => setNamaWh(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="input">Alamat Warehouse</Label>
            <Input
              type="text"
              id="alamat"
              placeholder="Jl. Raya No. 1"
              value={alamatWh}
              onChange={(e) => setAlamatWh(e.target.value)}
            />
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <Button type="submit" variant="success">
              Submit
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setNamaWh("");
                setAlamatWh("");
              }}
            >
              Clear
            </Button>
            <Button
                type="button"
                variant="danger"
                onClick={() => navigate("/warehouse")}
              >
                Close
              </Button>
          </div>
        </form>
      </div>
    </ComponentCard>
  );
}
