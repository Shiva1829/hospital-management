import express from "express";

import {

    addRevenue,

    totalRevenue,

    getRevenue

} from "../controller/revenueController.js";

const router = express.Router();

// ===========================================
// Revenue API Health Check
// GET /api/v1/revenue
// ===========================================

router.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Revenue API Running Successfully"

    });

});

// ===========================================
// Add Revenue Record
// POST /api/v1/revenue/add
// ===========================================

router.post(

    "/add",

    addRevenue

);

// ===========================================
// Get All Revenue Records
// GET /api/v1/revenue/all
// ===========================================

router.get(

    "/all",

    getRevenue

);

// ===========================================
// Get Total Revenue
// GET /api/v1/revenue/total
// ===========================================

router.get(

    "/total",

    totalRevenue

);

export default router;