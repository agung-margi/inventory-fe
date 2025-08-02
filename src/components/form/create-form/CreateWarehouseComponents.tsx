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
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Superadmin" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure CSRF token is fetched before login/registerfetchCsrfToken

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    await register(email, password);
    navigate("/products");
  };

  return (
    <ComponentCard title="Create Warehouse">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="input">Nama Warehouse</Label>
            <Input type="text" id="name" placeholder="Masukan Nama Warehouse" />
          </div>
          <div>
            <Label htmlFor="input">Alamat</Label>
            <Input
              type="text"
              id="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
