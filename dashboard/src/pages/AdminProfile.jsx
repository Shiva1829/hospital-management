import React from "react";
import {
  FaUserShield,
  FaEnvelope,
  FaHospital,
  FaUserMd,
  FaRobot,
  FaCalendarCheck,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./AdminProfile.css";

const AdminProfile = () => {
  return (
    <div className="adminProfilePage">

      {/* Hero */}
      <div className="adminHero">

        <div className="heroLeft">

          <span className="adminBadge">
            AI HOSPITAL ADMIN
          </span>

          <h1>
            Welcome Back,
            <span> Administrator</span>
          </h1>

          <p>
            Manage doctors, appointments, patients and hospital
            operations through the AI Powered ShivShakti Hospital
            Management Dashboard.
          </p>

        </div>

        <div className="heroRight">

          <div className="adminAvatar">

            <FaUserShield />

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="profileStats">

        <div className="statCard">

          <FaUserMd className="statIcon" />

          <h2>120+</h2>

          <p>Doctors</p>

        </div>

        <div className="statCard">

          <FaCalendarCheck className="statIcon" />

          <h2>560+</h2>

          <p>Appointments</p>

        </div>

        <div className="statCard">

          <FaRobot className="statIcon" />

          <h2>AI Enabled</h2>

          <p>Hospital</p>

        </div>

      </div>

      {/* Profile Card */}

      <div className="profileCard">

        <div className="profileHeader">

          <div className="profileImage">

            <FaUserShield />

          </div>

          <div>

            <h2>Administrator</h2>

            <span>System Administrator</span>

          </div>

        </div>

        <div className="profileGrid">

          <div className="profileItem">

            <FaEnvelope className="itemIcon" />

            <div>

              <h4>Email</h4>

              <p>admin@gmail.com</p>

            </div>

          </div>

          <div className="profileItem">

            <FaHospital className="itemIcon" />

            <div>

              <h4>Hospital</h4>

              <p>ShivShakti Hospital</p>

            </div>

          </div>

          <div className="profileItem">

            <FaPhoneAlt className="itemIcon" />

            <div>

              <h4>Phone</h4>

              <p>+91 9876543210</p>

            </div>

          </div>

          <div className="profileItem">

            <FaMapMarkerAlt className="itemIcon" />

            <div>

              <h4>Location</h4>

              <p>Sankeshwar, Belagavi</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AdminProfile;
