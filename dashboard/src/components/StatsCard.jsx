import React from "react";
import CountUp from "react-countup";
import {
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import "./StatsCard.css";

const StatsCard = ({
  title,
  value,
  icon,
  color = "#2563eb",
  percentage = "+12%",
  trend = "up"
}) => {
  return (
    <div
      className="stats-card"
      style={{
        borderTop: `5px solid ${color}`
      }}
    >
      <div className="stats-top">

        <div
          className="stats-icon"
          style={{
            background: `${color}20`,
            color: color
          }}
        >
          {icon}
        </div>

        <div
          className={`stats-trend ${
            trend === "up" ? "up" : "down"
          }`}
        >
          {trend === "up" ? (
            <FaArrowUp />
          ) : (
            <FaArrowDown />
          )}

          <span>{percentage}</span>
        </div>

      </div>

      <h4>{title}</h4>

      <h1>
        <CountUp
          end={value}
          duration={2.5}
          separator=","
        />
      </h1>

      <p>Compared to last month</p>

    </div>
  );
};

export default StatsCard;