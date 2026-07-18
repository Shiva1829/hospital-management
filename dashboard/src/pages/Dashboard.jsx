import React from "react";
import {
  FaHospital,
  FaRobot,
  FaHeartbeat,
} from "react-icons/fa";

import TopNavbar from "../components/TopNavbar";
import StatisticsCards from "../components/StatisticsCards";
import RevenueChart from "../components/RevenueChart";
import RecentActivity from "../components/RecentActivity";
import NotificationPanel from "../components/NotificationPanel";

import "./Dashboard.css";

const Dashboard = () => {

  return (

    <div className="dashboardPage">

      <TopNavbar />

      {/* Hero Section */}

      <section className="dashboardHero">

        <div className="heroLeft">

          <span className="dashboardTag">

            AI Hospital Dashboard

          </span>

          <h1>

            Welcome to

            <span> ShivShakti Hospital</span>

          </h1>

          <p>

            Monitor hospital performance,
            AI predictions,
            patient activities,
            appointments,
            revenue,
            and notifications
            from one intelligent dashboard.

          </p>

          <div className="heroFeatures">

            <div className="heroFeature">

              <FaHospital />

              <span>Smart Hospital</span>

            </div>

            <div className="heroFeature">

              <FaRobot />

              <span>AI Powered</span>

            </div>

            <div className="heroFeature">

              <FaHeartbeat />

              <span>Real Time Analytics</span>

            </div>

          </div>

        </div>

        <div className="heroRight">

          <img
            src="/dashboard.png"
            alt="Dashboard"
          />

        </div>

      </section>

      {/* Statistics */}

      <section className="dashboardSection">

        <StatisticsCards />

      </section>

      {/* Revenue */}

      <section className="dashboardSection">

        <RevenueChart />

      </section>

      {/* Bottom Section */}

      <section className="bottomDashboard">

        <div className="activityCard">

          <RecentActivity />

        </div>

        <div className="notificationCard">

          <NotificationPanel />

        </div>

      </section>

    </div>

  );

};

export default Dashboard;
