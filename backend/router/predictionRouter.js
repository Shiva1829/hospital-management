import express from "express";

import {

    addPrediction,

    getPredictions,

    deletePrediction,

    predictionStats,

    getSinglePrediction,

    downloadReport

} from "../controller/predictionController.js";

const router = express.Router();

// ===========================================
// Prediction API Health Check
// GET /api/v1/predictions
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Prediction API Running Successfully"

    });

});

// ===========================================
// Save New Prediction
// POST /api/v1/predictions/add
// ===========================================

router.post(

    "/add",

    addPrediction

);

// ===========================================
// Get All Predictions
// GET /api/v1/predictions/all
// ===========================================

router.get(

    "/all",

    getPredictions

);

// ===========================================
// Prediction Statistics
// GET /api/v1/predictions/stats
// ===========================================

router.get(

    "/stats",

    predictionStats

);

// ===========================================
// Download Prediction PDF Report
// GET /api/v1/predictions/download/:id
// ===========================================

router.get(

    "/download/:id",

    downloadReport

);

// ===========================================
// Get Single Prediction
// GET /api/v1/predictions/:id
// ===========================================

router.get(

    "/:id",

    getSinglePrediction

);

// ===========================================
// Delete Prediction
// DELETE /api/v1/predictions/delete/:id
// ===========================================

router.delete(

    "/delete/:id",

    deletePrediction

);

export default router;