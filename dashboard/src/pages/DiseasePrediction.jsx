import React from "react";
import {
  FaHeartbeat,
  FaLungs,
  FaRobot,
  FaHospital,
} from "react-icons/fa";

import HeartDiseasePrediction from "./HeartDiseasePrediction";
import LiverDiseasePrediction from "./LiverDiseasePrediction";

import "./DiseasePrediction.css";

const DiseasePrediction = () => {

  return (

    <div className="diseaseDashboard">

      {/* Hero Section */}

      <section className="diseaseHero">

        <div className="heroContent">

          <span className="heroTag">

            AI Disease Prediction

          </span>

          <h1>

            Intelligent

            <span> Disease Prediction System</span>

          </h1>

          <p>

            Predict diseases using Artificial Intelligence
            models trained on real medical datasets.
            Improve diagnosis accuracy and support
            clinical decision making.

          </p>

          <div className="heroFeatures">

            <div className="featureBox">

              <FaRobot />

              <span>AI Powered</span>

            </div>

            <div className="featureBox">

              <FaHospital />

              <span>Medical Analytics</span>

            </div>

            <div className="featureBox">

              <FaHeartbeat />

              <span>Early Detection</span>

            </div>

          </div>

        </div>

        <div className="heroImage">

          <img
            src="/ai-health.png"
            alt="AI Healthcare"
          />

        </div>

      </section>

      {/* Prediction Cards */}

      <section className="predictionSection">

        <div className="predictionCard">

          <div className="cardHeader">

            <FaHeartbeat />

            <h2>Heart Disease Prediction</h2>

          </div>

          <HeartDiseasePrediction />

        </div>

        <div className="predictionCard">

          <div className="cardHeader">

            <FaLungs />

            <h2>Liver Disease Prediction</h2>

          </div>

          <LiverDiseasePrediction />

        </div>

      </section>

    </div>

  );

};

export default DiseasePrediction;
