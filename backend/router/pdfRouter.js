import express from "express";

import {

    createPDF

} from "../controller/pdfController.js";

const router = express.Router();

// ===========================================
// PDF API Health Check
// GET /api/v1/pdf
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "PDF Report API Running Successfully"

    });

});

// ===========================================
// Generate Medical PDF Report
// POST /api/v1/pdf/generate
// ===========================================

router.post(

    "/generate",

    createPDF

);

export default router;