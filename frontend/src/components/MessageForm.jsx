import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaUser,
  FaPaperPlane,
  FaComments,
} from "react-icons/fa";
import "./MessageForm.css";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {
          firstName,
          lastName,
          email,
          phone,
          message,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send message."
      );
    }
  };

  return (
    <section className="contact-section">

      <div className="contact-left">

        <span className="section-tag">
          CONTACT US
        </span>

        <h2>
          We'd Love to
          <span> Hear From You</span>
        </h2>

        <p>
          Have questions regarding appointments,
          AI diagnosis, laboratory reports or medical
          services? Our healthcare support team is
          available round the clock.
        </p>

        <div className="contact-cards">

          <div className="contact-card">
            <FaPhoneAlt className="contact-icon" />

            <div>
              <h4>Call Us</h4>
              <p>+91 99999 99999</p>
            </div>
          </div>

          <div className="contact-card">
            <FaEnvelope className="contact-icon" />

            <div>
              <h4>Email</h4>
              <p>support@shivshaktihospital.com</p>
            </div>
          </div>

          <div className="contact-card">
            <FaComments className="contact-icon" />

            <div>
              <h4>Live Support</h4>
              <p>Available 24 × 7</p>
            </div>
          </div>

        </div>

      </div>

      <div className="contact-right">

        <div className="contact-form-card">

          <h3>
            Send a Message
          </h3>

          <form onSubmit={handleMessage}>

            <div className="contact-row">

              <div className="input-box">
                <FaUser />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) =>
                    setFirstName(e.target.value)
                  }
                  required
                />
              </div>

              <div className="input-box">
                <FaUser />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) =>
                    setLastName(e.target.value)
                  }
                  required
                />
              </div>

            </div>

            <div className="contact-row">

              <div className="input-box">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="input-box">
                <FaPhoneAlt />
                <input
                  type="text"
                  placeholder="Phone Number"
                  maxLength={10}
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  required
                />
              </div>

            </div>

            <textarea
              rows="6"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              required
            ></textarea>

            <button type="submit">

              <FaPaperPlane />

              Send Message

            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default MessageForm;