import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import { useNavigate } from "react-router";
import Button from "../../ui/button/Button.tsx";
import { register } from "../../../services/auth.tsx";

export default function CreateWarehouseComponents() {
  const [nama, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // await register(nama, password); nanti dulu
    console.log(nama,alamat)
    navigate("/");
  };

  return (
    <ComponentCard title="Create Warehouse">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="nama">Nama Warehouse</Label>
            <Input
              type="text"
              id="name"
              placeholder="Masukan Nama Warehouse"
              value={nama}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="alamat">Alamat</Label>
            <Input
              type="text"
              id="alamat"
              placeholder="Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            />
          </div>
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
