import { useNavigate } from "react-router";
import PageMeta from "../../../components/common/PageMeta";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Button from "../../../components/ui/button/Button";
import { PencilIcon } from "../../../icons";
import ComponentCard from "../../../components/common/ComponentCard";
import PermintaanListComponents from "../../../components/tables/Permintaan/PermintaanComponents";
import PengeluaranListComponents from "../../../components/tables/Pengeluaran/PengeluaranComponents";


export default function ListPengeluaranPage() {
    const navigate = useNavigate();
  return (
    <div>
      <PageMeta
        title="Admin | List Pengeluaran"
        description="List Pengeluaran"
      />
      <PageBreadcrumb pageTitle="List Pengeluaran" />

      {/* buatrkan button jika di klik akan pindah ke halaman pengeluaran/create */}
      <div className="flex justify-end">
        <Button size="sm" variant="success" startIcon={<PencilIcon className="size-4" />} className="mb-4" onClick={() => navigate('/pengeluaran/create')}  >
          Create Pengeluaran
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <div className="space-y-6">
            <ComponentCard title="List Pengeluaran">
              <PengeluaranListComponents />
            </ComponentCard>
        </div>
      </div>
    </div>
  );
}