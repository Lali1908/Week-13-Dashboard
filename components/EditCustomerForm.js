"use client";

import { useActionState } from "react";
import { updateCustomer } from "@/app/admin/customers/update/[id]/actions";
import Link from "next/link";

export default function EditCustomerForm({ customer }) {
  const initialState = {
    errors: [],
    values: {
      id: customer.cus_id,
      cus_phone: customer.cus_phone,
      cus_name: customer.cus_name,
    },
  };

  const [state, formAction, pending] = useActionState(
    updateCustomer,
    initialState
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={state?.values?.id} />

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
          defaultValue={state?.values?.cus_name || ""}
        />
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={pending}
        >
          {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
        </button>
        <Link href="/admin/customers" className="btn btn-secondary">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}