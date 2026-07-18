import React, { useState } from "react";
import axios from "axios";
import {
  FaHeartbeat,
  FaUpload,
  FaFileDownload,
  FaCheckCircle,
} from "react-icons/fa";
import generatePDF from "../utils/generatePDF";
import "./KidneyStonePrediction.css";

const KidneyStonePrediction = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const analyze = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/kidney",
        formData
      );

      setResult(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const downloadReport = () => {
    generatePDF(
      "Patient",
      "Kidney Stone",
      result.disease,
      result.confidence,
      result.recommendation ||
        "Consult an Urologist. Drink more water and undergo further diagnosis."
    );
  };

  return (
    <div className="kidney-page">

      <div className="kidney-card">

        <div className="kidney-header">

          <FaHeartbeat className="kidney-icon" />

          <h1>Kidney Stone Detection</h1>

          <p>
            AI Powered CT Scan Analysis
          </p>

        </div>

        <label className="upload-box">

          <FaUpload />

          <span>Select CT Scan Image</span>

          <input
            type="file"
            hidden
            accept=".jpg,.jpeg,.png"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setPreview(
                URL.createObjectURL(e.target.files[0])
              );
            }}
          />

        </label>

        {preview && (
          <img
            src={preview}
            alt="preview"
            className="preview-image"
          />
        )}

        <button
          className="analyze-btn"
          onClick={analyze}
        >
          Analyze Image
        </button>

        {loading && (
          <div className="loader">
            AI is analyzing image...
          </div>
        )}

        {result && (

          <div className="result-card">

            <FaCheckCircle className="success-icon"/>

            <h2>{result.disease}</h2>

            <h3>
              Confidence : {result.confidence}%
            </h3>

            <p>
              {result.recommendation ||
                "Kidney scan analyzed successfully."}
            </p>

            <button
              className="download-btn"
              onClick={downloadReport}
            >

              <FaFileDownload />

              Download Report

            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default KidneyStonePrediction;
