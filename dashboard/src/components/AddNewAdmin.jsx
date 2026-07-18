import React, { useContext, useState } from "react";
import axios from "axios";
import {
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaLock,
  FaVenusMars,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Context } from "../context/Context";
import { Navigate, useNavigate } from "react-router-dom";

import "./AddNewAdmin.css";

const AddNewAdmin = () => {

  const { isAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleAddNewAdmin = async (e) => {

    e.preventDefault();

    try {

      const { data } = await axios.post(

        "https://hospital-backend-28d9.onrender.com/api/v1/user/admin/addnew",

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

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setGender("");
      setPassword("");

      navigate("/dashboard");

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Unable to create Admin"

      );

    }

  };

  if (!isAuthenticated) {

    return <Navigate to="/login" />;

  }

  return (

    <div className="addAdminPage">

      <div className="addAdminCard">

        <div className="adminHeader">

          <FaUserShield className="adminIcon"/>

          <div>

            <h1>Add New Administrator</h1>

            <p>

              Create a new hospital administrator account.

            </p>

          </div>

        </div>

        <form onSubmit={handleAddNewAdmin}>

          <div className="formGrid">

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

            <div className="inputBox">

              <FaEnvelope/>

              <input
                type="email"
                placeholder="Email Address"
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
                  Select Gender
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
            className="adminBtn"
          >

            <FaUserPlus/>

            Create Administrator

          </button>

        </form>

      </div>

    </div>

  );

};

export default AddNewAdmin;
