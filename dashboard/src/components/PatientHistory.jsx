import React, { useState } from "react";
import {
  FaSearch,
  FaUserInjured,
  FaHeartbeat,
  FaCalendarAlt,
  FaFileMedical,
} from "react-icons/fa";

import "./PatientHistory.css";

const PatientHistory = () => {

  const [search, setSearch] = useState("");

  const patients = [

    {
      id: 1,
      name: "Rahul Sharma",
      disease: "Heart Disease",
      date: "19 Jun 2026",
      doctor: "Dr. Amit Sharma",
      status: "Recovered",
    },

    {
      id: 2,
      name: "Priya Verma",
      disease: "Brain Tumor",
      date: "18 Jun 2026",
      doctor: "Dr. Kavita Rao",
      status: "Under Treatment",
    },

    {
      id: 3,
      name: "Rohan Patil",
      disease: "Liver Disease",
      date: "17 Jun 2026",
      doctor: "Dr. Sunil Patil",
      status: "Recovered",
    },

    {
      id: 4,
      name: "Sneha Joshi",
      disease: "Kidney Stone",
      date: "16 Jun 2026",
      doctor: "Dr. Rajesh Kumar",
      status: "Observation",
    },

  ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="historyPage">

      <div className="historyHeader">

        <div>

          <h1>

            <FaFileMedical />

            Patient History

          </h1>

          <p>

            Complete medical records and AI diagnosis history.

          </p>

        </div>

      </div>

      <div className="searchBox">

        <FaSearch />

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="historyTableCard">

        <table>

          <thead>

            <tr>

              <th>Patient</th>

              <th>Disease</th>

              <th>Doctor</th>

              <th>Date</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredPatients.map((patient) => (

                <tr key={patient.id}>

                  <td>

                    <div className="patientInfo">

                      <FaUserInjured />

                      {patient.name}

                    </div>

                  </td>

                  <td>

                    <span className="diseaseBadge">

                      <FaHeartbeat />

                      {patient.disease}

                    </span>

                  </td>

                  <td>{patient.doctor}</td>

                  <td>

                    <FaCalendarAlt />

                    {" "}
                    {patient.date}

                  </td>

                  <td>

                    <span
                      className={`status ${patient.status
                        .replace(/\s/g, "")
                        .toLowerCase()}`}
                    >

                      {patient.status}

                    </span>

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

export default PatientHistory;
