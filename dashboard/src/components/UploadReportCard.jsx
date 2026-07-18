import React, { useState } from "react";
import {
  FaCloudUploadAlt,
  FaFileMedical,
  FaCheckCircle
} from "react-icons/fa";

import "./UploadReportCard.css";

const UploadReportCard = () => {

  const [file, setFile] = useState(null);

  const [uploaded, setUploaded] = useState(false);

  const handleFile = (e) => {

    if (e.target.files.length > 0) {

      setFile(e.target.files[0]);

      setUploaded(false);

    }

  };

  const uploadReport = () => {

    if (!file) return;

    // Backend API can be called here

    setUploaded(true);

  };

  return (

    <div className="uploadReportCard">

      <div className="uploadHeader">

        <FaFileMedical />

        <div>

          <h2>Upload Medical Report</h2>

          <p>
            Upload patient reports securely.
          </p>

        </div>

      </div>

      <label className="uploadArea">

        <FaCloudUploadAlt className="uploadIcon"/>

        <h3>

          Click to Upload Report

        </h3>

        <p>

          PDF, JPG, PNG, DOCX

        </p>

        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFile}
          hidden
        />

      </label>

      {

        file && (

          <div className="selectedFile">

            <strong>Selected File</strong>

            <p>{file.name}</p>

          </div>

        )

      }

      <button
        className="uploadBtn"
        onClick={uploadReport}
        disabled={!file}
      >

        Upload Report

      </button>

      {

        uploaded && (

          <div className="successBox">

            <FaCheckCircle />

            <span>

              Report uploaded successfully.

            </span>

          </div>

        )

      }

    </div>

  );

};

export default UploadReportCard;
