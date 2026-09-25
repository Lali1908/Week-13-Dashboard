"use client";

import Swal from "sweetalert2";

export default function DeleteButton() {

    const handleDelete = async (e) => {

        e.preventDefault();

        // เก็บ form ไว้ก่อน
        const form = e.currentTarget.form;

        const result = await Swal.fire({
            title: "ยืนยันการลบ?",
            text: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "ลบเลย",
            cancelButtonText: "ยกเลิก"
        });

        if (result.isConfirmed) {
            form.requestSubmit();
        }
    };

    return (
        <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={handleDelete}
        >
            ลบ
        </button>
    );
}