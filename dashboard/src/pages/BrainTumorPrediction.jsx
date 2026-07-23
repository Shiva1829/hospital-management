import React, { useState } from "react";
import axios from "axios";
import {
  FaBrain,
  FaUpload,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";

import "./BrainTumorPrediction.css";

const BrainTumorPrediction = () => {

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const detectTumor = async () => {

    if (!file) {
      alert("Please select an MRI image.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "https://incentives-threatened-gba-characteristics.trycloudflare.com/brain-tumor",
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

    <div className="brainPage">

      <div className="brainCard">

        <div className="brainHeader">

          <FaBrain className="brainIcon"/>

          <div>

            <h2>Brain Tumor Detection</h2>

            <p>

              AI Powered MRI Image Analysis

            </p>

          </div>

        </div>

        <div className="uploadSection">

          <label className="uploadBox">

            <FaUpload className="uploadIcon"/>

            <span>

              {file
                ? file.name
                : "Choose MRI Image"}

            </span>

            <input
              type="file"
              hidden
              onChange={(e)=>
                setFile(e.target.files[0])
              }
            />

          </label>

          <button
            onClick={detectTumor}
            className="predictBtn"
          >

            {loading ? (

              "Analyzing..."

            ) : (

              <>
                <FaRobot />
                Analyze MRI
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

                <span>Tumor Type</span>

                <h2>

                  {result.tumor}

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

              AI Model predicts that the uploaded MRI image
              belongs to

              <b> {result.tumor}</b>

              with

              <b> {result.confidence}%</b>

              confidence.

            </p>

          </div>

        )}

      </div>

    </div>

  );

};

export default BrainTumorPrediction;
