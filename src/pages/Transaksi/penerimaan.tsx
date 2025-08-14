import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CreatePenerimaanComponents from "../../components/form/create-form/CreatePenerimaan";

export default function CreatePenerimaanPage() {
  return (
    <div>
      <PageMeta
        title="Admin | Create Penerimaan"
        description="This is the Create Pengeluaran page for Admin"
      />
      <PageBreadcrumb pageTitle="Transaksi" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <CreatePenerimaanComponents/>
        </div>
      </div>
    </div>
  );
}