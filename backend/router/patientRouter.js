import express from "express";

import {
  addPatient,
  getPatients,
  searchPatient,
  getSinglePatient,
  updatePatient,
  deletePatient,
  getPatientStats,
  getPatientAnalytics,
} from "../controller/patientController.js";

const router = express.Router();

// ===========================================
// Patient API Health Check
// GET /api/v1/patient
// ===========================================

router.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message: "Patient API Running Successfully",

  });

});

// ===========================================
// Add Patient
// POST /api/v1/patient/add
// ===========================================

router.post("/add", addPatient);

// ===========================================
// Get All Patients
// GET /api/v1/patient/all
// ===========================================

router.get("/all", getPatients);

// ===========================================
// Search Patient
// GET /api/v1/patient/search/:keyword
// ===========================================

router.get("/search/:keyword", searchPatient);

// ===========================================
// Get Single Patient
// GET /api/v1/patient/:id
// ===========================================

router.get("/:id", getSinglePatient);

// ===========================================
// Update Patient
// PUT /api/v1/patient/update/:id
// ===========================================

router.put("/update/:id", updatePatient);

// ===========================================
// Delete Patient
// DELETE /api/v1/patient/delete/:id
// ===========================================

router.delete("/delete/:id", deletePatient);

// ===========================================
// Patient Statistics
// GET /api/v1/patient/stats
// ===========================================

router.get("/stats", getPatientStats);

// ===========================================
// Dashboard Analytics
// GET /api/v1/patient/analytics
// ===========================================

router.get("/analytics", getPatientAnalytics);

export default router;