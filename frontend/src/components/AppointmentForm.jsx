import "./AppointmentForm.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaUserMd,
  FaHeartbeat,
  FaBrain,
  FaCalendarAlt,
  FaRobot,
  FaHospital,
} from "react-icons/fa";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const location = useLocation();  
  // ===========================
  // Form States
  // ===========================

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  // ===========================
  // Doctors
  // ===========================

  const [doctors, setDoctors] = useState([]);

  // ===========================
  // Departments
  // ===========================

  const departmentsArray = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Radiology",
    "Oncology",
    "Dermatology",
    "ENT",
    "Pediatrics",
    "Physical Therapy",
  ];
    // ===========================
  // Fetch Doctors
  // ===========================

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://hospital-backend-28d9.onrender.com/api/v1/user/doctors",
          {
            withCredentials: true,
          }
        );

        setDoctors(data.doctors);
      } catch (error) {
        console.log(error);
        toast.error("Unable to fetch doctors.");
      }
    };

    fetchDoctors();
  }, []);

    // ===========================
  // Handle Appointment Booking
  // ===========================

  const handleAppointment = async (e) => {
    e.preventDefault();

    // Validation
    if (!department) {
      toast.error("Please select a department.");
      return;
    }

    if (!doctorFirstName || !doctorLastName) {
      toast.error("Please select a doctor.");
      return;
    }

    if (!appointmentTime) {
      toast.error("Please select an appointment time.");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://hospital-backend-28d9.onrender.com/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited,
          address,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);

      // Reset Form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDob("");
      setGender("");
      setAppointmentDate("");
      setAppointmentTime("");
      setDepartment("");
      setDoctorFirstName("");
      setDoctorLastName("");
      setAddress("");
      setHasVisited(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Appointment Booking Failed"
      );
    }
  };

    return (
    <div className="appointment-page">

      {/* ================= HERO SECTION ================= */}

      <section className="appointment-hero">

        {/* LEFT SIDE */}

        <div className="appointment-left">

          <span className="page-tag">
            AI APPOINTMENT BOOKING
          </span>

          <h1>
            Book Your
            <br />
            <span>Smart Healthcare</span>
            <br />
            Appointment
          </h1>

          <p>
            Experience next-generation healthcare powered by Artificial
            Intelligence, highly qualified specialists, and advanced
            diagnostic technology for faster and safer treatment.
          </p>

          <div className="feature-list">

            <div className="feature">

              <div className="feature-icon">
                <FaRobot />
              </div>

              <div>

                <h4>AI Assisted Diagnosis</h4>

                <p>
                  Intelligent disease prediction and instant medical
                  recommendations.
                </p>

              </div>

            </div>

            <div className="feature">

              <div className="feature-icon">
                <FaUserMd />
              </div>

              <div>

                <h4>Expert Doctors</h4>

                <p>
                  Consult experienced specialists across multiple
                  medical departments.
                </p>

              </div>

            </div>

            <div className="feature">

              <div className="feature-icon">
                <FaHospital />
              </div>

              <div>

                <h4>Modern Infrastructure</h4>

                <p>
                  Advanced equipment with world-class patient care
                  facilities.
                </p>

              </div>

            </div>

          </div>

        </div>
                {/* RIGHT SIDE */}

        <div className="appointment-right">

          <div className="appointment-card">

            <h2>
              <FaCalendarAlt />
              Book Appointment
            </h2>

            <form onSubmit={handleAppointment}>

              {/* First Name & Last Name */}

              <div className="row">

                <div className="input-group">

                  <label>First Name</label>

                  <input
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />

                </div>

                <div className="input-group">

                  <label>Last Name</label>

                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />

                </div>

              </div>

              {/* Email & Phone */}

              <div className="row">

                <div className="input-group">

                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                </div>

                <div className="input-group">

                  <label>Phone Number</label>

                  <input
                    type="text"
                    placeholder="9876543210"
                    value={phone}
                    maxLength={10}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />

                </div>

              </div>

              {/* DOB & Gender */}

              <div className="row">

                <div className="input-group">

                  <label>Date of Birth</label>

                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />

                </div>

                <div className="input-group">

                  <label>Gender</label>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >

                    <option value="">Select Gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>

                  </select>

                </div>

              </div>

              {/* Appointment Date & Time */}

              <div className="row">

                <div className="input-group">

                  <label>Appointment Date</label>

                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) =>
                      setAppointmentDate(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="input-group">

                  <label>Appointment Time</label>

                  <input
                    type="time"
                    value={appointmentTime}
                    onChange={(e) =>
                      setAppointmentTime(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* Department */}

              <div className="row">

                <div className="input-group">

                  <label>Department</label>

                  <select
                    value={department}
                    onChange={(e) => {
                      setDepartment(e.target.value);
                      setDoctorFirstName("");
                      setDoctorLastName("");
                    }}
                    required
                  >

                    <option value="">
                      Select Department
                    </option>

                    {departmentsArray.map((dep, index) => (

                      <option key={index} value={dep}>
                        {dep}
                      </option>

                    ))}

                  </select>

                </div>

              </div>
                            {/* Doctor Selection */}

              <div className="input-group">

                <label>Select Doctor</label>

                <select
                  value={`${doctorFirstName} ${doctorLastName}`}
                  onChange={(e) => {

                    if (!e.target.value) {

                      setDoctorFirstName("");
                      setDoctorLastName("");

                    } else {

                      const names = e.target.value.split(" ");

                      setDoctorFirstName(names[0]);

                      setDoctorLastName(names.slice(1).join(" "));

                    }

                  }}
                  disabled={!department}
                  required
                >

                  <option value="">
                    Select Doctor
                  </option>

                  {doctors
                    .filter(
                      (doctor) =>
                        doctor.doctorDepartment === department
                    )
                    .map((doctor, index) => (

                      <option
                        key={index}
                        value={`${doctor.firstName} ${doctor.lastName}`}
                      >

                        Dr. {doctor.firstName} {doctor.lastName}

                      </option>

                    ))}

                </select>

              </div>

              {/* Address */}

              <div className="input-group">

                <label>Complete Address</label>

                <textarea
                  rows="5"
                  placeholder="Enter Full Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />

              </div>

              {/* Previous Visit */}

              <div className="visit-box">

                <label className="checkbox">

                  <input
                    type="checkbox"
                    checked={hasVisited}
                    onChange={(e) =>
                      setHasVisited(e.target.checked)
                    }
                  />

                  <span>
                    I have visited ShivShakti Medical Institute before.
                  </span>

                </label>

              </div>

              {/* Submit Button */}

              <button
                type="submit"
                className="appointment-btn"
              >

                <FaCalendarAlt />

                Book Appointment

              </button>

            </form>

          </div>

        </div>

      </section>

            {/* ===========================
          STATISTICS SECTION
      =========================== */}

      <section className="appointment-stats">

        <div className="stat-card">

          <div className="stat-icon">
            <FaHeartbeat />
          </div>

          <h2>25+</h2>

          <p>Medical Departments</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaUserMd />
          </div>

          <h2>120+</h2>

          <p>Expert Doctors</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaBrain />
          </div>

          <h2>AI Powered</h2>

          <p>Healthcare System</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">
            <FaHospital />
          </div>

          <h2>24/7</h2>

          <p>Emergency Services</p>

        </div>

      </section>

      {/* ===========================
          WHY CHOOSE US
      =========================== */}

      <section className="appointment-extra">

        <h2>Why Choose ShivShakti Medical Institute?</h2>

        <div className="extra-grid">

          <div className="extra-card">

            <div className="feature-icon">
              <FaRobot />
            </div>

            <h3>Artificial Intelligence</h3>

            <p>
              Our hospital integrates AI technology to assist doctors
              in faster diagnosis and better treatment planning.
            </p>

          </div>

          <div className="extra-card">

            <div className="feature-icon">
              <FaUserMd />
            </div>

            <h3>Experienced Specialists</h3>

            <p>
              Highly qualified doctors with years of experience provide
              personalized treatment for every patient.
            </p>

          </div>

          <div className="extra-card">

            <div className="feature-icon">
              <FaHospital />
            </div>

            <h3>Modern Infrastructure</h3>

            <p>
              Fully equipped operation theatres, laboratories,
              diagnostic centers and emergency care facilities.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AppointmentForm;
