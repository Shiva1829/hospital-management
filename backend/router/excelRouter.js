import express from "express";

import {

    exportExcel

} from "../controller/excelController.js";

const router = express.Router();

// ===========================================
// Excel API Health Check
// GET /api/v1/excel
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Excel Export API Running Successfully"

    });

});

// ===========================================
// Export Prediction History to Excel
// GET /api/v1/excel/export
// ===========================================

router.get(

    "/export",

    exportExcel

);

export default router;