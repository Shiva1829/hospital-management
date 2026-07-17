import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaRobot,
} from "react-icons/fa";

const Footer = () => {
  const hours = [
    {
      day: "Monday - Friday",
      time: "09:00 AM - 09:00 PM",
    },
    {
      day: "Saturday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      day: "Sunday",
      time: "Emergency Only",
    },
  ];

  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Logo */}

        <div className="footer-column">

          <div className="footer-logo">

            <div className="footer-logo-icon">
              <FaRobot />
            </div>

            <div>
              <h2>ShivShakti</h2>
              <span>AI Healthcare</span>
            </div>

          </div>

          <p>
            ShivShakti Medical Institute is an
            AI-powered smart healthcare platform
            offering disease prediction,
            digital healthcare management,
            online appointments and
            intelligent medical services.
          </p>

          <div className="social-icons">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaLinkedinIn />
            </a>

            <a href="#">
              <FaTwitter />
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/appointment">
                Appointment
              </Link>
            </li>

            <li>
              <Link to="/about">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

          </ul>

        </div>

        {/* Hospital Timing */}

        <div className="footer-column">

          <h3>Hospital Hours</h3>

          {hours.map((item, index) => (

            <div
              className="footer-hours"
              key={index}
            >

              <span>{item.day}</span>

              <strong>{item.time}</strong>

            </div>

          ))}

        </div>

        {/* Contact */}

        <div className="footer-column">

          <h3>Contact Us</h3>

          <div className="footer-contact">

            <FaPhoneAlt />

            <span>+91 99999 99999</span>

          </div>

          <div className="footer-contact">

            <FaEnvelope />

            <span>
              support@shivshaktihospital.com
            </span>

          </div>

          <div className="footer-contact">

            <FaMapMarkerAlt />

            <span>
              ShivShakti Medical Institute
              <br />
              Sankeshwar,
              Hukkeri,
              Belagavi,
              Karnataka,
              India
            </span>

          </div>

        </div>

      </div>

      <hr />

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()}
          {" "}
          ShivShakti Medical Institute.
          All Rights Reserved.
        </p>

        <div className="footer-policy">

          <Link to="#">
            Privacy Policy
          </Link>

          <Link to="#">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;