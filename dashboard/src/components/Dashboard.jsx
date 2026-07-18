import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaRobot,
  FaHospital,
  FaUserPlus,
  FaFileMedical,
  FaBell
} from "react-icons/fa";

import { Context } from "../context/Context";

import "./Dashboard.css";

const Dashboard = () => {

  const { isAuthenticated, admin } = useContext(Context);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {

    const fetchAppointments = async () => {

      try {

        const { data } = await axios.get(
          "https://hospital-backend-28d9.onrender.com/api/v1/appointment/getall",
          {
            withCredentials: true,
          }
        );

        setAppointments(data.appointments);

      }

      catch {

        setAppointments([]);

      }

    };

    fetchAppointments();

  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (

    <div className="dashboardContainer">

      {/* HERO */}

      <section className="dashboardHero">

        <div className="heroLeft">

          <span className="heroBadge">

            AI Powered Hospital Management

          </span>

          <h1>

            Welcome Back,

            <span>

              {" "}
              {admin?.firstName} {admin?.lastName}

            </span>

          </h1>

          <p>

            Monitor doctors, patients, appointments,
            AI disease predictions, revenue,
            reports and hospital analytics
            from one centralized dashboard.

          </p>

        </div>

        <div className="heroRight">

          <img

            src="/doc.png"

            alt="doctor"

          />

        </div>

      </section>

      {/* STATISTICS */}

      <section className="statsGrid">

        <div className="statCard">

          <FaCalendarCheck className="statIcon"/>

          <div>

            <h2>

              {appointments.length}

            </h2>

            <p>Total Appointments</p>

          </div>

        </div>

        <div className="statCard">

          <FaUserMd className="statIcon"/>

          <div>

            <h2>10</h2>

            <p>Doctors</p>

          </div>

        </div>

        <div className="statCard">

          <FaUsers className="statIcon"/>

          <div>

            <h2>215</h2>

            <p>Patients</p>

          </div>

        </div>

        <div className="statCard">

          <FaRobot className="statIcon"/>

          <div>

            <h2>186</h2>

            <p>AI Predictions</p>

          </div>

        </div>

      </section>

      {/* QUICK ACTIONS */}

      <section className="quickActions">

        <div className="actionCard">

          <FaHospital/>

          <h3>Hospital Overview</h3>

          <p>

            View complete hospital statistics.

          </p>

        </div>

        <div className="actionCard">

          <FaUserPlus/>

          <h3>Add Doctor</h3>

          <p>

            Register a new doctor.

          </p>

        </div>

        <div className="actionCard">

          <FaFileMedical/>

          <h3>Medical Reports</h3>

          <p>

            View uploaded reports.

          </p>

        </div>

        <div className="actionCard">

          <FaBell/>

          <h3>Notifications</h3>

          <p>

            View latest hospital updates.

          </p>

        </div>

      </section>

      {/* ================= APPOINTMENTS ================= */}

<section className="dashboardContent">

  {/* LEFT */}

  <div className="appointmentSection">

    <div className="sectionHeader">

      <h2>

        Recent Appointments

      </h2>

      <span>

        {appointments.length} Records

      </span>

    </div>

    <table className="appointmentTable">

      <thead>

        <tr>

          <th>Patient</th>

          <th>Date</th>

          <th>Doctor</th>

          <th>Department</th>

          <th>Status</th>

          <th>Visited</th>

        </tr>

      </thead>

      <tbody>

        {

          appointments.length > 0

          ?

          appointments.map((appointment)=>(

            <tr key={appointment._id}>

              <td>

                <div className="patientInfo">

                  <div className="avatar">

                    {

                      appointment.firstName?.charAt(0)

                    }

                  </div>

                  <span>

                    {appointment.firstName}

                    {" "}

                    {appointment.lastName}

                  </span>

                </div>

              </td>

              <td>

                {

                  appointment.appointment_date?.substring(0,16)

                }

              </td>

              <td>

                Dr.

                {" "}

                {appointment.doctor?.firstName}

              </td>

              <td>

                {appointment.department}

              </td>

              <td>

                <select

                  className="statusSelect"

                  value={appointment.status}

                  onChange={(e)=>

                    handleUpdateStatus(

                      appointment._id,

                      e.target.value

                    )

                  }

                >

                  <option value="Pending">

                    Pending

                  </option>

                  <option value="Accepted">

                    Accepted

                  </option>

                  <option value="Rejected">

                    Rejected

                  </option>

                </select>

              </td>

              <td>

                {

                  appointment.hasVisited

                  ?

                  <span className="visited">

                    ✔ Visited

                  </span>

                  :

                  <span className="notVisited">

                    ✖ Pending

                  </span>

                }

              </td>

            </tr>

          ))

          :

          <tr>

            <td colSpan="6">

              No Appointments Found

            </td>

          </tr>

        }

      </tbody>

    </table>

  </div>

  {/* RIGHT PANEL */}

  <div className="dashboardSidebar">

    <div className="sideCard">

      <h3>

        Today's Activity

      </h3>

      <div className="activityItem">

        <span>Appointments</span>

        <strong>

          {appointments.length}

        </strong>

      </div>

      <div className="activityItem">

        <span>Doctors Available</span>

        <strong>

          10

        </strong>

      </div>

      <div className="activityItem">

        <span>AI Predictions</span>

        <strong>

          186

        </strong>

      </div>

    </div>

    <div className="sideCard">

      <h3>

        AI System Status

      </h3>

      <div className="systemStatus">

        <div className="statusDot"></div>

        <span>

          Brain Tumor Model

        </span>

      </div>

      <div className="systemStatus">

        <div className="statusDot"></div>

        <span>

          Cancer Detection

        </span>

      </div>

      <div className="systemStatus">

        <div className="statusDot"></div>

        <span>

          OCR Engine

        </span>

      </div>

      <div className="systemStatus">

        <div className="statusDot"></div>

        <span>

          X-Ray Analyzer

        </span>

      </div>

    </div>

    <div className="sideCard">

      <h3>

        Notifications

      </h3>

      <ul className="notificationList">

        <li>

          New patient registered.

        </li>

        <li>

          AI Report Generated.

        </li>

        <li>

          Doctor Added Successfully.

        </li>

        <li>

          System running normally.

        </li>

      </ul>

    </div>

  </div>

</section>

    </div>

  );

};

export default Dashboard;
