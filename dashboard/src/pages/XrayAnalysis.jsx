import React, { useState } from "react";
import axios from "axios";
import {
  FaXRay,
  FaCloudUploadAlt,
  FaDownload,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

import generatePDF from "../utils/generatePDF";
import "./XrayAnalysis.css";

const XrayAnalysis = () => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {

    if (!file) {

      alert("Please select an X-Ray image.");

      return;

    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "https://incentives-threatened-gba-characteristics.trycloudflare.com/xray",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Analysis Failed.");

    } finally {

      setLoading(false);

    }

  };

  const downloadReport = () => {

    if (!result) {

      alert("Please analyze an image first.");

      return;

    }

    generatePDF(
      "Shivanand",
      "Chest X-Ray",
      result.disease,
      result.confidence,
      result.recommendation
    );

  };

  return (

    <div className="xrayPage">

      <div className="xrayCard">

        <div className="pageHeader">

          <FaXRay className="headerIcon" />

          <div>

            <h1>AI X-Ray Analysis</h1>

            <p>

              Upload an X-Ray image for AI diagnosis.

            </p>

          </div>

        </div>

        <div className="uploadBox">

          <FaCloudUploadAlt />

          <p>

            Drag & Drop X-Ray Image

          </p>

          <span>OR</span>

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={(e)=>setFile(e.target.files[0])}
          />

          {

            file &&

            <small>

              Selected :
              {" "}
              {file.name}

            </small>

          }

        </div>

        <div className="buttonGroup">

          <button
            className="analyzeBtn"
            onClick={analyze}
          >

            {

              loading ?

              <>

                <FaSpinner className="spin"/>

                Analyzing...

              </>

              :

              "Analyze X-Ray"

            }

          </button>

          {

            result &&

            <button
              className="downloadBtn"
              onClick={downloadReport}
            >

              <FaDownload />

              Download Report

            </button>

          }

        </div>

        {

          result &&

          <div className="resultCard">

            <div className="status">

              <FaCheckCircle />

              Analysis Completed

            </div>

            <h2>

              Diagnosis

            </h2>

            <h3>

              {result.disease}

            </h3>

            <p>

              <strong>Confidence :</strong>

              {" "}

              {result.confidence} %

            </p>

            <p>

              <strong>Recommendation :</strong>

            </p>

            <div className="recommendation">

              {

                result.recommendation ||

                "Consult your physician."

              }

            </div>

          </div>

        }

      </div>

    </div>

  );

};

export default XrayAnalysis;
