import axios from "axios";
import React, { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaHeartbeat,
  FaRobot,
  FaUserMd
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {
          email,
          password,
          role: "Patient",
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(res.data.message);

      setIsAuthenticated(true);

      setEmail("");
      setPassword("");

      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-page">

      <div className="login-left">

        <span className="login-tag">
          AI HEALTHCARE
        </span>

        <h1>
          Welcome Back to
          <span> ShivShakti Hospital</span>
        </h1>

        <p>
          Securely access your appointments,
          AI reports, prescriptions,
          patient records and healthcare dashboard.
        </p>

        <div className="login-feature">

          <FaRobot className="feature-icon"/>

          <div>
            <h4>AI Powered Diagnosis</h4>
            <p>Instant medical analysis support.</p>
          </div>

        </div>

        <div className="login-feature">

          <FaUserMd className="feature-icon"/>

          <div>
            <h4>Expert Doctors</h4>
            <p>Consult experienced specialists.</p>
          </div>

        </div>

        <div className="login-feature">

          <FaHeartbeat className="feature-icon"/>

          <div>
            <h4>24×7 Healthcare</h4>
            <p>Modern treatment with advanced technology.</p>
          </div>

        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Patient Login</h2>

          <p>
            Sign in to continue
          </p>

          <form onSubmit={handleLogin}>

            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-box">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

          </form>

          <div className="login-footer">

            <span>
              New Patient?
            </span>

            <Link to="/register">
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;