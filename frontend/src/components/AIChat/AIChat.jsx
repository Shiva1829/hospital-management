import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AIChat.css";

import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";

const AIChat = () => {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const sessionId = localStorage.getItem("chatSession") || crypto.randomUUID();

  useEffect(() => {

    localStorage.setItem("chatSession", sessionId);

  }, []);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Hello! I am your AI Medical Assistant.\n\nHow can I help you today?",
    },
  ]);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {

      sender: "user",

      text: message,

    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {

      const res = await axios.post(

        "https://hospital-backend-28d9.onrender.com/api/v1/chatbot/chat",

        {

          message,

          sessionId,

        }

      );

      setMessages((prev) => [

        ...prev,

        {

          sender: "bot",

          text: res.data.reply,

        },

      ]);

    } catch (error) {

      console.log(error);

      setMessages((prev) => [

        ...prev,

        {

          sender: "bot",

          text:
            "⚠️ Unable to connect to AI Server.\nPlease try again.",

        },

      ]);

    }

    setLoading(false);

    setMessage("");

  };

  const clearConversation = async () => {

    try {

      await axios.post(

        "https://hospital-backend-28d9.onrender.com/api/v1/chatbot/clear",

        {

          sessionId,

        }

      );

    } catch {}

    setMessages([
      {
        sender: "bot",
        text:
          "👋 Hello! I am your AI Medical Assistant.\n\nHow can I help you today?",
      },
    ]);

  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      sendMessage();

    }

  };

  return (
    <>

      {!open && (

        <button

          className="chatButton"

          onClick={() => setOpen(true)}

        >

          <FaRobot />

        </button>

      )}

      {open && (

        <div className="chatContainer">

          <div className="chatHeader">

            <div>

              <FaRobot />

              AI Medical Assistant

            </div>

            <div
              style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
              }}
            >

              <FiTrash2

                style={{
                  cursor: "pointer",
                }}

                onClick={clearConversation}

              />

              <MdClose

                className="close"

                onClick={() => setOpen(false)}

              />

            </div>

          </div>

          <div className="chatBody">

            {messages.map((msg, index) => (

              <div

                key={index}

                className={
                  msg.sender === "user"
                    ? "userMessage"
                    : "botMessage"
                }

              >

                {msg.text}

              </div>

            ))}

            {loading && (

              <div className="botMessage">

                🤖 Thinking...

              </div>

            )}

            <div ref={messagesEndRef}></div>

          </div>

          <div className="chatFooter">

            <input

              type="text"

              value={message}

              placeholder="Ask your medical question..."

              onChange={(e) =>
                setMessage(e.target.value)
              }

              onKeyDown={handleKeyDown}

            />

            <button

              onClick={sendMessage}

              disabled={loading}

            >

              <IoMdSend />

            </button>

          </div>

        </div>

      )}

    </>

  );

};

export default AIChat;
