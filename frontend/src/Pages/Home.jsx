import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";
import {
  FaHeartbeat,
  FaUserMd,
  FaRobot,
  FaHospital,
  FaAmbulance,
  FaBrain,
} from "react-icons/fa";

import "./Home.css";

const Home = () => {
  return (
    <div className="homePage">

      {/* Hero */}
      <Hero />

      {/* Statistics */}
      <section className="homeStats">

        <div className="statCard">
          <FaUserMd className="statIcon" />
          <h2>120+</h2>
          <p>Expert Doctors</p>
        </div>

        <div className="statCard">
          <FaHeartbeat className="statIcon" />
          <h2>35+</h2>
          <p>Departments</p>
        </div>

        <div className="statCard">
          <FaRobot className="statIcon" />
          <h2>AI Powered</h2>
          <p>Disease Detection</p>
        </div>

        <div className="statCard">
          <FaHospital className="statIcon" />
          <h2>24×7</h2>
          <p>Emergency Care</p>
        </div>

      </section>

      {/* About */}
      <section className="homeSection">
        <Biography imageUrl="/about.png" />
      </section>

      {/* Why Choose */}
      <section className="whyChoose">

        <h2>Why Choose ShivShakti Hospital?</h2>

        <p>
          Combining Artificial Intelligence with experienced healthcare
          professionals to deliver faster diagnosis, better treatment
          and a seamless patient experience.
        </p>

        <div className="chooseGrid">

          <div className="chooseCard">
            <FaBrain />
            <h3>AI Diagnosis</h3>
            <p>
              Upload MRI, CT Scan, X-Ray or medical reports and receive
              intelligent disease analysis instantly.
            </p>
          </div>

          <div className="chooseCard">
            <FaUserMd />
            <h3>Specialist Doctors</h3>
            <p>
              Consult highly experienced doctors across every major
              medical department.
            </p>
          </div>

          <div className="chooseCard">
            <FaHeartbeat />
            <h3>Modern Equipment</h3>
            <p>
              Equipped with advanced diagnostic technology for accurate
              healthcare decisions.
            </p>
          </div>

          <div className="chooseCard">
            <FaAmbulance />
            <h3>24×7 Emergency</h3>
            <p>
              Emergency support available anytime with rapid response
              and expert medical staff.
            </p>
          </div>

        </div>

      </section>

      {/* Departments */}
      <section className="homeSection lightBackground">
        <Departments />
      </section>

      {/* Contact */}
      <section className="homeSection">
        <MessageForm />
      </section>

    </div>
  );
};

export default Home;