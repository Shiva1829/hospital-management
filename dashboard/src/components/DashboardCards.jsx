import React from "react";
import {
  FaUsers,
  FaUserMd,
  FaCalendarCheck,
  FaRobot,
  FaArrowUp,
} from "react-icons/fa";

import "./DashboardCards.css";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Patients",
      value: "1,248",
      icon: <FaUsers />,
      color: "blue",
      growth: "+12%",
    },
    {
      title: "Doctors",
      value: "45",
      icon: <FaUserMd />,
      color: "green",
      growth: "+4%",
    },
    {
      title: "Appointments",
      value: "876",
      icon: <FaCalendarCheck />,
      color: "orange",
      growth: "+18%",
    },
    {
      title: "AI Predictions",
      value: "632",
      icon: <FaRobot />,
      color: "purple",
      growth: "+26%",
    },
  ];

  return (
    <div className="dashboardCards">

      {cards.map((card, index) => (

        <div
          key={index}
          className={`dashboardCard ${card.color}`}
        >

          <div className="cardTop">

            <div className="cardIcon">

              {card.icon}

            </div>

            <div className="growth">

              <FaArrowUp />

              <span>{card.growth}</span>

            </div>

          </div>

          <div className="cardContent">

            <h2>{card.value}</h2>

            <p>{card.title}</p>

          </div>

        </div>

      ))}

    </div>
  );
};

export default DashboardCards;