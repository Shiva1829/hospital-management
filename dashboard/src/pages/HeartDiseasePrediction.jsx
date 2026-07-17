import React, { useState } from "react";
import axios from "axios";
import {
  FaHeart,
  FaUpload,
  FaRobot,
  FaCheckCircle,
  FaChartLine
} from "react-icons/fa";

import "./HeartDiseasePrediction.css";

const HeartDiseasePrediction = () => {

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const detectHeart = async () => {

    if (!file) return;

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/heart-image",
        formData
      );

      setResult(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="heartPrediction">

      <div className="heartCard">

        <div className="heartHeader">

          <FaHeart className="heartIcon"/>

          <div>

            <h2>Heart Disease Detection</h2>

            <p>
              AI Powered Heart Image Analysis
            </p>

          </div>

        </div>

        <div className="uploadArea">

          <label className="uploadBox">

            <FaUpload />

            <span>

              {file
                ? file.name
                : "Choose Heart Image"}

            </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              hidden
              onChange={(e)=>{

                const selected=e.target.files[0];

                setFile(selected);

                if(selected){
                  setPreview(
                    URL.createObjectURL(selected)
                  );
                }

              }}
            />

          </label>

        </div>

        {preview && (

          <div className="previewImage">

            <img
              src={preview}
              alt="Heart Preview"
            />

          </div>

        )}

        <button
          className="analyzeBtn"
          onClick={detectHeart}
        >

          <FaRobot />

          {loading
            ? "Analyzing..."
            : "Analyze Image"}

        </button>

        {result && (

          <div className="resultCard">

            <div className="resultHeader">

              <FaCheckCircle />

              <h3>Prediction Result</h3>

            </div>

            <div className="resultGrid">

              <div>

                <span>Disease</span>

                <h2>{result.disease}</h2>

              </div>

              <div>

                <span>Confidence</span>

                <h2>

                  {result.confidence}%

                </h2>

              </div>

            </div>

            <div className="recommendation">

              <FaChartLine />

              <p>

                {result.recommendation}

              </p>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default HeartDiseasePrediction;