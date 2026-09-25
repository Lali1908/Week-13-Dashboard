"use client";

import { useActionState } from "react";
import { createTest } from "@/app/admin/tests/create/actions";
import Link from "next/link";

const initialState = {
  errors: [],
  values: {
    name: "",
    lastname: "",
  },
};

export default function CreateTestForm() {
  const [state, formAction, pending] = useActionState(
    createTest,
    initialState
  );

  return (
    <form action={formAction}>
      {/* name */}
      <div className="mb-3">
        <label className="form-label">ชื่อ</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="ชื่อ"
          defaultValue={state?.values?.name || ""}
        />
        {state?.errors?.find((e) => e.name) && (
          <div className="text-danger mt-1">
            {state.errors.find((e) => e.name)?.name}
          </div>
        )}
      </div>

      {/* lastname */}
      <div className="mb-3">
        <label className="form-label">นามสกุล</label>
        <input
          type="text"
          className="form-control"
          name="lastname"
          placeholder="นามสกุล"
          defaultValue={state?.values?.lastname || ""}
        />
        {state?.errors?.find((e) => e.lastname) && (
          <div className="text-danger mt-1">
            {state.errors.find((e) => e.lastname)?.lastname}
          </div>
        )}
      </div>

      <div className="d-flex gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={pending}
        >
          {pending ? "กำลังบันทึก..." : "บันทึก"}
        </button>
        <Link href="/admin/tests" className="btn btn-secondary">
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}