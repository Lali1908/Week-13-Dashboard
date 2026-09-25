"use client";
import { useActionState } from "react";
import { updateMember } from "@/app/admin/members/update/[id]/actions";
 
export default function EditMemberForm({ member }) {
  const initialState = {
    errors: [],
    values: {
      id: member.id,
      member_code: member.member_code,
      member_name: member.member_name,
      member_major: member.member_major,
    },
  };
 
  const [state, formAction, pending] = useActionState(updateMember, initialState);
 
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
        <label className="form-label">รหัสสมาชิก</label>
        <input
          type="text"
          name="member_code"
          className="form-control"
          defaultValue={state?.values?.member_code}
        />
      </div>
 
      <div className="mb-3">
        <label className="form-label">ชื่อ - นามสกุล</label>
        <input
          type="text"
          name="member_name"
          className="form-control"
          defaultValue={state?.values?.member_name}
        />
      </div>
 
      <div className="mb-3">
        <label className="form-label">สาขาวิชา</label>
        <input
          type="text"
          name="member_major"
          className="form-control"
          defaultValue={state?.values?.member_major}
        />
      </div>
 
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
      </button>
    </form>
  );
}
