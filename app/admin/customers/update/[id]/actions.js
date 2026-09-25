"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateCustomer(prevState, formData) {
  const id = formData.get("id")?.trim() || "";
  const cus_phone = formData.get("cus_phone")?.trim() || "";
  const cus_name = formData.get("cus_name")?.trim() || "";

  const errors = [];

  if (!cus_phone || cus_phone.length !== 10) {
    errors.push("เบอร์โทรศัพท์ต้องมี 10 หลัก");
  }
  if (!cus_name || cus_name.length < 3) {
    errors.push("ชื่อลูกค้าต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ตรวจสอบเบอร์โทรซ้ำที่ไม่ใช่ของตัวเอง
  const existingPhone = await prisma.tbl_customer.findFirst({
    where: {
      cus_phone,
      NOT: { cus_id: Number(id) },
    },
  });

  if (existingPhone) {
    errors.push("เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว");
  }

  if (errors.length > 0) {
    return {
      errors,
      values: { id, cus_phone, cus_name },
    };
  }

  await prisma.tbl_customer.update({
    where: { cus_id: Number(id) },
    data: { cus_phone, cus_name },
  });

  redirect("/admin/customers?success=update");
}