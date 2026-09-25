import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import CreateProductForm from "@/components/CreateMemberForm";
 
 
export default function CreateProduct() {
 
    return (
        <>
 
            <NavbarAdmin />
 
            <BootstrapClient />
 
 
            <div className="container mt-5">
 
                <h1 className="mb-4">
                    เพิ่มสมาชิก
                </h1>
 
                <CreateProductForm />
 
            </div>
 
        </>
    );
}
 
 