import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaHospital,
  FaVenusMars,
  FaSearch,
} from "react-icons/fa";

import "./Doctors.css";

const Doctors = () => {
  const { isAuthenticated } = useContext(Context);

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-backend-28d9.onrender.com/api/v1/user/doctors",
        {
          withCredentials: true,
        }
      );

      setDoctors(data.doctors);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to fetch doctors."
      );

    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.firstName} ${doctor.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="doctorsPage">

      <div className="doctorHero">

        <div>

          <h1>👨‍⚕️ Hospital Doctors</h1>

          <p>
            View all registered doctors and specialists.
          </p>

        </div>

        <div className="doctorSearch">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Doctor..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

      </div>

      <div className="doctorGrid">

        {filteredDoctors.length > 0 ? (

          filteredDoctors.map((doctor) => (

            <div
              className="doctorCard"
              key={doctor._id}
            >

              <img
                src={
                  doctor.docAvatar?.url ||
                  "/docHolder.jpg"
                }
                alt="Doctor"
              />

              <h2>
                Dr. {doctor.firstName} {doctor.lastName}
              </h2>

              <span className="departmentBadge">
                <FaHospital />
                {doctor.doctorDepartment}
              </span>

              <div className="doctorInfo">

                <p>

                  <FaEnvelope />

                  {doctor.email}

                </p>

                <p>

                  <FaPhone />

                  {doctor.phone}

                </p>

                <p>

                  <FaVenusMars />

                  {doctor.gender}

                </p>

                <p>

                  🎂

                  {doctor.dob?.substring(0,10)}

                </p>

              </div>

            </div>

          ))

        ) : (

          <div className="noDoctors">

            <FaUserMd />

            <h2>No Registered Doctors Found</h2>

            <p>
              No doctors available in the system.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Doctors;
