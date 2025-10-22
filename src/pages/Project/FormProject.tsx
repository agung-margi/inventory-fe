import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CreateFormProject from "../../components/form/create-form/CreateFormProjectComponents";

export default function CreateProjectPage() {
  return (
    <div>
      <PageMeta
        title="Admin | Create Project"
        description="This is the Create Project page for Admin"
      />
      <PageBreadcrumb pageTitle="Project" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <CreateFormProject/>
        </div>
      </div>
    </div>
  );
}