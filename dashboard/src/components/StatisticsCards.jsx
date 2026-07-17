import React from "react";
import {
  FaUserInjured,
  FaUserMd,
  FaCalendarCheck,
  FaRobot,
  FaHospital,
  FaHeartbeat,
} from "react-icons/fa";

import "./StatisticsCards.css";

const StatisticsCards = () => {
  const statistics = [
    {
      title: "Total Patients",
      value: 1250,
      icon: <FaUserInjured />,
      color: "blue",
    },
    {
      title: "Doctors",
      value: 48,
      icon: <FaUserMd />,
      color: "green",
    },
    {
      title: "Appointments",
      value: 865,
      icon: <FaCalendarCheck />,
      color: "orange",
    },
    {
      title: "AI Predictions",
      value: 1520,
      icon: <FaRobot />,
      color: "purple",
    },
    {
      title: "Departments",
      value: 15,
      icon: <FaHospital />,
      color: "red",
    },
    {
      title: "Emergency Cases",
      value: 34,
      icon: <FaHeartbeat />,
      color: "pink",
    },
  ];

  return (
    <div className="statisticsContainer">
      {statistics.map((item, index) => (
        <div
          className={`statisticsCard ${item.color}`}
          key={index}
        >
          <div className="statisticsIcon">
            {item.icon}
          </div>

          <div className="statisticsInfo">
            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;