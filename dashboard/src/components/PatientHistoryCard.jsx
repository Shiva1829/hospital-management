import React from "react";
import {
  FaCalendarCheck,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaRobot,
  FaArrowRight,
} from "react-icons/fa";

import "./PatientHistoryCard.css";

const PatientHistoryCard = () => {

  const historyItems = [

    {
      icon: <FaCalendarCheck />,
      title: "Appointments",
      value: "42 Records",
      color: "blue",
    },

    {
      icon: <FaFileMedical />,
      title: "Medical Reports",
      value: "18 Reports",
      color: "green",
    },

    {
      icon: <FaPrescriptionBottleAlt />,
      title: "Prescriptions",
      value: "26 Prescriptions",
      color: "orange",
    },

    {
      icon: <FaRobot />,
      title: "AI Predictions",
      value: "15 Predictions",
      color: "purple",
    },

  ];

  return (

    <div className="historyCard">

      <div className="historyCardHeader">

        <h2>Patient History</h2>

        <button>

          View All

          <FaArrowRight />

        </button>

      </div>

      <div className="historyList">

        {

          historyItems.map((item, index) => (

            <div
              className={`historyItem ${item.color}`}
              key={index}
            >

              <div className="historyIcon">

                {item.icon}

              </div>

              <div className="historyContent">

                <h4>{item.title}</h4>

                <p>{item.value}</p>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default PatientHistoryCard;
