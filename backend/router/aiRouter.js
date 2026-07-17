import express from "express";
import { upload } from "../utils/multer.js";

import {

    heartPrediction,

    liverPrediction,

    ocrPrediction,

    xrayPrediction,

    kidneyPrediction,

    cancerPrediction,

    brainTumorPrediction

} from "../controller/aiController.js";

const router = express.Router();

// ===========================================
// AI Service Health Check
// GET /api/v1/ai
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "AI Prediction API Running Successfully"

    });

});

// ===========================================
// Heart Disease Prediction
// POST /api/v1/ai/heart
// ===========================================

router.post(

    "/heart",

    upload.single("file"),

    heartPrediction

);

// ===========================================
// Liver Disease Prediction
// POST /api/v1/ai/liver
// ===========================================

router.post(

    "/liver",

    upload.single("file"),

    liverPrediction

);

// ===========================================
// OCR Medical Report Reader
// POST /api/v1/ai/ocr
// ===========================================

router.post(

    "/ocr",

    upload.single("file"),

    ocrPrediction

);

// ===========================================
// Chest X-ray Pneumonia Detection
// POST /api/v1/ai/xray
// ===========================================

router.post(

    "/xray",

    upload.single("file"),

    xrayPrediction

);

// ===========================================
// Kidney Stone Detection
// POST /api/v1/ai/kidney
// ===========================================

router.post(

    "/kidney",

    upload.single("file"),

    kidneyPrediction

);

// ===========================================
// Lung Cancer Detection
// POST /api/v1/ai/cancer
// ===========================================

router.post(

    "/cancer",

    upload.single("file"),

    cancerPrediction

);

// ===========================================
// Brain Tumor Detection
// POST /api/v1/ai/brain-tumor
// ===========================================

router.post(

    "/brain-tumor",

    upload.single("file"),

    brainTumorPrediction

);

export default router;