import React, { useState } from "react";
import axios from "axios";
import {
  FaFileMedical,
  FaUpload,
  FaCheckCircle,
  FaFileDownload,
} from "react-icons/fa";
import generatePDF from "../utils/generatePDF";
import "./LiverDiseasePrediction.css";

const LiverDiseasePrediction = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  const detectLiver = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/liver-image",
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
      "Liver Disease",
      result.disease,
      result.confidence,
      result.recommendation ||
        "Consult a Gastroenterologist for further diagnosis."
    );
  };

  return (
    <div className="liver-page">

      <div className="liver-card">

        <div className="liver-header">

          <FaFileMedical className="liver-icon" />

          <h1>Liver Disease Detection</h1>

          <p>
            AI Powered Liver Scan Analysis
          </p>

        </div>

        <label className="upload-box">

          <FaUpload />

          <span>Upload Liver Scan Image</span>

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
            alt="Preview"
            className="preview-image"
          />
        )}

        <button
          className="analyze-btn"
          onClick={detectLiver}
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

            <FaCheckCircle className="success-icon" />

            <h2>{result.disease}</h2>

            <h3>
              Confidence : {result.confidence}%
            </h3>

            <p>
              {result.recommendation ||
                "Liver scan analyzed successfully."}
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

export default LiverDiseasePrediction;