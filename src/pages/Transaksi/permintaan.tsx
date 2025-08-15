import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PermintaanListComponents from "../../components/tables/Permintaan/PermintaanComponents";
import Button from "../../components/ui/button/Button";
import { PencilIcon } from "../../icons";
import ComponentCard from "../../components/common/ComponentCard";
import { getMe } from "../../services/auth";

export default function PermintaanPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
  const fetchMe = async () => {
    try {
      const response = await getMe();
      console.log("User data:", response.data.role);
      const userRole = response.data.role || response.data?.user?.role;
      if (userRole) {
        setRole(userRole.toLowerCase()); // normalize ke lowercase
      }
    } catch (err) {
      console.error("Gagal fetch user:", err);
    }
  };
  fetchMe();
}, []);


  return (
    <div>
      <PageMeta title="Permintaan" description="Permintaan" />
      <PageBreadcrumb pageTitle="Permintaan" />

      {/* Hanya tampilkan tombol jika role bukan 'user' */}
      {role && role == "user" && (
  <div className="flex justify-end">
    <Button
      size="sm"
      variant="success"
      startIcon={<PencilIcon className="size-4" />}
      className="mb-4"
      onClick={() => navigate("/permintaan/create")}
    >
      Create Permintaan
    </Button>
  </div>
)}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-6">
          <ComponentCard title="List Permintaan">
            <PermintaanListComponents />
          </ComponentCard>
        </div>
      </div>
    </div>
  );
}
