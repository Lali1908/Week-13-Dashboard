"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function SuccessAlert() {

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {

        if (searchParams.get("success") === "create") {

            Swal.fire({
                title: "เพิ่มข้อมูลสำเร็จ",
                text: "บันทึกสินค้าเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "ตกลง"
            });

            // ลบ ?success=create ออกจาก URL
            router.replace("/admin/products");
        }

         else if (searchParams.get("success") === "update") {

            Swal.fire({
                title: "บันทึกข้อมูลสำเร็จ",
                text: "คลิก ตกลง เพื่อกลับไหน้าหลัก",
                icon: "success",
                confirmButtonText: "ตกลง"
            });

            // ลบ ?success=create ออกจาก URL
            router.replace("/admin/products");
        }


    }, [searchParams, router]);

    return null;
}