import React, { useState } from "react";
import axios from "axios";
import {
  FaSearch,
  FaUserInjured,
  FaPhoneAlt,
  FaVenusMars,
  FaBirthdayCake,
} from "react-icons/fa";

import "./PatientSearch.css";

const PatientSearch = () => {

  const [keyword, setKeyword] = useState("");

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  const searchPatient = async () => {

    if (keyword.trim() === "") return;

    try {

      setLoading(true);

      const { data } = await axios.get(
        `https://hospital-backend-28d9.onrender.com/api/v1/patient/search/${keyword}`
      );

      setPatients(data.patients);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <div className="patient-search-page">

      <div className="patient-search-card">

        <div className="search-header">

          <FaSearch className="search-icon"/>

          <h1>Patient Search</h1>

          <p>

            Search hospital patient records instantly.

          </p>

        </div>

        <div className="search-area">

          <input
            type="text"
            placeholder="Enter Patient Name..."
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchPatient();
              }
            }}
          />

          <button
            onClick={searchPatient}
          >

            <FaSearch />

            Search

          </button>

        </div>

        {loading && (

          <div className="loader">

            Searching Patient...

          </div>

        )}

        <div className="patient-results">

          {patients.length > 0 ? (

            patients.map((patient)=>(

              <div
                key={patient._id}
                className="patient-card"
              >

                <div className="patient-avatar">

                  <FaUserInjured/>

                </div>

                <div className="patient-info">

                  <h2>

                    {patient.firstName} {patient.lastName}

                  </h2>

                  <p>

                    <FaPhoneAlt/>

                    {patient.phone}

                  </p>

                  <p>

                    <FaVenusMars/>

                    {patient.gender}

                  </p>

                  <p>

                    <FaBirthdayCake/>

                    Age : {patient.age}

                  </p>

                  <span className="disease-tag">

                    {patient.disease}

                  </span>

                </div>

              </div>

            ))

          ) : (

            !loading && (

              <div className="empty-box">

                <FaSearch className="empty-icon"/>

                <h3>No Patient Found</h3>

                <p>

                  Search patient by name.

                </p>

              </div>

            )

          )}

        </div>

      </div>

    </div>

  );

};

export default PatientSearch;
