import React from "react";
import Chart from "react-apexcharts";

import "./AnalyticsChart.css";

const AnalyticsChart = () => {

  const options = {

    chart: {
      type: "area",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
      },
    },

    colors: ["#2563eb"],

    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 4,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
      },
    },

    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 5,
    },

    markers: {
      size: 5,
      colors: ["#2563eb"],
      strokeColors: "#fff",
      strokeWidth: 3,
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ],
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "13px",
        },
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#64748b",
          fontSize: "13px",
        },
      },
    },

    tooltip: {
      theme: "light",
    },

    legend: {
      show: false,
    },

  };

  const series = [

    {
      name: "Patients",
      data: [
        25,
        50,
        72,
        96,
        135,
        182,
      ],
    },

  ];

  return (

    <section className="analyticsChartCard">

      <div className="chartHeader">

        <div>

          <h2>Patient Growth Analytics</h2>

          <p>
            Monthly patient registrations
          </p>

        </div>

        <span className="growthBadge">
          +28%
        </span>

      </div>

      <Chart
        options={options}
        series={series}
        type="area"
        height={340}
      />

    </section>

  );

};

export default AnalyticsChart;