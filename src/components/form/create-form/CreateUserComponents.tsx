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

export default function CreateUserComponents() {
  const [showPassword, setShowPassword] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [kode_wh, setKode_wh] = useState("");
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
    navigate("/users");
  };

  return (
    <ComponentCard title="Register User">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="input">Nama Lengkap</Label>
            <Input type="text" id="name" placeholder="John Doe" />
          </div>
          <div>
            <Label htmlFor="input">Alamat Email</Label>
            <Input
              type="text"
              id="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="input">No. Handphone</Label>
            <Input
              type="text"
              id="email"
              placeholder="62812xxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select
              options={roles}
              placeholder="Select an option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label>Password Input</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </button>
            </div>
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
