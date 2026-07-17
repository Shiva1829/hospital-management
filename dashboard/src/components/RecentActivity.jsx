import React from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaLungs,
  FaTint,
  FaFileMedical,
  FaCheckCircle,
} from "react-icons/fa";

import "./RecentActivity.css";

const activities = [
  {
    id: 1,
    icon: <FaHeartbeat />,
    title: "Heart Disease Analysis",
    patient: "Rahul Sharma",
    result: "High Risk",
    time: "5 mins ago",
    status: "Completed",
  },
  {
    id: 2,
    icon: <FaTint />,
    title: "Kidney Stone Detection",
    patient: "Priya Patel",
    result: "Stone Detected",
    time: "18 mins ago",
    status: "Completed",
  },
  {
    id: 3,
    icon: <FaLungs />,
    title: "Chest X-Ray Analysis",
    patient: "Amit Kumar",
    result: "Pneumonia Suspected",
    time: "42 mins ago",
    status: "Completed",
  },
  {
    id: 4,
    icon: <FaBrain />,
    title: "Brain Tumor Scan",
    patient: "Sneha Reddy",
    result: "Glioma Detected",
    time: "1 hour ago",
    status: "Completed",
  },
  {
    id: 5,
    icon: <FaFileMedical />,
    title: "OCR Medical Report",
    patient: "Vikram Singh",
    result: "Report Extracted",
    time: "2 hours ago",
    status: "Completed",
  },
];

const RecentActivity = () => {
  return (
    <div className="recentActivityCard">

      <div className="recentHeader">
        <h2>Recent AI Activities</h2>
        <span>{activities.length} Records</span>
      </div>

      <div className="activityList">

        {activities.map((item) => (

          <div className="activityItem" key={item.id}>

            <div className="activityIcon">
              {item.icon}
            </div>

            <div className="activityInfo">

              <h3>{item.title}</h3>

              <p>
                Patient :
                <strong> {item.patient}</strong>
              </p>

              <p>
                Prediction :
                <span className="predictionText">
                  {item.result}
                </span>
              </p>

            </div>

            <div className="activityRight">

              <span className="status">
                <FaCheckCircle />
                {item.status}
              </span>

              <small>{item.time}</small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RecentActivity;