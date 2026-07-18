import axios from "axios";
import React, { useContext, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaBirthdayCake,
  FaVenusMars,
  FaHeartbeat,
  FaRobot,
  FaUserMd,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Context } from "../main";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import "./Register.css";

const Register = () => {

  const { isAuthenticated, setIsAuthenticated } =
    useContext(Context);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(
        "https://hospital-backend-28d9.onrender.com/api/v1/user/patient/register",
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          password,
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
          "Registration Failed"
      );

    }

  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="registerPage">

      {/* LEFT */}

      <div className="registerLeft">

        <span className="registerTag">
          AI HEALTHCARE
        </span>

        <h1>

          Join

          <span>
            ShivShakti Hospital
          </span>

        </h1>

        <p>

          Create your secure patient account and
          access AI disease prediction,
          appointments,
          medical reports,
          prescriptions,
          and expert healthcare services.

        </p>

        <div className="registerFeature">

          <FaRobot className="featureIcon"/>

          <div>

            <h4>AI Disease Detection</h4>

            <p>
              Smart Medical Prediction System
            </p>

          </div>

        </div>

        <div className="registerFeature">

          <FaUserMd className="featureIcon"/>

          <div>

            <h4>Experienced Doctors</h4>

            <p>
              120+ Specialists Available
            </p>

          </div>

        </div>

        <div className="registerFeature">

          <FaHeartbeat className="featureIcon"/>

          <div>

            <h4>24×7 Healthcare</h4>

            <p>
              Modern AI Hospital
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="registerRight">

        <div className="registerCard">

          <h2>Create Account</h2>

          <p>
            Register as a Patient
          </p>

          <form onSubmit={handleRegistration}>

            <div className="row">

              <div className="inputBox">

                <FaUser/>

                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  required
                />

              </div>

              <div className="inputBox">

                <FaUser/>

                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e)=>setLastName(e.target.value)}
                  required
                />

              </div>

            </div>

            <div className="row">

              <div className="inputBox">

                <FaEnvelope/>

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                />

              </div>

              <div className="inputBox">

                <FaPhone/>

                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  maxLength={10}
                  onChange={(e)=>
                    setPhone(
                      e.target.value.replace(/\D/g,"")
                    )
                  }
                  required
                />

              </div>

            </div>

            <div className="row">

              <div className="inputBox">

                <FaBirthdayCake/>

                <input
                  type="date"
                  value={dob}
                  onChange={(e)=>setDob(e.target.value)}
                  required
                />

              </div>

              <div className="inputBox">

                <FaVenusMars/>

                <select
                  value={gender}
                  onChange={(e)=>setGender(e.target.value)}
                  required
                >

                  <option value="">
                    Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>

            </div>

            <div className="inputBox full">

              <FaLock/>

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="registerBtn"
            >
              Create Account
            </button>

          </form>

          <div className="registerFooter">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Login
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
