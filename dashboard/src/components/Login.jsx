import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  FaEnvelope,
  FaLock,
  FaShieldAlt,
  FaHospital,
} from "react-icons/fa";

import { Context } from "../context/Context";

import "./Login.css";

const Login = () => {

  const { isAuthenticated, setIsAuthenticated } =
    useContext(Context);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const { data } = await axios.post(

        "https://hospital-backend-28d9.onrender.com/api/v1/user/login",

        {
          email,
          password,
          confirmPassword,
          role: "Admin",
        },

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }

      );

      toast.success(data.message);

      setIsAuthenticated(true);

      navigate("/");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login Failed"

      );

    } finally {

      setLoading(false);

    }

  };

  if (isAuthenticated) {

    return <Navigate to="/" />;

  }

  return (

    <div className="loginPage">

      <div className="loginCard">

        <div className="loginHeader">

          <div className="hospitalIcon">

            <FaHospital />

          </div>

          <h1>ShivShakti Hospital</h1>

          <p>AI Powered Hospital Management System</p>

        </div>

        <div className="adminBadge">

          <FaShieldAlt />

          Administrator Login

        </div>

        <form onSubmit={handleLogin}>

          <div className="inputBox">

            <FaEnvelope />

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>

          <div className="inputBox">

            <FaLock />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

          </div>

          <div className="inputBox">

            <FaLock />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="loginBtn"
            disabled={loading}
          >

            {

              loading

              ?

              "Signing In..."

              :

              "Login"

            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default Login;
