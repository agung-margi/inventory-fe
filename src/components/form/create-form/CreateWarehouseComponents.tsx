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

export default function CreateWarehouseComponents() {
  const [nama, setNama] = useState("");

  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    

    // await register(nama, alamat);
     navigate("/warehouses");
    console.log(nama,alamat)
  };

  return (
    <ComponentCard title="Create Warehouse">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="input">Nama Warehouse</Label>
            <Input type="text" id="name" placeholder="Masukan Nama Warehouse" value={nama}
              onChange={(e) => setNama(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="input">Alamat</Label>
            <Input
              type="text"
              id="alamat"
              placeholder="example kawasan hyundai no 31"
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
