import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import UserList from "../../components/tables/BasicTables/UserListComponents";
import WarehouseListComponents from "../../components/tables/BasicTables/WarehouseListComponents";


export default function WarehousePage() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
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
