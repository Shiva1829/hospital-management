import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaUserCircle,
  FaSearch,
  FaComments,
} from "react-icons/fa";
import { Context } from "../context/Context";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Messages.css";

const Messages = () => {
  const { isAuthenticated } = useContext(Context);

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        "https://hospital-backend-28d9.onrender.com/api/v1/message/all",
        {
          withCredentials: true,
        }
      );

      setMessages(data.messages);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch messages."
      );
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const filteredMessages = messages.filter((message) => {
    const keyword = search.toLowerCase();

    return (
      message.firstName?.toLowerCase().includes(keyword) ||
      message.lastName?.toLowerCase().includes(keyword) ||
      message.email?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="messagesPage">

      <div className="messagesHeader">

        <div>
          <h1>
            <FaComments />
            Contact Messages
          </h1>

          <p>
            Manage patient enquiries and support requests.
          </p>
        </div>

        <div className="messageCounter">
          {filteredMessages.length}
        </div>

      </div>

      <div className="searchBar">

        <FaSearch />

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {filteredMessages.length > 0 ? (

        <div className="messagesGrid">

          {filteredMessages.map((message) => (

            <div
              className="messageCard"
              key={message._id}
            >

              <div className="messageTop">

                <div className="avatar">
                  <FaUserCircle />
                </div>

                <div>

                  <h2>
                    {message.firstName} {message.lastName}
                  </h2>

                  <span className="emailChip">
                    <FaEnvelope />
                    {message.email}
                  </span>

                </div>

              </div>

              <div className="phoneRow">

                <FaPhone />

                <span>{message.phone}</span>

              </div>

              <div className="messageBox">

                <strong>Message</strong>

                <p>{message.message}</p>

              </div>

              <div className="messageFooter">

                <span>
                  Received Successfully
                </span>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div className="emptyMessages">

          <FaComments />

          <h2>No Messages Found</h2>

          <p>
            There are currently no contact messages matching your search.
          </p>

        </div>

      )}

    </div>
  );
};

export default Messages;
