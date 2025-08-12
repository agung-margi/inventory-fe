import { useNavigate } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import PermintaanListComponents from "../../components/tables/Permintaan/PermintaanComponents";
import Button from "../../components/ui/button/Button";
import { PencilIcon } from "../../icons";
import ComponentCard from "../../components/common/ComponentCard";

export default function PermintaanPage() {
    const navigate = useNavigate();
  return (
    <div>
      <PageMeta
        title="Permintaan"
        description="Permintaan"
      />
      <PageBreadcrumb pageTitle="Permintaan" />
      
      {/* buatrkan button jika di klik akan pindah ke halaman permintaan/create */}
      <div className="flex justify-end">
        <Button size="sm" variant="success" startIcon={<PencilIcon className="size-4" />} className="mb-4" onClick={() => navigate('/permintaan/create')}  >
          Create Permintaan
        </Button>
      </div>
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