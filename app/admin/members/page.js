import db from "@/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import SuccessAlert from "@/components/SuccessAlert";
 
export default async function MemberPage() {
  // ดึงข้อมูลสมาชิกทั้งหมด เรียงจากล่าสุดมาก่อน
  const [members] = await db.query("SELECT * FROM member ORDER BY id DESC");
 
  // ฟังก์ชันลบสมาชิก (Server Action)
  async function deleteMember(formData) {
    "use server";
    const id = formData.get("id");
    await db.query("DELETE FROM member WHERE id = ?", [id]);
    revalidatePath("/admin/members");
  }
 
  return (
    <>
      <SuccessAlert />
      <NavbarAdmin />
      <BootstrapClient />
 
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>รายชื่อสมาชิก</h2>
          <Link href="/admin/members/create" className="btn btn-primary">
            + เพิ่มสมาชิก
          </Link>
        </div>
 
        <table className="table table-bordered table-striped text-center align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "80px" }}>ID</th>
              <th>รหัสสมาชิก</th>
              <th>ชื่อ-นามสกุล</th>
              <th>สาขาวิชา</th>
              <th>วันที่สร้าง</th>
              <th style={{ width: "160px" }}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  ยังไม่มีข้อมูลสมาชิก
                </td>
              </tr>
            ) : (
              members.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.member_code}</td>
                  <td className="text-start">{item.member_name}</td>
                  <td className="text-start">{item.member_major}</td>
                  <td>{new Date(item.dateCreate).toLocaleString("th-TH")}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Link
                        href={`/admin/members/update/${item.id}`}
                        className="btn btn-sm btn-primary"
                      >
                        edit
                      </Link>
 
                      <form action={deleteMember}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="btn btn-sm btn-danger"
                        >
                          ลบ
                        </button>
                      </form>
                    </div>
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
 