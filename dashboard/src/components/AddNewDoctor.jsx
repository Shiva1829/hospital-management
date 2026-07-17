import React, { useContext, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaLock,
  FaVenusMars,
  FaCamera,
  FaHospital,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

import "./AddNewDoctor.css";

const AddNewDoctor = () => {

  const { isAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");

  const [docAvatar, setDocAvatar] = useState(null);

  const [docAvatarPreview, setDocAvatarPreview] =
    useState("/docHolder.jpg");

  const [loading, setLoading] = useState(false);

  const departmentsArray = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "ENT",
    "Pediatrics",
    "Radiology",
    "Oncology",
    "General Medicine",
    "Nephrology",
    "Psychiatry",
    "Gynecology",
    "Pulmonology",
    "Urology",
    "Emergency Medicine",
  ];
    const handleAvatar = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setDocAvatar(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setDocAvatarPreview(reader.result);
    };

    reader.readAsDataURL(file);

  };

  const handleAddNewDoctor = async (e) => {

    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !dob ||
      !gender ||
      !password ||
      !doctorDepartment
    ) {

      toast.error("Please fill all required fields.");

      return;

    }

    if (!docAvatar) {

      toast.error("Please upload doctor's profile photo.");

      return;

    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const { data } = await axios.post(

        "http://localhost:4000/api/v1/user/doctor/addnew",

        formData,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
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
      setDoctorDepartment("");

      setDocAvatar(null);
      setDocAvatarPreview("/docHolder.jpg");

      navigate("/doctors");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Unable to register doctor."
      );

    } finally {

      setLoading(false);

    }

  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (

<div className="doctorPage">

  <div className="doctorCard">

    <div className="doctorHeader">

      <FaUserMd className="doctorIcon"/>

      <div>

        <h1>Register New Doctor</h1>

        <p>

          Add a specialist to ShivShakti AI Hospital

        </p>

      </div>

    </div>

    <form onSubmit={handleAddNewDoctor}>

      <div className="doctorLayout">

        {/* LEFT */}

        <div className="doctorPhotoCard">

          <img
            src={docAvatarPreview}
            alt="Doctor"
          />

          <label className="uploadButton">

            <FaCamera />

            Upload Photo

            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatar}
            />

          </label>

          <p>

            Professional Doctor Profile Photo

          </p>

        </div>

        {/* RIGHT */}

        <div className="doctorForm">

          <div className="grid2">

            <div className="inputBox">

              <FaUser />

              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e)=>
                  setFirstName(e.target.value)
                }
                required
              />

            </div>

            <div className="inputBox">

              <FaUser />

              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e)=>
                  setLastName(e.target.value)
                }
                required
              />

            </div>

          </div>

          <div className="grid2">

            <div className="inputBox">

              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e)=>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

            <div className="inputBox">

              <FaPhone />

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

          <div className="grid2">

            <div className="inputBox">

              <FaBirthdayCake />

              <input
                type="date"
                value={dob}
                onChange={(e)=>
                  setDob(e.target.value)
                }
                required
              />

            </div>

            <div className="inputBox">

              <FaVenusMars />

              <select
                value={gender}
                onChange={(e)=>
                  setGender(e.target.value)
                }
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

          <div className="grid2">

            <div className="inputBox">

              <FaHospital />

              <select
                value={doctorDepartment}
                onChange={(e)=>

                  setDoctorDepartment(

                    e.target.value

                  )

                }
                required
              >

                <option value="">

                  Select Department

                </option>

                {

                  departmentsArray.map(

                    (department,index)=>(

                      <option
                        key={index}
                        value={department}
                      >

                        {department}

                      </option>

                    )

                  )

                }

              </select>

            </div>

            <div className="inputBox">

              <FaLock />

              <input
                type="password"
                placeholder="Create Password"
                value={password}
                onChange={(e)=>

                  setPassword(e.target.value)

                }
                required
              />

            </div>

          </div>

          <button

            type="submit"

            className="registerDoctorBtn"

            disabled={loading}

          >

            {

              loading

              ?

              "Registering Doctor..."

              :

              "Register Doctor"

            }

          </button>

        </div>

      </div>

    </form>

  </div>

</div>

);
};

export default AddNewDoctor;