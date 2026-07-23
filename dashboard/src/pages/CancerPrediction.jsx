import React, { useState } from "react";
import axios from "axios";
import {
  FaLungs,
  FaUpload,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";

import DownloadReportButton from "../components/DownloadReportButton";
import "./CancerPrediction.css";

const CancerPrediction = () => {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictCancer = async () => {

    if (!file) {
      alert("Please select a CT Scan image.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "https://incentives-threatened-gba-characteristics.trycloudflare.com/cancer-detection-Image",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

      alert("Prediction Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="cancerPage">

      <div className="cancerCard">

        <div className="cancerHeader">

          <FaLungs className="cancerIcon"/>

          <div>

            <h2>Lung Cancer Detection</h2>

            <p>

              AI Powered CT Scan Image Analysis

            </p>

          </div>

        </div>

        <div className="uploadSection">

          <label className="uploadBox">

            <FaUpload className="uploadIcon"/>

            <span>

              {file
                ? file.name
                : "Choose CT Scan Image"}

            </span>

            <input
              type="file"
              hidden
              onChange={(e)=>setFile(e.target.files[0])}
            />

          </label>

          <button
            className="predictBtn"
            onClick={predictCancer}
          >

            {loading ? (

              "Analyzing..."

            ) : (

              <>
                <FaRobot />
                Detect Cancer
              </>

            )}

          </button>

        </div>

        {result && (

          <div className="resultBox">

            <FaCheckCircle className="successIcon"/>

            <h3>

              Prediction Result

            </h3>

            <div className="resultGrid">

              <div className="resultItem">

                <span>Disease</span>

                <h2>

                  {result.disease}

                </h2>

              </div>

              <div className="resultItem">

                <span>Confidence</span>

                <h2>

                  {result.confidence} %

                </h2>

              </div>

            </div>

            <p>

              AI model predicts

              <b> {result.disease}</b>

              with

              <b> {result.confidence}%</b>

              confidence.

            </p>

            <DownloadReportButton

              patientName="Patient"

              disease={result.disease}

              confidence={result.confidence}

              recommendation={`Consult an Oncologist immediately for further evaluation regarding ${result.disease}.`}

            />

          </div>

        )}

      </div>

    </div>

  );

};

export default CancerPrediction;
