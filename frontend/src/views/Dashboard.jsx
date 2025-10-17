import React, { useState } from "react";
import SideNav from "../components/SideNav";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Mock data
const studentPieData = {
  labels: ["Excellent", "Good", "Average", "Poor"],
  datasets: [
    {
      data: [10, 13, 6, 3],
      backgroundColor: ["#4F46E5", "#22C55E", "#FDAA2B", "#EF4444"],
    },
  ],
};

const subjects = ["Math", "Science", "English", "History", "Arts"];
const barData = (subject) => ({
  labels: ["Term 1", "Term 2", "Term 3", "Term 4"],
  datasets: [
    {
      label: `${subject} - Score Progress`,
      data: Array(4)
        .fill(0)
        .map(() => 60 + Math.floor(Math.random() * 40)),
      backgroundColor: "#6366F1",
    },
  ],
});

const tableData = [
  { name: "Priya Sharma", math: 92, sci: 85, eng: 78, progress: 0.93 },
  { name: "Samir Dixit", math: 67, sci: 88, eng: 91, progress: 0.78 },
  { name: "Anika Roy", math: 81, sci: 73, eng: 69, progress: 0.71 },
  { name: "Rahim Patel", math: 54, sci: 56, eng: 66, progress: 0.55 },
];

const kpiData = [
  { label: "Attendance", percent: 87, color: "blue" },
  { label: "Assignments", percent: 78, color: "green" },
  { label: "Quiz Avg.", percent: 65, color: "purple" },
];

// Circular Progress Component
function CircleStat({ percent = 0, color = "blue", size = 100, label }) {
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;
  const colors = {
    blue: "#2563EB",
    green: "#22C55E",
    purple: "#8B5CF6",
  };
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle
          r={r}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={stroke}
        />
        <circle
          r={r}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          stroke={colors[color]}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <text
          x="50%"
          y="54%"
          textAnchor="middle"
          fontSize="20"
          fill="#222"
          fontWeight="bold"
        >
          {percent}%
        </text>
      </svg>
      <span className="mt-2 text-lg font-semibold text-gray-600">{label}</span>
    </div>
  );
}

export default function Dashboard() {
  const [subject, setSubject] = useState(subjects[0]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-md border-r z-20">
        <SideNav />
      </aside>

      {/* Main content */}
      <div className="ml-64 mt-20 w-[calc(100%-16rem)] overflow-hidden">
        {/* Header */}
        <div className="fixed top-0 left-64 w-[calc(100%-16rem)] z-30 px-4 sm:px-8 lg:px-10 py-3 sm:py-4">
          <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-extrabold">EduLink</h1>
            <div className="flex gap-2 sm:gap-4 lg:gap-6 text-2xl sm:text-3xl lg:text-4xl">
              <button className="p-2 hover:bg-white/60 rounded-full">🔔</button>
              <button className="p-2 hover:bg-white/60 rounded-full">🔍</button>
              <button className="p-2 hover:bg-white/60 rounded-full">💬</button>
            </div>
          </div>
        </div>

        {/* Dashboard Body */}
        <main className="px-4 sm:px-8 lg:px-10 py-6 sm:py-8 overflow-y-auto h-[calc(100vh-5rem)] scrollbar-hide">
          <h2 className="text-4xl font-bold mb-10 text-gray-800">
            Student Performance Dashboard
          </h2>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Pie Chart */}
            <div className="card-glass rounded-2xl p-6 flex flex-col justify-center items-center">
              <div className="text-2xl font-bold mb-4">
                Performance Distribution
              </div>
              <div className="w-full h-[320px] sm:h-[420px] lg:h-[500px] flex justify-center items-center">
                <Pie
                  data={studentPieData}
                  options={{
                    plugins: { legend: { position: "bottom" } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="card-glass rounded-2xl p-6 flex flex-col justify-center items-center">
              <div className="flex justify-between items-center w-full mb-4">
                <span className="text-2xl font-bold">Progress by Subject</span>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border px-3 py-2 rounded text-gray-700 font-medium"
                >
                  {subjects.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="w-full h-[320px] sm:h-[420px] lg:h-[500px]">
                <Bar
                  data={barData(subject)}
                  options={{
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true, max: 100 } },
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>

            {/* KPI Circle Stats */}
            <div className="card-glass rounded-2xl p-8 flex flex-col justify-center items-center">
              <div className="text-2xl font-bold mb-6">Key Indicators</div>
              <div className="flex gap-6">
                {kpiData.map((stat) => (
                  <CircleStat
                    key={stat.label}
                    percent={stat.percent}
                    color={stat.color}
                    label={stat.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="card-glass rounded-2xl p-8">
            <div className="text-2xl font-bold mb-4">Student Score Table</div>
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="p-3 rounded-l-lg">Name</th>
                  <th className="p-3">Math</th>
                  <th className="p-3">Science</th>
                  <th className="p-3">English</th>
                  <th className="p-3 rounded-r-lg">Progress</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.name} className="bg-gray-50">
                    <td className="p-3 font-bold text-gray-700 rounded-l-xl">
                      {row.name}
                    </td>
                    <td className="p-3">{row.math}</td>
                    <td className="p-3">{row.sci}</td>
                    <td className="p-3">{row.eng}</td>
                    <td className="p-3 w-40">
                      <div className="bg-gray-200 rounded-full h-6">
                        <div
                          className="h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{
                            width: `${Math.round(row.progress * 100)}%`,
                          }}
                        >
                          {Math.round(row.progress * 100)}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { width: 0px; background: transparent; }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
}
