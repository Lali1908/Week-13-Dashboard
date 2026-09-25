import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import EditTestForm from "@/components/EditTestForm";

export default async function EditTestPage({ params }) {
  const { id } = await params;

  // ดึงข้อมูลเดิมจากตาราง tbl_test ด้วย Prisma
  const test = await prisma.tbl_test.findUnique({
    where: {
      id: Number(id),
    },
  });

  // ถ้าไม่พบข้อมูล
  if (!test) {
    return (
      <>
        <NavbarAdmin />
        <BootstrapClient />

        <div className="container mt-5">
          <div className="alert alert-danger">
            ไม่พบข้อมูล
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <h1 className="mb-4">แก้ไขข้อมูล</h1>
        <EditTestForm test={test} />
      </div>
    </>
  );
}
