import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditCustomerForm from "@/components/EditCustomerForm";

export default async function EditCustomerPage({ params }) {
  const { id } = await params;

  const customer = await prisma.tbl_customer.findUnique({
    where: {
      cus_id: Number(id),
    },
  });

  if (!customer) {
    return (
      <>
        <NavbarAdmin />
        <BootstrapClient />
        <div className="container mt-5">
          <div className="alert alert-danger">ไม่พบข้อมูลลูกค้า</div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูลลูกค้า</h1>
        <EditCustomerForm customer={customer} />
      </div>
    </>
  );
}