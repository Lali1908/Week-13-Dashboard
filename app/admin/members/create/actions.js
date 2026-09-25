"use server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
 
export async function createMember(prevState, formData) {
  const member_code = formData.get("member_code")?.trim() || "";
  const member_name = formData.get("member_name")?.trim() || "";
  const member_major = formData.get("member_major")?.trim() || "";
 
  const errors = [];
 
  if (!member_code || member_code.length < 3) {
    errors.push("รหัสนักศึกษา/สมาชิกต้องมีอย่างน้อย 3 ตัวอักษร");
  }
  if (!member_name || member_name.length < 3) {
    errors.push("ชื่อ-นามสกุลต้องมีอย่างน้อย 3 ตัวอักษร");
  }
  if (!member_major) {
    errors.push("กรุณากรอกสาขาวิชา");
  }
 
  if (errors.length > 0) {
    return {
      errors,
      values: { member_code, member_name, member_major },
    };
  }
 
  try {
    await db.query(
      "INSERT INTO member (member_code, member_name, member_major) VALUES (?, ?, ?)",
      [member_code, member_name, member_major]
    );
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return {
        errors: ["รหัสสมาชิกนี้มีอยู่ในระบบแล้ว"],
        values: { member_code, member_name, member_major },
      };
    }
    throw err;
  }
 
  redirect("/admin/members?success=create");
}
 