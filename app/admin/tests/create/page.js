import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateTestForm from "@/components/CreateTestForm";
import SuccessAlertTest from "@/components/SuccessAlertTest";
import { Suspense } from "react";
 
export default function CreateTest() {
 
    return (
        <>
            <Suspense fallback={null}>
                <SuccessAlertTest />
            </Suspense>
            <NavbarAdmin />
 
            <BootstrapClient />
 
 
            <div className="container mt-5">
 
                <h1 className="mb-4">
                    เพิ่มสมาชิก
                </h1>
 
                <CreateTestForm />
 
            </div>
 
        </>
    );
}
 
 