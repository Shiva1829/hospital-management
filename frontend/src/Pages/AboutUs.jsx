import React from "react";
import "./AboutUs.css";
import {
  FaRobot,
  FaHeartbeat,
  FaHospital,
  FaUserMd,
  FaMicroscope,
  FaAward,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Hero */}

      <section className="about-hero">

        <div className="about-left">

          <span className="about-tag">
            ABOUT SHIVSHAKTI AI HOSPITAL
          </span>

          <h1>
            Transforming Healthcare With
            <span> Artificial Intelligence</span>
          </h1>

          <p>
            ShivShakti Medical Institute combines
            experienced doctors, advanced medical
            infrastructure and Artificial Intelligence
            to provide accurate diagnosis,
            intelligent disease prediction and
            world-class patient care.
          </p>

          <div className="about-buttons">

            <button className="primary-btn">
              Explore Services
            </button>

            <button className="secondary-btn">
              Meet Doctors
            </button>

          </div>

        </div>

        <div className="about-right">

          <img
            src="/about.png"
            alt="About Hospital"
          />

        </div>

      </section>

      {/* Mission */}

      <section className="mission-section">

        <div className="mission-card">

          <FaRobot />

          <h3>AI Diagnosis</h3>

          <p>
            Smart disease prediction using Artificial
            Intelligence.
          </p>

        </div>

        <div className="mission-card">

          <FaUserMd />

          <h3>Expert Doctors</h3>

          <p>
            Highly experienced specialists from
            multiple medical departments.
          </p>

        </div>

        <div className="mission-card">

          <FaHospital />

          <h3>Modern Hospital</h3>

          <p>
            Equipped with latest diagnostic
            technology and digital healthcare.
          </p>

        </div>

      </section>

      {/* Biography */}

      <section className="about-content">

        <div className="about-image">

          <img
            src="/whoweare.png"
            alt="Who We Are"
          />

        </div>

        <div className="about-text">

          <h2>Who We Are</h2>

          <p>
            ShivShakti Medical Institute is a modern
            healthcare platform developed to improve
            patient care through Artificial Intelligence,
            Machine Learning and experienced healthcare
            professionals.
          </p>

          <p>
            We provide online appointment booking,
            disease prediction, digital reports,
            AI-powered diagnosis and complete hospital
            management under one platform.
          </p>

          <div className="achievement-grid">

            <div>

              <FaHeartbeat />

              <h3>10K+</h3>

              <span>Patients</span>

            </div>

            <div>

              <FaMicroscope />

              <h3>25+</h3>

              <span>Departments</span>

            </div>

            <div>

              <FaAward />

              <h3>120+</h3>

              <span>Doctors</span>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AboutUs;
