"use client";

import { useActionState } from "react";
import { createCustomer } from "@/app/admin/customers/create/actions";
import Link from "next/link";

const initialState = {
  errors: [],
  values: {
    cus_phone: "",
    cus_name: "",
  },
};

export default function CreateCustomerForm() {
  const [state, formAction, pending] = useActionState(
    createCustomer,
    initialState
  );

  return (
    <form action={formAction}>
      {state?.errors?.length > 0 && (
        <div className="alert alert-danger" role="alert">
          <strong>กรุณาตรวจสอบข้อมูล</strong>
          <ul className="mb-0 mt-2">
            {state.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">เบอร์โทรศัพท์ (10 หลัก)</label>
        <input
          type="text"
          className="form-control"
          name="cus_phone"
          placeholder="เช่น 0812345678"
          maxLength={10}
          defaultValue={state?.values?.cus_phone || ""}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">ชื่อ-นามสกุลลูกค้า</label>
        <input
          type="text"
          className="form-control"
          name="cus_name"
          placeholder="ระบุชื่อลูกค้า"
          defaultValue={state?.values?.cus_name || ""}
        />
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={pending}
        >
          {pending ? "กำลังบันทึก..." : "บันทึก"}
        </button>
        <Link href="/admin/customers" className="btn btn-secondary">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}