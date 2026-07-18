import React, { useState } from "react";
import axios from "axios";
import {
  FaRobot,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";

import "./ChatBot.css";

const ChatBot = () => {

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {

    if (message.trim() === "") {
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(

        "https://hospital-backend-28d9.onrender.com/api/v1/chatbot/chat",

        {
          message,
        }

      );

      setReply(response.data.reply);

    } catch (error) {

      console.log(error);

      setReply("Unable to connect to AI Assistant.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="chatbotPage">

      <div className="chatbotCard">

        <div className="chatHeader">

          <FaRobot className="robotIcon"/>

          <div>

            <h2>AI Medical Assistant</h2>

            <p>

              Ask anything about diseases, medicines,
              reports and healthcare.

            </p>

          </div>

        </div>

        <div className="chatArea">

          {message && (

            <div className="userMessage">

              <FaUserCircle className="chatUser"/>

              <div>

                {message}

              </div>

            </div>

          )}

          {loading ? (

            <div className="botMessage">

              <FaRobot className="chatBot"/>

              <div>

                Thinking...

              </div>

            </div>

          ) : (

            reply && (

              <div className="botMessage">

                <FaRobot className="chatBot"/>

                <div>

                  {reply}

                </div>

              </div>

            )

          )}

        </div>

        <div className="chatInput">

          <input

            type="text"

            placeholder="Ask your medical question..."

            value={message}

            onChange={(e)=>
              setMessage(e.target.value)
            }

            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                sendMessage();
              }
            }}

          />

          <button onClick={sendMessage}>

            <FaPaperPlane/>

          </button>

        </div>

      </div>

    </div>

  );

};

export default ChatBot;
