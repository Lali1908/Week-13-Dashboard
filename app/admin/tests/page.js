import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SuccessAlertTest from "@/components/SuccessAlertTest";
import DeleteButton from "@/components/SweetAlertDel";
import { Suspense } from "react";

export default async function Home() {
  const tests = await prisma.tbl_test.findMany();

  async function deleteTest(formData) {
    "use server";
    const id = formData.get("id");

    await prisma.tbl_test.delete({
      where: {
        id: Number(id),
      },
    });

    revalidatePath("/admin/tests");
    redirect("/admin/tests?success=delete");
  }

  return (
    <>
      <Suspense fallback={null}>
        <SuccessAlertTest />
      </Suspense>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>รายการทดสอบ</h2>
          <Link href="/admin/tests/create" className="btn btn-primary">
            + ข้อมูล
          </Link>
        </div>

        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>Name</th>
              <th>Lastname</th>
              <th style={{ width: "100px" }}>edit</th>
              <th style={{ width: "100px" }}>remove</th>
            </tr>
          </thead>
          <tbody>
            {tests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  ยังไม่มีข้อมูล
                </td>
              </tr>
            ) : (
              tests.map((item) => (
                <tr key={item.id}>
                  <td className="text-center">{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.lastname}</td>
                  <td className="text-center">
                    <Link
                      href={`/admin/tests/update/${item.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      edit
                    </Link>
                  </td>
                  <td className="text-center">
                    <form action={deleteTest}>
                      <input
                        type="hidden"
                        name="id"
                        value={item.id}
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