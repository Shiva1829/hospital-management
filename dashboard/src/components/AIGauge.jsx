import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  FaHeart,
  FaLungs,
  FaBrain,
  FaHospitalAlt,
} from "react-icons/fa";

import "react-circular-progressbar/dist/styles.css";
import "./AIGauges.css";

const gaugeData = [
  {
    title: "Heart Disease",
    value: 82,
    icon: <FaHeart />,
    color: "#ef4444",
  },
  {
    title: "Liver Disease",
    value: 65,
    icon: <FaHospitalAlt />,
    color: "#f59e0b",
  },
  {
    title: "Brain Tumor",
    value: 75,
    icon: <FaBrain />,
    color: "#3b82f6",
  },
  {
    title: "Lung Cancer",
    value: 71,
    icon: <FaLungs />,
    color: "#10b981",
  },
];

const AIGauges = () => {

  return (

    <section className="gaugesSection">

      <div className="gaugesHeader">

        <h2>AI Disease Prediction Overview</h2>

        <p>
          Current confidence score of AI prediction modules
        </p>

      </div>

      <div className="gaugesGrid">

        {gaugeData.map((item, index) => (

          <div className="gaugeCard" key={index}>

            <div
              className="gaugeIcon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <div className="progressWrapper">

              <CircularProgressbar
                value={item.value}
                text={`${item.value}%`}
                styles={buildStyles({
                  textColor: "#1e293b",
                  pathColor: item.color,
                  trailColor: "#e5e7eb",
                  textSize: "18px",
                })}
              />

            </div>

            <h3>{item.title}</h3>

            <span>AI Confidence Score</span>

          </div>

        ))}

      </div>

    </section>

  );

};

export default AIGauges;
