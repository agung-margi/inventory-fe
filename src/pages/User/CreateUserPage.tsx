import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import CreateUserComponents from "../../components/tables/User/CreateUser";

export default function CreateUserPage() {
  return (
    <div>
      <PageMeta
        title="Admin | Register User"
        description="This is the Admin page for registering a new user."
      />
      <PageBreadcrumb pageTitle="User" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <CreateUserComponents />
        </div>
      </div>
    </div>
  );
}
