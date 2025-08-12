import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import Select from "../Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons/index.ts";
import { register } from "../../../services/auth.tsx";
import { useNavigate } from "react-router";
import Button from "../../ui/button/Button.tsx";

export default function CreateItemComponents() {
  const [showPassword, setShowPassword] = useState(false);
  const [designator, setDsignator] = useState("");
  const [nama_item, setNama_item] = useState("");
  const [kategori, setKategori] = useState("");
  const [satuan, setsatuan] = useState("");
  const [created_at, setCreated_at] = useState("");
  const [action, setAction] = useState("");
  const options = [
    { value: "clamp-hook", label: "CLAMP-HOOK" },
    { value: "ku", label: "Kabel Udara" },
    { value: "tiang", label: "Tiang" },
    { value: "s-clamp", label: "S-Clamp" },
  ];

  
  const navigate = useNavigate();

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure CSRF token is fetched before login/registerfetchCsrfToken

  

    //await register(email, password);
    navigate("/items");
  };

  return (
    <ComponentCard title="Create Item">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="input">Kode Barang</Label>
            <Input type="text" id="name" placeholder="KODE-ITEM-1" />
          </div>
          <div>
            <Label htmlFor="input">Nama Barang</Label>
            <Input type="text" id="name" placeholder="Item 1" />
          </div>
          <div>
            <Label>Jenis Barang</Label>
            <Select
              options={options}
              placeholder="Select Option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
  <Label htmlFor="satuan">Satuan</Label>
  <select
    id="satuan"
    name="satuan"
    className="border rounded p-2 w-full"
    defaultValue=""
  >
    <option value="" disabled>Pilih satuan</option>
    <option value="pcs">Pcs</option>
    <option value="box">Meter</option>
     </select>
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
