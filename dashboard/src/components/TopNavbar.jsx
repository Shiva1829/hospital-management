import React from "react";
import {
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";

import "./TopNavbar.css";

const TopNavbar = () => {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (

    <header className="topNavbar">

      {/* Left */}

      <div className="navbarLeft">

        <div>

          <h2>🏥 ShivShakti AI Hospital</h2>

          <p>{today}</p>

        </div>

      </div>

      {/* Center */}

      <div className="navbarCenter">

        <div className="searchBox">

          <FaSearch />

          <input
            type="text"
            placeholder="Search patients, doctors, reports..."
          />

        </div>

      </div>

      {/* Right */}

      <div className="navbarRight">

        <div className="notificationBox">

          <FaBell />

          <span className="notificationCount">
            3
          </span>

        </div>

        <div className="profileBox">

          <FaUserCircle className="profileIcon" />

          <div>

            <h4>Administrator</h4>

            <p>AI Hospital Admin</p>

          </div>

        </div>

      </div>

    </header>

  );

};

export default TopNavbar;