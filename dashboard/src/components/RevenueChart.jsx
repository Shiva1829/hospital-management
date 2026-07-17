import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Cell,
} from "recharts";

import "./RevenueChart.css";

const COLORS = [
  "#2563eb",
  "#3b82f6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

const RevenueChart = ({ data }) => {
  return (
    <div className="revenueChartCard">

      <div className="chartHeader">

        <h2>Revenue Analytics</h2>

        <p>Department Wise Revenue Collection</p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={420}
      >

        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 20,
          }}
        >

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="department"
            tick={{
              fill: "#334155",
              fontSize: 13,
            }}
          />

          <YAxis
            tick={{
              fill: "#334155",
              fontSize: 13,
            }}
          />

          <Tooltip
            cursor={{
              fill: "#eff6ff",
            }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow:
                "0 8px 20px rgba(0,0,0,.15)",
            }}
          />

          <Legend />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            animationDuration={1500}
          >

            {data &&
              data.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default RevenueChart;