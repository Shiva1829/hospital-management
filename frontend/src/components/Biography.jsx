import React from "react";
import "./Biography.css";

const Biography = ({ imageUrl }) => {
  return (
    <section className="about-section">

      <div className="about-left">

        <img src={imageUrl} alt="Hospital" />

        <div className="experience-card">
          <h2>15+</h2>
          <p>Years of Excellence</p>
        </div>

      </div>

      <div className="about-right">

        <span className="section-tag">
          ABOUT SHIVSHAKTI
        </span>

        <h2>
          Your Trusted Partner
          <br />
          in Modern Healthcare
        </h2>

        <p>
          ShivShakti Medical Institute combines cutting-edge medical
          technology with compassionate healthcare to provide exceptional
          treatment for every patient.
        </p>

        <p>
          Our multidisciplinary team of experienced doctors, AI-powered
          diagnostic systems, advanced laboratories, and modern operation
          theatres ensure that every patient receives world-class care from
          diagnosis to recovery.
        </p>

        <div className="about-features">

          <div className="feature-box">
            <div className="icon">🏥</div>
            <div>
              <h4>Advanced Infrastructure</h4>
              <p>Modern medical equipment and smart healthcare facilities.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="icon">👨‍⚕️</div>
            <div>
              <h4>Expert Doctors</h4>
              <p>Highly qualified specialists across multiple departments.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="icon">🤖</div>
            <div>
              <h4>AI Diagnosis</h4>
              <p>Artificial Intelligence powered disease prediction system.</p>
            </div>
          </div>

          <div className="feature-box">
            <div className="icon">❤️</div>
            <div>
              <h4>Patient First</h4>
              <p>Personalized healthcare with empathy and compassion.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Biography;