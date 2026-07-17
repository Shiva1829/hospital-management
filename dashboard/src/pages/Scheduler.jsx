import React, { useState } from "react";
import Calendar from "react-calendar";
import {
  FaCalendarAlt,
  FaUserMd,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

import "react-calendar/dist/Calendar.css";
import "./Scheduler.css";

const Scheduler = () => {

  const [date, setDate] = useState(new Date());

  const appointments = [

    {
      patient: "Rahul Sharma",
      doctor: "Dr. Kumar",
      time: "09:30 AM",
      status: "Confirmed",
    },

    {
      patient: "Priya Singh",
      doctor: "Dr. Mehta",
      time: "11:00 AM",
      status: "Pending",
    },

    {
      patient: "Ankit Patel",
      doctor: "Dr. Reddy",
      time: "02:30 PM",
      status: "Confirmed",
    },

    {
      patient: "Sneha Verma",
      doctor: "Dr. Shah",
      time: "05:00 PM",
      status: "Confirmed",
    },

  ];

  return (

    <div className="schedulerPage">

      <div className="schedulerHeader">

        <div>

          <h1>

            <FaCalendarAlt />

            Appointment Scheduler

          </h1>

          <p>
            Manage hospital appointments efficiently.
          </p>

        </div>

      </div>

      <div className="schedulerCards">

        <div className="summaryCard">

          <FaCalendarAlt className="blue"/>

          <div>

            <h2>48</h2>

            <p>Today's Appointments</p>

          </div>

        </div>

        <div className="summaryCard">

          <FaCheckCircle className="green"/>

          <div>

            <h2>41</h2>

            <p>Confirmed</p>

          </div>

        </div>

        <div className="summaryCard">

          <FaClock className="orange"/>

          <div>

            <h2>7</h2>

            <p>Pending</p>

          </div>

        </div>

      </div>

      <div className="schedulerLayout">

        <div className="calendarCard">

          <h2>Select Date</h2>

          <Calendar
            value={date}
            onChange={setDate}
          />

          <div className="selectedDate">

            Selected Date

            <strong>

              {date.toDateString()}

            </strong>

          </div>

        </div>

        <div className="appointmentsCard">

          <h2>

            <FaUserMd />

            Scheduled Appointments

          </h2>

          {appointments.map((item,index)=>(

            <div
              className="appointmentItem"
              key={index}
            >

              <div>

                <h3>{item.patient}</h3>

                <p>{item.doctor}</p>

              </div>

              <div>

                <span className="time">

                  {item.time}

                </span>

                <span
                  className={
                    item.status==="Confirmed"
                    ? "status confirmed"
                    : "status pending"
                  }
                >

                  {item.status}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Scheduler;