import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SuccessAlertCustomer from "@/components/SuccessAlertCustomer";
import DeleteButton from "@/components/SweetAlertDel";
import { Suspense } from "react";

export default async function CustomerListPage() {
  const customers = await prisma.tbl_customer.findMany({
    orderBy: { cus_id: "asc" },
  });

  async function deleteCustomer(formData) {
    "use server";
    const id = formData.get("id");

    await prisma.tbl_customer.delete({
      where: {
        cus_id: Number(id),
      },
    });

    revalidatePath("/admin/customers");
    redirect("/admin/customers?success=delete");
  }

  return (
    <>
      <Suspense fallback={null}>
        <SuccessAlertCustomer />
      </Suspense>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>จัดการข้อมูลลูกค้า</h2>
          <Link href="/admin/customers/create" className="btn btn-primary">
            + เพิ่มลูกค้า
          </Link>
        </div>

        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>เบอร์โทรศัพท์</th>
              <th>ชื่อ-นามสกุล</th>
              <th>วันที่สร้าง</th>
              <th style={{ width: "100px" }}>แก้ไข</th>
              <th style={{ width: "100px" }}>ลบ</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  ยังไม่มีข้อมูลลูกค้า
                </td>
              </tr>
            ) : (
              customers.map((item) => (
                <tr key={item.cus_id}>
                  <td>{item.cus_id}</td>
                  <td>{item.cus_phone}</td>
                  <td>{item.cus_name}</td>
                  <td>{new Date(item.dateCreate).toLocaleString("th-TH")}</td>
                  <td>
                    <Link
                      href={`/admin/customers/update/${item.cus_id}`}
                      className="btn btn-warning btn-sm"
                    >
                      edit
                    </Link>
                  </td>
                  <td>
                    <form action={deleteCustomer}>
                      <input
                        type="hidden"
                        name="id"
                        value={item.cus_id}
                      />
                      <DeleteButton />
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}