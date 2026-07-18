import React from "react";
import {
  FaBell,
  FaUserPlus,
  FaRobot,
  FaCalendarCheck,
  FaHeartbeat,
} from "react-icons/fa";

import "./NotificationPanel.css";

const notifications = [
  {
    id: 1,
    icon: <FaUserPlus />,
    title: "New Patient Registered",
    description: "Patient registration completed successfully.",
    time: "2 mins ago",
    color: "blue",
  },
  {
    id: 2,
    icon: <FaRobot />,
    title: "AI Report Generated",
    description: "Brain Tumor prediction report is ready.",
    time: "10 mins ago",
    color: "green",
  },
  {
    id: 3,
    icon: <FaCalendarCheck />,
    title: "Appointment Confirmed",
    description: "Appointment approved by Dr. Sharma.",
    time: "25 mins ago",
    color: "orange",
  },
  {
    id: 4,
    icon: <FaHeartbeat />,
    title: "Critical Patient Alert",
    description: "Heart disease prediction requires immediate attention.",
    time: "1 hour ago",
    color: "red",
  },
];

const NotificationPanel = () => {

  return (

    <div className="notificationPanel">

      <div className="notificationHeader">

        <h2>

          <FaBell />

          Notifications

        </h2>

        <span>{notifications.length}</span>

      </div>

      <div className="notificationList">

        {

          notifications.map((item)=>(

            <div
              className={`notificationItem ${item.color}`}
              key={item.id}
            >

              <div className="notificationIcon">

                {item.icon}

              </div>

              <div className="notificationContent">

                <h4>{item.title}</h4>

                <p>{item.description}</p>

                <small>{item.time}</small>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

};

export default NotificationPanel;
