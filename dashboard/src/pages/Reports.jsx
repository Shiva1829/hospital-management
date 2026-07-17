import React, { useState } from "react";
import {
  FaFileMedical,
  FaSearch,
  FaDownload,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import "./Reports.css";

const Reports = () => {

  const [search, setSearch] = useState("");

  const reports = [

    {
      id: "P001",
      patient: "Rahul Sharma",
      report: "MRI Brain",
      doctor: "Dr. Kumar",
      date: "18-06-2026",
      status: "Completed",
    },

    {
      id: "P002",
      patient: "Priya Singh",
      report: "Chest X-Ray",
      doctor: "Dr. Mehta",
      date: "19-06-2026",
      status: "Completed",
    },

    {
      id: "P003",
      patient: "Ankit Patel",
      report: "Blood Report",
      doctor: "Dr. Reddy",
      date: "20-06-2026",
      status: "Pending",
    },

  ];

  const filteredReports = reports.filter((item) =>
    item.patient.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="reports-page">

      <div className="reports-header">

        <div>

          <h1>

            <FaFileMedical />

            Medical Reports

          </h1>

          <p>

            Manage and download patient medical reports.

          </p>

        </div>

      </div>

      <div className="reports-summary">

        <div className="summary-card">

          <FaFileMedical />

          <div>

            <h2>{reports.length}</h2>

            <p>Total Reports</p>

          </div>

        </div>

        <div className="summary-card">

          <FaCheckCircle className="green"/>

          <div>

            <h2>

              {reports.filter(r=>r.status==="Completed").length}

            </h2>

            <p>Completed</p>

          </div>

        </div>

        <div className="summary-card">

          <FaClock className="orange"/>

          <div>

            <h2>

              {reports.filter(r=>r.status==="Pending").length}

            </h2>

            <p>Pending</p>

          </div>

        </div>

      </div>

      <div className="search-box">

        <FaSearch />

        <input

          type="text"

          placeholder="Search Patient..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

        />

      </div>

      <div className="table-card">

        <table>

          <thead>

            <tr>

              <th>Patient ID</th>

              <th>Patient</th>

              <th>Report</th>

              <th>Doctor</th>

              <th>Date</th>

              <th>Status</th>

              <th>Download</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredReports.map((item)=>(

                <tr key={item.id}>

                  <td>{item.id}</td>

                  <td>{item.patient}</td>

                  <td>{item.report}</td>

                  <td>{item.doctor}</td>

                  <td>{item.date}</td>

                  <td>

                    <span

                      className={

                        item.status==="Completed"

                        ? "status completed"

                        : "status pending"

                      }

                    >

                      {item.status}

                    </span>

                  </td>

                  <td>

                    <button className="download-btn">

                      <FaDownload />

                      Download

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Reports;