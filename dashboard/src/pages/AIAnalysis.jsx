import React from "react";
import {
  FaRobot,
  FaBrain,
  FaXRay,
  FaNotesMedical,
  FaHeartbeat,
} from "react-icons/fa";

import OCRReader from "./OCRReader";
import XrayAnalysis from "./XrayAnalysis";
import KidneyStonePrediction from "./KidneyStonePrediction";
import CancerPrediction from "./CancerPrediction";
import BrainTumorPrediction from "./BrainTumorPrediction";

import "./AIAnalysis.css";

const AIAnalysis = () => {
  return (
    <div className="aiPage">

      {/* Hero Section */}

      <div className="aiHero">

        <div className="aiHeroLeft">

          <span className="aiBadge">
            AI MEDICAL INTELLIGENCE
          </span>

          <h1>

            AI Powered

            <span> Medical Analysis</span>

          </h1>

          <p>

            Advanced Artificial Intelligence models assist
            doctors in detecting diseases, analyzing
            medical reports, identifying tumors,
            kidney stones and interpreting X-Ray images.

          </p>

        </div>

        <div className="aiHeroRight">

          <FaRobot className="heroRobot" />

        </div>

      </div>

      {/* AI Services */}

      <div className="aiCards">

        <div className="serviceCard">

          <FaNotesMedical className="serviceIcon"/>

          <h3>OCR Reader</h3>

          <p>
            Extract text from prescriptions,
            reports and scanned documents.
          </p>

        </div>

        <div className="serviceCard">

          <FaXRay className="serviceIcon"/>

          <h3>X-Ray Analysis</h3>

          <p>
            AI identifies abnormalities in
            chest X-ray images.
          </p>

        </div>

        <div className="serviceCard">

          <FaHeartbeat className="serviceIcon"/>

          <h3>Cancer Detection</h3>

          <p>
            Early prediction using trained
            AI models.
          </p>

        </div>

        <div className="serviceCard">

          <FaBrain className="serviceIcon"/>

          <h3>Brain Tumor</h3>

          <p>
            MRI image classification using
            Deep Learning.
          </p>

        </div>

      </div>

      {/* AI Modules */}

      <div className="analysisSection">

        <div className="analysisCard">

          <h2>📄 OCR Medical Report Reader</h2>

          <OCRReader />

        </div>

        <div className="analysisCard">

          <h2>🩻 X-Ray AI Analysis</h2>

          <XrayAnalysis />

        </div>

        <div className="analysisCard">

          <h2>🪨 Kidney Stone Prediction</h2>

          <KidneyStonePrediction />

        </div>

        <div className="analysisCard">

          <h2>🎗 Cancer Prediction</h2>

          <CancerPrediction />

        </div>

        <div className="analysisCard">

          <h2>🧠 Brain Tumor Prediction</h2>

          <BrainTumorPrediction />

        </div>

      </div>

    </div>
  );
};

export default AIAnalysis;