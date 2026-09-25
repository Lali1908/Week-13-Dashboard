"use server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTest(prevState, formData) {
  const name = formData.get("name")?.trim() || "";
  const lastname = formData.get("lastname")?.trim() || "";
  const errors = [];

  // name
  if (!name || name.length < 3) {
    errors.push({
      name: "name ต้องมีอย่างน้อย 3 ตัวอักษร",
    });
  }

  // ถ้ามี Error ส่งกลับไปหน้า Form
  if (errors.length > 0) {
    return {
      errors,
      
      values: {
        name,
        lastname,
      },
    };
  }

  // ผ่าน Validation ทุกข้อแล้วค่อยบันทึก
  await prisma.tbl_test.create({
    data: {
      name,
      lastname,
    },
  });

  redirect("/admin/tests?success=create");
}
