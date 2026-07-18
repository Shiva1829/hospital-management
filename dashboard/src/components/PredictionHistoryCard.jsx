import React from "react";
import {
  FaHeart,
  FaLungs,
  FaBrain,
  FaKidneys,
  FaVirus,
  FaArrowRight,
} from "react-icons/fa";

import "./PredictionHistoryCard.css";

const PredictionHistoryCard = () => {

  const predictions = [

    {
      title: "Heart Disease",
      date: "19 Jun 2026",
      confidence: "92%",
      icon: <FaHeart />,
      color: "red",
    },

    {
      title: "Liver Disease",
      date: "18 Jun 2026",
      confidence: "88%",
      icon: <FaLungs />,
      color: "orange",
    },

    {
      title: "Brain Tumor",
      date: "17 Jun 2026",
      confidence: "95%",
      icon: <FaBrain />,
      color: "purple",
    },

    {
      title: "Kidney Stone",
      date: "16 Jun 2026",
      confidence: "90%",
      icon: <FaKidneys />,
      color: "blue",
    },

    {
      title: "Cancer Detection",
      date: "15 Jun 2026",
      confidence: "94%",
      icon: <FaVirus />,
      color: "green",
    },

  ];

  return (

    <div className="predictionHistoryCard">

      <div className="predictionHeader">

        <h2>AI Prediction History</h2>

        <button>

          View All

          <FaArrowRight />

        </button>

      </div>

      <div className="predictionList">

        {

          predictions.map((item, index) => (

            <div
              className={`predictionItem ${item.color}`}
              key={index}
            >

              <div className="predictionIcon">

                {item.icon}

              </div>

              <div className="predictionContent">

                <h4>{item.title}</h4>

                <p>{item.date}</p>

              </div>

              <div className="confidenceBadge">

                {item.confidence}

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default PredictionHistoryCard;
