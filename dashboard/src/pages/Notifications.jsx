import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaCircle,
  FaClock,
} from "react-icons/fa";

import socket from "../socket/socket";
import "./Notifications.css";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    socket.on(
      "newNotification",
      (data) => {

        const notification = {
          ...data,
          time: new Date().toLocaleTimeString(),
        };

        setNotifications((previous) => [
          notification,
          ...previous,
        ]);

      }
    );

    return () => {
      socket.off("newNotification");
    };

  }, []);

  return (

    <div className="notifications-page">

      <div className="notifications-header">

        <div>

          <h1>

            <FaBell className="header-icon" />

            Live Notifications

          </h1>

          <p>

            Real-time hospital updates powered by AI.

          </p>

        </div>

        <div className="live-status">

          <FaCircle />

          Live

        </div>

      </div>

      {notifications.length === 0 ? (

        <div className="empty-box">

          <FaBell className="empty-icon" />

          <h2>No Notifications</h2>

          <p>
            Waiting for new hospital updates...
          </p>

        </div>

      ) : (

        <div className="notification-list">

          {notifications.map((item, index) => (

            <div
              className="notification-card"
              key={index}
            >

              <div className="notification-top">

                <h3>{item.title}</h3>

                <span>

                  <FaClock />

                  {item.time}

                </span>

              </div>

              <p>

                {item.message}

              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Notifications;
