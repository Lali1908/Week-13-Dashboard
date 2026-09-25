"use client";
import { useActionState } from "react";
import { createMember } from "@/app/admin/members/create/actions";
 
const initialState = {
  errors: [],
  values: { member_code: "", member_name: "", member_major: "" },
};
 
export default function CreateMemberForm() {
  const [state, formAction, pending] = useActionState(createMember, initialState);
 
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
        <label className="form-label">รหัสสมาชิก</label>
        <input
          type="text"
          name="member_code"
          className="form-control"
          placeholder="เช่น 2313xxxxx"
          defaultValue={state?.values?.member_code || ""}
        />
      </div>
 
      <div className="mb-3">
        <label className="form-label">ชื่อ - นามสกุล</label>
        <input
          type="text"
          name="member_name"
          className="form-control"
          placeholder="เช่น ลลิxx xxxxxx"
          defaultValue={state?.values?.member_name || ""}
        />
      </div>
 
      <div className="mb-3">
        <label className="form-label">สาขาวิชา</label>
        <input
          type="text"
          name="member_major"
          className="form-control"
          placeholder="เช่น เทคโนโลยีสารสนเทศ (IT)"
          defaultValue={state?.values?.member_major || ""}
        />
      </div>
 
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? "กำลังบันทึก..." : "บันทึกสมาชิก"}
      </button>
    </form>
  );
}
 