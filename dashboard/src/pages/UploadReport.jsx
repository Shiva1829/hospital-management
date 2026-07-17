import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaFileMedical,
  FaCloudUploadAlt,
  FaUser,
  FaUserMd,
} from "react-icons/fa";

import "./UploadReport.css";

const UploadReport = () => {

  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [reportType, setReportType] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/patient/all"
        );
        setPatients(data.patients || []);
      } catch (error) {
        toast.error("Unable to load patient list.");
      }
    };

    fetchPatients();
  }, []);

  const handleUpload = async (e) => {

    e.preventDefault();

    if (!file) {
      toast.error("Please select a report file.");
      return;
    }

    if (!patientId) {
      toast.error("Please select a patient.");
      return;
    }

    try {

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("patientId", patientId);
      formData.append("reportType", reportType);
      formData.append("doctorName", doctorName);

      const { data } = await axios.post(
        "http://localhost:4000/api/v1/report/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(data.message);

      setPatientId("");
      setReportType("");
      setDoctorName("");
      setFile(null);

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Unable to upload report."
      );

    } finally {

      setUploading(false);

    }

  };

  return (

    <div className="uploadPage">

      <div className="uploadHeader">

        <h1>

          <FaFileMedical />

          Upload Medical Report

        </h1>

        <p>

          Upload patient medical reports — text will be
          extracted automatically using OCR.

        </p>

      </div>

      <div className="uploadCard">

        <form onSubmit={handleUpload}>

          <div className="row">

            <div className="inputBox">

              <FaUser />

              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
              >
                <option value="">Select Patient</option>

                {patients.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.firstName} {p.lastName} ({p.patientId})
                  </option>
                ))}

              </select>

            </div>

            <div className="inputBox">

              <FaUserMd />

              <input
                type="text"
                placeholder="Doctor Name (optional)"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />

            </div>

          </div>

          <div className="row">

            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              required
            >

              <option value="">
                Select Report Type
              </option>

              <option value="Blood Report">Blood Report</option>

              <option value="X-Ray">X-Ray</option>

              <option value="MRI">MRI</option>

              <option value="CT Scan">CT Scan</option>

              <option value="Ultrasound">Ultrasound</option>

              <option value="ECG">ECG</option>

              <option value="Prescription">Prescription</option>

              <option value="Other">Other</option>

            </select>

          </div>

          <div className="uploadArea">

            <FaCloudUploadAlt />

            <p>

              Drag & Drop Report Here

            </p>

            <span>

              OR

            </span>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file &&

              <small>

                Selected File:
                {" "}
                {file.name}

              </small>

            }

          </div>

          <button
            className="uploadBtn"
            type="submit"
            disabled={uploading}
          >

            <FaCloudUploadAlt />

            {uploading ? "Uploading & Extracting Text..." : "Upload Report"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default UploadReport;