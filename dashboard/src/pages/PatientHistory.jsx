import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaHistory,
  FaUserInjured,
  FaPhoneAlt,
} from "react-icons/fa";

import SearchPatient from "../components/SearchPatient";
import "./PatientHistory.css";

const PatientHistory = () => {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {

      const response = await axios.get(
        "http://localhost:4000/api/v1/patient/all"
      );

      setPatients(response.data.patients);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="patient-history-page">

      {/* Header */}

      <div className="history-header">

        <div>

          <h1>

            <FaHistory />

            Patient History

          </h1>

          <p>

            Complete patient records and medical history.

          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="history-stats">

        <div className="history-card">

          <FaUsers className="history-icon"/>

          <div>

            <h2>{patients.length}</h2>

            <p>Total Patients</p>

          </div>

        </div>

        <div className="history-card">

          <FaUserInjured className="history-icon"/>

          <div>

            <h2>{patients.length}</h2>

            <p>Medical Records</p>

          </div>

        </div>

        <div className="history-card">

          <FaPhoneAlt className="history-icon"/>

          <div>

            <h2>24×7</h2>

            <p>Support</p>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="search-section">

        <SearchPatient
          setPatients={setPatients}
        />

      </div>

      {/* Table */}

      <div className="table-container">

        <table className="history-table">

          <thead>

            <tr>

              <th>Patient Name</th>

              <th>Phone Number</th>

              <th>Disease</th>

              <th>Age</th>

            </tr>

          </thead>

          <tbody>

            {patients.length > 0 ? (

              patients.map((patient) => (

                <tr key={patient._id}>

                  <td>

                    {patient.firstName} {patient.lastName}

                  </td>

                  <td>

                    {patient.phone}

                  </td>

                  <td>

                    <span className="disease-tag">

                      {patient.disease}

                    </span>

                  </td>

                  <td>

                    {patient.age}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="4">

                  No Patient Records Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default PatientHistory;