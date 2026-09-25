"use client";

import Swal from "sweetalert2";

export default function DeleteButton() {
  const handleDelete = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");

    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "ต้องการลบข้อมูลนี้ใช่หรือไม่!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบเลย",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        form.requestSubmit();
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="btn btn-sm btn-danger"
    >
      ลบ
    </button>
  );
}