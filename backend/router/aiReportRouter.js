import express from "express";

import {
  saveAIReport,
  getAllAIReports,
  getPatientReports,
  getAIReportById,
  deleteAIReport,
} from "../controller/aiReportController.js";

const router = express.Router();

// Save AI Report
router.post("/save", saveAIReport);

// Get All Reports
router.get("/all", getAllAIReports);

// Get Reports by Patient
router.get("/patient/:name", getPatientReports);

// Get Single Report
router.get("/:id", getAIReportById);

// Delete Report
router.delete("/:id", deleteAIReport);

export default router;