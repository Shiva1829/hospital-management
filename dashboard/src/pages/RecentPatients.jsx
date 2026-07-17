import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserCircle,
  FaUserInjured,
  FaVenusMars,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";

import "./RecentPatients.css";

const RecentPatients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const list = patients.filter((patient) =>
      (
        patient.name ||
        `${patient.firstName || ""} ${patient.lastName || ""}`
      )
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredPatients(list);
  }, [search, patients]);

  const fetchPatients = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/patient/recent"
      );

      setPatients(data.patients || []);
      setFilteredPatients(data.patients || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recentPatients">

      <div className="recentHeader">

        <div>
          <h1>👨‍⚕️ Recent Patients</h1>
          <p>Latest registered patients in the hospital</p>
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

      </div>

      {loading ? (
        <div className="loader">
          <div className="spinner"></div>
          <h3>Loading Patients...</h3>
        </div>
      ) : filteredPatients.length === 0 ? (
        <div className="emptyBox">
          <FaUserInjured />
          <h2>No Recent Patients</h2>
          <p>No records available.</p>
        </div>
      ) : (
        <div className="patientsGrid">

          {filteredPatients.map((patient) => (

            <div className="patientCard" key={patient._id}>

              <div className="patientTop">

                <FaUserCircle className="avatar" />

                <div>

                  <h3>
                    {patient.name ||
                      `${patient.firstName || ""} ${patient.lastName || ""}`}
                  </h3>

                  <span>
                    Patient ID :
                    {" "}
                    {patient._id?.slice(-6)}
                  </span>

                </div>

              </div>

              <div className="patientInfo">

                <div>
                  <FaCalendarAlt />
                  <span>
                    Age :
                    {" "}
                    {patient.age || "N/A"}
                  </span>
                </div>

                <div>
                  <FaVenusMars />
                  <span>
                    Gender :
                    {" "}
                    {patient.gender || "N/A"}
                  </span>
                </div>

                <div>
                  📞
                  <span>
                    {patient.phone || "Not Available"}
                  </span>
                </div>

                <div>
                  ✉️
                  <span>
                    {patient.email || "Not Available"}
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default RecentPatients;