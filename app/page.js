import Navbar from "@/components/Navbar";
import BootstrapClient from "@/components/BootstrapClient";
import db from "@/lib/db";
import Link from "next/link";

import prisma from "@/lib/prisma";

export default async function Home() {

    const [products] = await db.query(
        "SELECT * FROM products ORDER BY id DESC"
    );

    // เพิ่ม counter ทุกครั้งที่เปิดหน้า
        // เวลาไทย UTC+7
            const now = new Date();

            const thaiTime = new Date(
                now.getTime() + (7 * 60 * 60 * 1000)
            );

        // เพิ่ม counter
            await prisma.tbl_counter.create({
                data: {
                    dateCreate: thaiTime
                }
            });

    return (
        <>
            <Navbar />

            <BootstrapClient />

            <div className="container mt-5">

                <h1 className="mb-4">
                    รายการสินค้า
                </h1>

                <div className="row">

                    {products.map((product) => (

                        <div
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                            key={product.id}
                        >

                            <div className="card h-100">

                                <img
                                    src={product.img_url}
                                    className="card-img-top"
                                    alt={product.name}
                                />

                                <div className="card-body">

                                    <h5 className="card-title">
                                        {product.name}
                                    </h5>

                                    <p className="card-text">
                                        ราคา{" "}
                                        {Number(product.price).toLocaleString()}
                                        {" "}บาท
                                    </p>

                                    <Link
                                        href={`/products/${product.id}`}
                                        className="btn btn-primary"
                                    >
                                        ดูรายละเอียด
                                    </Link>


                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </>
    );
}

