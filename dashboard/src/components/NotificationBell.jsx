import React from "react";
import { IoNotifications } from "react-icons/io5";

import "./NotificationBell.css";

const NotificationBell = ({ count = 5 }) => {

  return (

    <div className="notificationBell">

      <div className="bellContainer">

        <IoNotifications className="bellIcon" />

        {

          count > 0 && (

            <span className="notificationBadge">

              {count > 99 ? "99+" : count}

            </span>

          )

        }

      </div>

    </div>

  );

};

export default NotificationBell;