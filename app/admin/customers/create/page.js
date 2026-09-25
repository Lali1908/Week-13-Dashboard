import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateCustomerForm from "@/components/CreateCustomerForm";

export default function CreateCustomerPage() {
  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">เพิ่มข้อมูลลูกค้า</h1>
        <CreateCustomerForm />
      </div>
    </>
  );
}