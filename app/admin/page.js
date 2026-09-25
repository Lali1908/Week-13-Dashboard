import CounterChart from "@/components/CounterChart";
import prisma from "@/lib/prisma";
import NavbarAdmin from "@/components/NavbarAdmin";
import BootstrapClient from "@/components/BootstrapClient";
import Link from "next/link";

export default async function Dashboard() {
  // 1. นับจำนวนสินค้า
  const totalProducts = await prisma.products.count();

  // 2. ผลรวม stock
  const result = await prisma.products.aggregate({
    _sum: {
      stock: true,
    },
  });
  const totalStock = result._sum.stock ?? 0;

  // 3. ดึงสถิติเข้าชมจาก tbl_counter
  const counterData = await prisma.$queryRaw`
    SELECT 
        MONTH(dateCreate) AS month,
        CAST(COUNT(*) AS SIGNED) AS total
    FROM tbl_counter
    WHERE YEAR(dateCreate) = 2026
    GROUP BY MONTH(dateCreate)
    ORDER BY month ASC`;

  const monthNames = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.",
  ];

  const chartData = (counterData || []).map((item) => {
    const m = Number(item.month);
    return {
      month: monthNames[m - 1] || `เดือน ${m}`,
      total: Number(item.total || 0),
    };
  });

  return (
    <>
      <NavbarAdmin />
      <BootstrapClient />

      <div className="container mt-3">
        <h4 className="mb-3">Dashboard</h4>

        {/* กล่องสรุปสถิติ 4 กล่อง */}
        <div className="row g-3">
          {/* Box 1 */}
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 mb-2">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ backgroundColor: "rgb(183, 237, 199)" }}
            >
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-sm-3 text-center">
                    <i className="bi bi-cart-check fs-1"></i>
                  </div>
                  <div className="col-sm-9">
                    <div>ยอดขายวันนี้</div>
                    <p className="fs-4 fw-bold mb-0">฿85,000.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 mb-2">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ backgroundColor: "rgb(183, 237, 199)" }}
            >
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-sm-3 text-center">
                    <i className="bi bi-box-seam fs-1"></i>
                  </div>
                  <div className="col-sm-9">
                    <div>สินค้าทั้งหมด</div>
                    <p className="fs-4 fw-bold mb-0">{totalProducts}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3 */}
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 mb-2">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ backgroundColor: "rgb(183, 237, 199)" }}
            >
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-sm-3 text-center">
                    <i className="bi bi-stack fs-1"></i>
                  </div>
                  <div className="col-sm-9">
                    <div>Stock รวม</div>
                    <p className="fs-4 fw-bold mb-0">{totalStock}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box 4 */}
          <div className="col-6 col-sm-4 col-md-4 col-lg-3 mb-2">
            <div
              className="card shadow-sm border-0 h-100"
              style={{ backgroundColor: "rgb(183, 237, 199)" }}
            >
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-sm-3 text-center">
                    <i className="bi bi-cash-coin fs-1"></i>
                  </div>
                  <div className="col-sm-9">
                    <div>ยอดขายรวม</div>
                    <p className="fs-4 fw-bold mb-0">฿85,000.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ส่วนแสดงกราฟ */}
        <div className="mt-4 mb-5">
          <CounterChart data={chartData} />
        </div>
      </div>
    </>
  );
}