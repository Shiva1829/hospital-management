import express from "express";

import {
  savePrediction,
  getAllPredictions,
  getPredictionById,
  deletePrediction,
  downloadReport,
} from "../controller/aiPredictionController.js";

const router = express.Router();

// Save Prediction
router.post("/save", savePrediction);

// Get All Predictions
router.get("/all", getAllPredictions);

// Get Single Prediction
router.get("/:id", getPredictionById);

// Download PDF
router.get("/report/:id", downloadReport);

// Delete Prediction
router.delete("/:id", deletePrediction);

export default router;