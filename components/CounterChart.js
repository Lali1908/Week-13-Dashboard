"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function CounterChart({ data }) {
  const labels = data.map((item) => item.month);
  const values = data.map((item) => item.total);

  // 1. Data สำหรับ Bar Chart
  const barData = {
    labels,
    datasets: [
      {
        label: "จำนวนผู้เข้าชม (คน)",
        data: values,
        backgroundColor: [
          "#0d6efd",
          "#6610f2",
          "#6f42c1",
          "#d63384",
          "#dc3545",
          "#fd7e14",
          "#ffc107",
          "#198754",
          "#20c997",
          "#0dcaf0",
          "#6c757d",
          "#343a40",
        ],
        borderRadius: 6,
        borderWidth: 1,
      },
    ],
  };

  // 2. Data สำหรับ Line Chart
  const lineData = {
    labels,
    datasets: [
      {
        label: "แนวโน้มการเข้าชม",
        data: values,
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13, 110, 253, 0.15)",
        tension: 0.35,
        fill: true,
        pointBackgroundColor: "#0d6efd",
        pointRadius: 4,
      },
    ],
  };

  // 3. Data สำหรับ Doughnut Chart (สัดส่วนผู้เข้าชม)
  const doughnutData = {
    labels,
    datasets: [
      {
        label: "สัดส่วนผู้เข้าชม",
        data: values,
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
          "#6f42c1",
          "#fd7e14",
          "#20c997",
          "#0dcaf0",
          "#d63384",
          "#6c757d",
          "#5a5c69",
        ],
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = (titleText) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: titleText,
        font: { size: 14, weight: "bold" },
      },
    },
  });

  return (
    <div className="row g-4 mt-2">
      {/* กราฟที่ 1: Bar Chart */}
      <div className="col-12 col-lg-8">
        <div className="card shadow-sm border-0 h-100 rounded-3">
          <div className="card-body">
            <h6 className="fw-bold text-primary mb-3">
              <i className="bi bi-bar-chart-fill me-2"></i> สถิติผู้เข้าชมรายเดือน ปี 2026
            </h6>
            <div style={{ height: "300px" }}>
              <Bar
                data={barData}
                options={{
                  ...chartOptions("จำนวนผู้เข้าชมรายเดือน ปี 2026"),
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* กราฟที่ 2: Doughnut Chart */}
      <div className="col-12 col-lg-4">
        <div className="card shadow-sm border-0 h-100 rounded-3">
          <div className="card-body">
            <h6 className="fw-bold text-success mb-3">
              <i className="bi bi-pie-chart-fill me-2"></i> สัดส่วนการเข้าชมรายเดือน
            </h6>
            <div style={{ height: "300px" }}>
              <Doughnut
                data={doughnutData}
                options={chartOptions("สัดส่วนผู้เข้าชม")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* กราฟที่ 3: Line Chart */}
      <div className="col-12">
        <div className="card shadow-sm border-0 rounded-3">
          <div className="card-body">
            <h6 className="fw-bold text-info mb-3">
              <i className="bi bi-graph-up me-2"></i> แนวโน้มการเข้าชมเว็บแบบเส้น (Line Trend)
            </h6>
            <div style={{ height: "260px" }}>
              <Line
                data={lineData}
                options={{
                  ...chartOptions("แนวโน้มผู้เข้าชม"),
                  scales: { y: { beginAtZero: true } },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}