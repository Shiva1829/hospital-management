import "./AddPatient.css";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUserPlus,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTint,
  FaBirthdayCake,
  FaVenusMars,
} from "react-icons/fa";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/patient/add",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        phone: "",
        email: "",
        address: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to Add Patient"
      );

    }
  };

  return (
    <div className="addPatientPage">

      <div className="patientHero">

        <div className="patientLeft">

          <span className="patientTag">
            AI HOSPITAL MANAGEMENT
          </span>

          <h1>
            Register New
            <span> Patient</span>
          </h1>

          <p>
            Digitally register patient records with
            complete demographic information for
            AI-assisted diagnosis, appointments,
            prescriptions and medical history.
          </p>

          <img
            src="/patient-register.png"
            alt="patient"
          />

        </div>

        <div className="patientRight">

          <div className="patientCard">

            <h2>

              <FaUserPlus />

              Add Patient

            </h2>

            <form onSubmit={submitHandler}>

              <div className="row">

                <div className="inputBox">

                  <FaUser />

                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="inputBox">

                  <FaBirthdayCake />

                  <input
                    type="number"
                    placeholder="Age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              <div className="row">

                <div className="inputBox">

                  <FaVenusMars />

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>

                </div>

                <div className="inputBox">

                  <FaTint />

                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Blood Group
                    </option>

                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>

                  </select>

                </div>

              </div>

              <div className="row">

                <div className="inputBox">

                  <FaPhone />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="inputBox">

                  <FaEnvelope />

                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="inputBox textarea">

                <FaMapMarkerAlt />

                <textarea
                  rows="5"
                  placeholder="Complete Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />

              </div>

              <button
                type="submit"
                className="patientBtn"
              >

                Register Patient

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddPatient;