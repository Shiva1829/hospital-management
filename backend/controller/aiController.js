import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const AI_SERVER = "http://127.0.0.1:8000";

const sendImageToAI = async (endpoint, req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image.",
      });
    }

    const form = new FormData();

    form.append(
      "file",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    const response = await axios.post(
      `${AI_SERVER}/${endpoint}`,
      form,
      {
        headers: form.getHeaders(),
        maxBodyLength: Infinity,
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message,
    });
  }
};

// =========================================
// HEART
// =========================================

export const heartPrediction = async (req, res) => {
  return sendImageToAI("heart", req, res);
};

// =========================================
// LIVER
// =========================================

export const liverPrediction = async (req, res) => {
  return sendImageToAI("liver", req, res);
};

// =========================================
// OCR
// =========================================

export const ocrPrediction = async (req, res) => {
  return sendImageToAI("ocr", req, res);
};

// =========================================
// XRAY
// =========================================

export const xrayPrediction = async (req, res) => {
  return sendImageToAI("xray", req, res);
};

// =========================================
// KIDNEY
// =========================================

export const kidneyPrediction = async (req, res) => {
  return sendImageToAI("kidney", req, res);
};

// =========================================
// LUNG CANCER
// =========================================

export const cancerPrediction = async (req, res) => {
  return sendImageToAI("cancer", req, res);
};

// =========================================
// BRAIN TUMOR
// =========================================

export const brainTumorPrediction = async (req, res) => {
  return sendImageToAI("brain-tumor", req, res);
};