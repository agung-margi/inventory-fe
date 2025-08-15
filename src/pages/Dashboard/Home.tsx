import EcommerceMetrics from "../../components/dashboard/DashboardMetrix";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Admin | Dasboard"
        description="Admin Dashboard"
      />
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <EcommerceMetrics /> */}
        </div>
      </div>
    </>
  );
}
