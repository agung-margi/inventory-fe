import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
// Update the import path and extension if needed, for example:
import DisplayStockComponents from "../../components/tables/BasicTables/DisplayStockComponents";
// or, if the file is named 'DisplayStockComponents.tsx':
// import DisplayStockComponents from "../../components/tables/BasicTables/DisplayStockComponents.tsx";


export default function DisplayStokpage() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Items" />
      <div className="space-y-6">
        <ComponentCard title="Items List">
          {/* <BasicTableOne /> */}
          <DisplayStockComponents/>
          </ComponentCard>
      </div>
    </>
  );
}