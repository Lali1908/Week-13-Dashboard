"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateTest(prevState, formData) {
  const id = formData.get("id")?.trim() || "";
  const name = formData.get("name")?.trim() || "";
  const lastname = formData.get("lastname")?.trim() || "";

  const errors = [];

  // name
  if (!name || name.length < 3) {
    errors.push("name ต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // lastname
  if (!lastname || lastname.length < 3) {
    errors.push("lastname ต้องมีอย่างน้อย 3 ตัวอักษร");
  }

  // ถ้ามี Error ส่งกลับไปหน้า Form
  if (errors.length > 0) {
    return {
      errors,
      values: { id, name, lastname },
    };
  }

  // ผ่าน Validation แล้วอัปเดตด้วย Prisma
  await prisma.tbl_test.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      lastname,
    },
  });

  redirect("/admin/tests?success=update");
}
