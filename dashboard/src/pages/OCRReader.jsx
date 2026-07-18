import React, { useState } from "react";
import axios from "axios";
import {
  FaFileAlt,
  FaUpload,
  FaCopy,
  FaDownload,
  FaRobot,
  FaCheckCircle,
} from "react-icons/fa";

import "./OCRReader.css";

const OCRReader = () => {

  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");

  const extractText = async () => {

    if (!file) return;

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/ocr",
        formData
      );

      setText(response.data.extracted_text);

      setLoading(false);

    }

    catch (error) {

      console.log(error);

      setText("Unable to extract text.");

      setLoading(false);

    }

  };

  const copyText = () => {

    navigator.clipboard.writeText(text);

    alert("Extracted text copied successfully.");

  };

  const downloadText = () => {

    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "OCR_Report.txt";

    a.click();

  };

  return (

    <div className="ocr-page">

      <div className="ocr-card">

        <div className="ocr-header">

          <FaRobot className="ocr-icon"/>

          <h1>OCR Medical Report Reader</h1>

          <p>

            AI Powered Medical Report Text Extraction

          </p>

        </div>

        <label className="upload-box">

          <FaUpload/>

          <span>

            Upload Medical Report

          </span>

          <input

            type="file"

            hidden

            accept=".jpg,.jpeg,.png,.bmp,.tiff,.pdf"

            onChange={(e)=>{

              setFile(e.target.files[0]);

              if(e.target.files[0].type.includes("image")){

                setPreview(
                  URL.createObjectURL(e.target.files[0])
                );

              }

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

          className="extract-btn"

          onClick={extractText}

        >

          Extract Text

        </button>

        {loading && (

          <div className="loader">

            AI is extracting text...

          </div>

        )}

        {text && (

          <div className="result-card">

            <FaCheckCircle className="success-icon"/>

            <h2>

              Extracted Report

            </h2>

            <textarea

              readOnly

              value={text}

            />

            <div className="button-group">

              <button

                className="copy-btn"

                onClick={copyText}

              >

                <FaCopy/>

                Copy

              </button>

              <button

                className="download-btn"

                onClick={downloadText}

              >

                <FaDownload/>

                Download

              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

};

export default OCRReader;
