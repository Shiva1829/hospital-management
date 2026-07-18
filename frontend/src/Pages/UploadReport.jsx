import React, { useState } from "react";
import axios from "axios";
import {
  FaCloudUploadAlt,
  FaFileMedical,
  FaUserInjured,
  FaNotesMedical,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./UploadReport.css";

const UploadReport = () => {
  const [patientId, setPatientId] = useState("");
  const [reportType, setReportType] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!patientId || !reportType || !file) {
      toast.error("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("reportType", reportType);
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://hospital-backend-28d9.onrender.com/api/v1/report/upload",
        formData
      );

      toast.success(res.data.message);

      setPatientId("");
      setReportType("");
      setFile(null);

      document.getElementById("upload-file").value = "";
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload Failed");
    }
  };

  return (
    <div className="upload-page">

      <div className="upload-left">

        <span className="upload-tag">
          DIGITAL MEDICAL REPORTS
        </span>

        <h1>
          Upload Your
          <span> Medical Reports </span>
          Securely
        </h1>

        <p>
          Upload laboratory reports, scans, X-Rays,
          MRI, CT Scan, ECG, Blood Reports and
          other medical documents securely to your
          digital health profile.
        </p>

        <div className="upload-features">

          <div className="upload-feature">
            <FaCloudUploadAlt />
            <div>
              <h4>Secure Upload</h4>
              <p>Encrypted cloud storage</p>
            </div>
          </div>

          <div className="upload-feature">
            <FaFileMedical />
            <div>
              <h4>Multiple Formats</h4>
              <p>PDF, JPG, PNG, JPEG</p>
            </div>
          </div>

          <div className="upload-feature">
            <FaNotesMedical />
            <div>
              <h4>AI Analysis Ready</h4>
              <p>Instant disease detection support</p>
            </div>
          </div>

        </div>

      </div>

      <div className="upload-right">

        <div className="upload-card">

          <h2>
            <FaCloudUploadAlt />
            Upload Report
          </h2>

          <form onSubmit={submitHandler}>

            <div className="input-box">
              <FaUserInjured />
              <input
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
              />
            </div>

            <div className="input-box">

              <FaFileMedical />

              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >

                <option value="">
                  Select Report Type
                </option>

                <option>Blood Test</option>
                <option>CBC</option>
                <option>Diabetes</option>
                <option>Liver Profile</option>
                <option>ECG</option>
                <option>CT Scan</option>
                <option>MRI</option>
                <option>X-Ray</option>

              </select>

            </div>

            <div className="file-upload">

              <label htmlFor="upload-file">

                <FaCloudUploadAlt />

                {file
                  ? file.name
                  : "Choose Medical Report"}

              </label>

              <input
                id="upload-file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              />

            </div>

            <button
              type="submit"
              className="upload-btn"
            >
              Upload Report
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default UploadReport;
