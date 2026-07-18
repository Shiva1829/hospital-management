import "./Appointment.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import {
  FaRobot,
  FaHospital,
  FaUserMd,
  FaHeartbeat,
  FaBrain,
  FaCalendarAlt,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

const Appointment = () => {
  const [stats] = useState([
    {
      icon: <FaUserMd />,
      value: "120+",
      title: "Expert Doctors",
    },
    {
      icon: <FaHospital />,
      value: "25+",
      title: "Departments",
    },
    {
      icon: <FaBrain />,
      value: "AI",
      title: "Smart Diagnosis",
    },
    {
      icon: <FaHeartbeat />,
      value: "24/7",
      title: "Emergency Care",
    },
  ]);

  const [features] = useState([
    {
      icon: <FaRobot />,
      title: "AI Disease Prediction",
      description:
        "Advanced Artificial Intelligence helps detect diseases within seconds.",
    },
    {
      icon: <FaUserMd />,
      title: "Specialist Doctors",
      description:
        "Consult highly qualified doctors from multiple medical departments.",
    },
    {
      icon: <FaHospital />,
      title: "Modern Infrastructure",
      description:
        "State-of-the-art medical facilities with advanced healthcare equipment.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Health Records",
      description:
        "All medical records are encrypted and safely stored.",
    },
    {
      icon: <FaClock />,
      title: "Quick Appointments",
      description:
        "Book appointments instantly without waiting in long queues.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Easy Scheduling",
      description:
        "Select your preferred doctor, date and department easily.",
    },
  ]);

  return (
    <div className="appointment-page">

      {/* Hero Section */}

      <section className="appointment-hero">

        <div className="hero-left">

          <span className="hero-badge">
            AI Powered Hospital
          </span>

          <h1>
            Smart Healthcare
            <br />
            Starts Here
          </h1>

          <p>
            Book appointments with experienced doctors,
            receive AI-powered disease predictions,
            manage your medical history,
            and experience the future of healthcare.
          </p>

          <div className="hero-highlights">

            <div className="highlight-card">
              <FaRobot />
              <div>
                <h4>Artificial Intelligence</h4>
                <p>Predict diseases instantly.</p>
              </div>
            </div>

            <div className="highlight-card">
              <FaUserMd />
              <div>
                <h4>Expert Specialists</h4>
                <p>Consult certified doctors.</p>
              </div>
            </div>

            <div className="highlight-card">
              <FaHospital />
              <div>
                <h4>Modern Healthcare</h4>
                <p>Digital Hospital Experience.</p>
              </div>
            </div>

          </div>

        </div>

        <div className="hero-right">

          <AppointmentForm />

        </div>

      </section>

      {/* Statistics */}

      <section className="appointment-stats">

        {stats.map((item, index) => (

          <div className="stat-card" key={index}>

            <div className="stat-icon">
              {item.icon}
            </div>

            <h2>{item.value}</h2>

            <p>{item.title}</p>

          </div>

        ))}

      </section>

      {/* Features */}

      <section className="appointment-features">

        <div className="section-title">

          <h2>Why Choose ShivShakti Hospital?</h2>

          <p>
            We combine Artificial Intelligence,
            experienced doctors,
            and modern medical technology
            to provide the best healthcare experience.
          </p>

        </div>

        <div className="feature-grid">

          {features.map((feature, index) => (

            <div className="feature-box" key={index}>

              <div className="feature-icon">

                {feature.icon}

              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
};

export default Appointment;
