import express from "express";
import { upload } from "../utils/multer.js";

import {
  uploadReport,
  getAllReports,
  getSingleReport,
  getReportsByPatient,
  generateReport,
} from "../controller/reportController.js";

const router = express.Router();

// ===========================================
// Report API Health Check
// GET /api/v1/report
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Medical Report API Running Successfully"

    });

});

// ===========================================
// Upload Medical Report
// POST /api/v1/report/upload
// ===========================================

router.post(

    "/upload",

    upload.single("file"),

    uploadReport

);

// ===========================================
// Get All Medical Reports
// GET /api/v1/report/all
// ===========================================

router.get(

    "/all",

    getAllReports

);

// ===========================================
// Get Reports For a Specific Patient
// GET /api/v1/report/patient/:patientId
// ===========================================

router.get(

    "/patient/:patientId",

    getReportsByPatient

);

// ===========================================
// Generate PDF Medical Report
// POST /api/v1/report/pdf
// ===========================================

router.post(

    "/pdf",

    generateReport

);

// ===========================================
// Get Single Report
// GET /api/v1/report/:id
// ===========================================

router.get(

    "/:id",

    getSingleReport

);

export default router;