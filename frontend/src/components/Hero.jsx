import React from "react";
import "./Hero.css";
import {
  FaRobot,
  FaHeartbeat,
  FaUserMd,
  FaArrowRight,
  FaHospital,
  FaBrain,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = ({ imageUrl }) => {
  return (
    <section className="hero">

      {/* Left Side */}

      <div className="hero-content">

        <span className="hero-badge">
          AI Powered Hospital Management System
        </span>

        <h1>
          Future of
          <span> Smart Healthcare </span>
          Starts Here
        </h1>

        <p>
          Experience Artificial Intelligence powered disease prediction,
          online appointment booking,
          digital medical reports,
          and seamless healthcare management
          through one intelligent platform.
        </p>

        <div className="hero-buttons">

          <Link to="/appointment" className="primary-btn">

            Book Appointment

            <FaArrowRight />

          </Link>

          <Link to="/about" className="secondary-btn">

            Learn More

          </Link>

        </div>

        {/* Features */}

        <div className="hero-features">

          <div className="feature-card">

            <FaRobot />

            <div>

              <h4>AI Diagnosis</h4>

              <p>Instant Disease Prediction</p>

            </div>

          </div>

          <div className="feature-card">

            <FaUserMd />

            <div>

              <h4>Expert Doctors</h4>

              <p>Qualified Specialists</p>

            </div>

          </div>

          <div className="feature-card">

            <FaHeartbeat />

            <div>

              <h4>24×7 Emergency</h4>

              <p>Quick Medical Support</p>

            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="hero-image">

        <div className="circle circle1"></div>
        <div className="circle circle2"></div>

        <img src={imageUrl} alt="Hospital" />

        <div className="floating-card card1">

          <FaBrain />

          <div>

            <h4>AI Prediction</h4>

            <p>98.7% Accuracy</p>

          </div>

        </div>

        <div className="floating-card card2">

          <FaHospital />

          <div>

            <h4>Departments</h4>

            <p>25+ Available</p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;