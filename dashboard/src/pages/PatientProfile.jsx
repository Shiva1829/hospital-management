import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaTint,
  FaCalendarAlt,
  FaFileMedical,
  FaBrain,
  FaUserMd,
  FaArrowLeft,
} from "react-icons/fa";

import "./PatientProfile.css";

const PatientProfile = () => {

  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [reports, setReports] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, [id]);

  const fetchAll = async () => {

    try {

      setLoading(true);

      const [patientRes, reportsRes, predictionsRes, appointmentsRes] =
        await Promise.all([
          axios.get(`http://localhost:4000/api/v1/patient/${id}`),
          axios.get(`http://localhost:4000/api/v1/report/patient/${id}`),
          axios.get(`http://localhost:4000/api/v1/predictions/patient/${id}`),
          axios.get(`http://localhost:4000/api/v1/appointment/all`),
        ]);

      setPatient(patientRes.data.patient);
      setReports(reportsRes.data.reports || []);
      setPredictions(predictionsRes.data.predictions || []);

      const patientPhone = patientRes.data.patient?.phone;

      setAppointments(
        (appointmentsRes.data.appointments || []).filter(
          (a) => a.phone === patientPhone
        )
      );

    } catch (error) {

      toast.error("Unable to load patient profile.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <div className="profileLoading">Loading patient profile...</div>;
  }

  if (!patient) {
    return <div className="profileLoading">Patient not found.</div>;
  }

  return (

    <div className="profilePage">

      <Link to="/patients" className="backLink">
        <FaArrowLeft /> Back to Patients
      </Link>

      {/* Personal Details */}

      <div className="profileHeader">

        <div className="profileAvatar">
          <FaUser />
        </div>

        <div>

          <h1>{patient.firstName} {patient.lastName}</h1>

          <span className="patientIdTag">{patient.patientId}</span>

          <div className="profileMeta">

            <span><FaPhoneAlt /> {patient.phone}</span>

            {patient.email && <span><FaEnvelope /> {patient.email}</span>}

            <span><FaTint /> {patient.bloodGroup || "—"}</span>

            <span>{patient.gender}, {patient.age} yrs</span>

          </div>

        </div>

        <div className={`statusBadge status-${patient.status}`}>
          {patient.status}
        </div>

      </div>

      <div className="profileGrid">

        {/* Appointments */}

        <div className="profileCard">

          <h2><FaCalendarAlt /> Appointments</h2>

          {appointments.length === 0 ? (
            <p className="emptyText">No appointments found.</p>
          ) : (
            appointments.map((a) => (
              <div className="listRow" key={a._id}>
                <div>
                  <strong>{a.department}</strong>
                  <p>Dr. {a.doctor?.firstName} {a.doctor?.lastName}</p>
                </div>
                <div>
                  <span>{new Date(a.appointment_date).toLocaleDateString()}</span>
                  <span className={`tag tag-${a.status}`}>{a.status}</span>
                </div>
              </div>
            ))
          )}

        </div>

        {/* Reports */}

        <div className="profileCard">

          <h2><FaFileMedical /> Reports & OCR</h2>

          {reports.length === 0 ? (
            <p className="emptyText">No reports uploaded yet.</p>
          ) : (
            reports.map((r) => (
              <div className="listRow column" key={r._id}>
                <div className="rowTop">
                  <strong>{r.reportType}</strong>
                  <span>{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>

                {r.doctorName && <p className="doctorLine"><FaUserMd /> {r.doctorName}</p>}

                {r.extractedText && (
                  <p className="ocrText">{r.extractedText.slice(0, 200)}{r.extractedText.length > 200 ? "..." : ""}</p>
                )}

                <span className={`tag tag-${r.status?.replace(" ", "")}`}>{r.status}</span>
              </div>
            ))
          )}

        </div>

        {/* AI Predictions */}

        <div className="profileCard fullWidth">

          <h2><FaBrain /> AI Prediction History</h2>

          {predictions.length === 0 ? (
            <p className="emptyText">No AI predictions recorded yet.</p>
          ) : (
            <div className="predictionGrid">
              {predictions.map((p) => (
                <div className="predictionCard" key={p._id}>
                  <h4>{p.diseaseType}</h4>
                  <p>{p.prediction}</p>
                  <span className="confidenceTag">{p.confidence}% confidence</span>
                  <span className={`tag tag-${p.status}`}>{p.status}</span>
                  <small>{new Date(p.createdAt).toLocaleString()}</small>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>

  );

};

export default PatientProfile;