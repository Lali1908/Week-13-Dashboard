"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlertCustomer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "create") {
      Swal.fire({
        title: "เพิ่มข้อมูลลูกค้าสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.replace("/admin/customers");
      });
    } else if (success === "update") {
      Swal.fire({
        title: "แก้ไขข้อมูลลูกค้าสำเร็จ",
        text: "อัปเดตข้อมูลเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.replace("/admin/customers");
      });
    } else if (success === "delete") {
      Swal.fire({
        title: "ลบข้อมูลลูกค้าสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      }).then(() => {
        router.replace("/admin/customers");
      });
    }
  }, [success, router]);

  return null;
}