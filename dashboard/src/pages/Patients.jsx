import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaSearch,
  FaUserInjured,
  FaPhoneAlt,
} from "react-icons/fa";

import "./Patients.css";

const Patients = () => {

  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {

    try {

      const response = await axios.get(
        "http://localhost:4000/api/v1/patient/all"
      );

      setPatients(response.data.patients);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSearch = async () => {

    try {

      if (search.trim() === "") {

        fetchPatients();

        return;

      }

      const response = await axios.get(
        `http://localhost:4000/api/v1/patient/search/${search}`
      );

      setPatients(response.data.patients);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="patients-page">

      {/* Header */}

      <div className="patients-header">

        <div>

          <h1>

            <FaUsers />

            Patient CRM

          </h1>

          <p>

            Search and manage patient information.

          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="patients-stats">

        <div className="stat-card">

          <FaUsers className="stat-icon"/>

          <div>

            <h2>{patients.length}</h2>

            <p>Total Patients</p>

          </div>

        </div>

        <div className="stat-card">

          <FaUserInjured className="stat-icon"/>

          <div>

            <h2>{patients.length}</h2>

            <p>Medical Records</p>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="search-box">

        <div className="search-input">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Patient..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <button onClick={handleSearch}>

          Search

        </button>

      </div>

      {/* Table */}

      <div className="table-wrapper">

        <table className="patients-table">

          <thead>

            <tr>

              <th>Patient Name</th>

              <th>Phone Number</th>

              <th>Disease</th>

            </tr>

          </thead>

          <tbody>

            {patients.length > 0 ? (

              patients.map((patient) => (

                <tr
                  key={patient._id}
                  onClick={() => navigate(`/patient/${patient._id}`)}
                  style={{ cursor: "pointer" }}
                >

                  <td>

                    {patient.firstName} {patient.lastName}

                  </td>

                  <td>

                    <FaPhoneAlt className="phone-icon"/>

                    {patient.phone}

                  </td>

                  <td>

                    <span className="disease">

                      {patient.disease}

                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td colSpan="3">

                  No Patients Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Patients;