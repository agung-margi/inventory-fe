import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CreatePengeluaranComponents from "../../components/form/create-form/CreatePengeluarancomponents copy";

export default function CreatePengeluaranPage() {
  return (
    <div>
      <PageMeta
        title="Admin | Create Pengeluaran"
        description="This is the Create Pengeluaran page for Admin"
      />
      <PageBreadcrumb pageTitle="Transaksi" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <CreatePengeluaranComponents />
        </div>
      </div>
    </div>
  );
}