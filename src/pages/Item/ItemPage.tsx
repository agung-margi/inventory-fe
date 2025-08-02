import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ItemListComponents from "../../components/tables/BasicTables/ItemListComponents";


export default function ItemPage() {
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
          <ItemListComponents/>
          </ComponentCard>
      </div>
    </>
  );
}
