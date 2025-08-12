import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import WarehouseListComponents from "../../components/tables/Warehouse/WarehouseListComponents";



export default function WarehousePage() {
  return (
    <>
      <PageMeta
        title="Admin | Warehouse"
        description="This is the Warehouse page for Admin"
      />
      <PageBreadcrumb pageTitle="Warehouse" />
      <div className="space-y-6">
        <ComponentCard title="Warehouse List">
          {/* <BasicTableOne /> */}
          <WarehouseListComponents/>
          </ComponentCard>
      </div>
    </>
  );
}
