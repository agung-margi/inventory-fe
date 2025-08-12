import { useState } from "react";
import ComponentCard from "../../common/ComponentCard.tsx";
import { EyeCloseIcon, EyeIcon } from "../../../icons/index.ts";
import { register } from "../../../services/auth.tsx";
import { useNavigate } from "react-router";
import Button from "../../ui/button/Button.tsx";
import Label from "../../form/Label.tsx";
import Input from "../../form/input/InputField.tsx";
import Select from "../../form/Select.tsx";
import { toast } from "react-toastify";

type CreateUserFormData = {
  nama: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: string;
};

export default function CreateUserComponents({
  onSubmit,
}: {
  onSubmit?: (data: CreateUserFormData) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "manager", label: "Manager" },
  ];

  const handleSelectChange = (value: string) => {
    setRole(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !nama || !confirmPassword || !role || !phone) {
      alert("Mohon isi semua field yang wajib");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama");
      return;
    }

    try {
      // Kamu bisa kirim data lengkap ke API register
      await register(nama, email, phone, password, confirmPassword, role);
      toast.success("Registrasi berhasil");
      navigate("/users");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    }
  };

  const handleClear = () => {
    setNama("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setPhone("");
    setRole("");
  };

  return (
    <ComponentCard title="Register User">
      <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input
              type="text"
              id="name"
              placeholder="John Doe"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="phone">No. Handphone</Label>
            <Input
              type="text"
              id="phone"
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
              value={role}
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                )}
              </button>
            </div>
          </div>

          <div>
            <Label>Konfirmasi Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Konfirmasi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                tabIndex={-1}
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
            <Button type="button" variant="danger" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
      </div>
    </ComponentCard>
  );
}
