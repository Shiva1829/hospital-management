import React from "react";
import {
  FaCalendarCheck,
  FaFileMedical,
  FaRobot,
  FaHeartbeat,
  FaArrowRight,
} from "react-icons/fa";

import "./PatientTimeline.css";

const PatientTimeline = () => {

  const timeline = [

    {
      title: "Appointment Created",
      date: "10 June 2026",
      description: "Patient appointment successfully booked.",
      icon: <FaCalendarCheck />,
      color: "blue",
    },

    {
      title: "Medical Report Uploaded",
      date: "11 June 2026",
      description: "MRI and laboratory reports uploaded.",
      icon: <FaFileMedical />,
      color: "green",
    },

    {
      title: "AI Prediction Completed",
      date: "12 June 2026",
      description: "AI completed disease prediction analysis.",
      icon: <FaRobot />,
      color: "purple",
    },

    {
      title: "Treatment Started",
      date: "13 June 2026",
      description: "Doctor prescribed medication and treatment.",
      icon: <FaHeartbeat />,
      color: "red",
    }

  ];

  return (

    <div className="timelinePage">

      <div className="timelineHeader">

        <h2>

          Patient Medical Timeline

        </h2>

        <button>

          View Full History

          <FaArrowRight />

        </button>

      </div>

      <div className="timelineContainer">

        {

          timeline.map((item, index) => (

            <div
              className="timelineRow"
              key={index}
            >

              <div className={`timelineCircle ${item.color}`}>

                {item.icon}

              </div>

              <div className="timelineContent">

                <h3>{item.title}</h3>

                <span>{item.date}</span>

                <p>{item.description}</p>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default PatientTimeline;